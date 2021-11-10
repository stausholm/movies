<template>
  <div>
    <h1>Themeswitcher</h1>
    <ul>
      <!-- Auto = localstoragevalue/ vuex value === null. So it will use system preference -->
      <li :class="{ active: colorTheme === 'auto' }" @click="setColorTheme('auto')">Auto</li>
      <li :class="{ active: colorTheme === 'light' }" @click="setColorTheme('light')">Light</li>
      <!-- <li :class="{ active: colorTheme === 'dim' }" @click="setColorTheme('dim')">Dim</li> -->
      <li :class="{ active: colorTheme === 'dark' }" @click="setColorTheme('dark')">Dark</li>
      <li :class="{ active: colorTheme === 'black' }" @click="setColorTheme('black')">Black</li>
    </ul>
    <div class="surface">
      <button class="surface surface--interactive"></button>
      <div class="surface surface--interactive">
        <div class="surface surface--interactive">
          <div class="surface surface--interactive">
            <div class="surface">
              <div class="surface">some text</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { AppSettingPayload, ColorTheme } from '@/store/user/types';
import { COLOR_THEME_STORAGE_KEY } from '@/constants/SiteSettings.json'; // this is a json file because we also need access to these values inside vue.config.js which uses commonJs and not ESM. But both module types support importing json
import { UserMutations } from '@/store/user/mutations';

export default defineComponent({
  data() {
    return {};
  },
  props: {},
  computed: {
    colorTheme(): ColorTheme {
      return this.$store.getters.getAppSettings.theme;
    },
  },
  methods: {
    setColorTheme(theme: ColorTheme): void {
      if (theme === this.colorTheme) {
        return;
      }

      this.transitionTheme();

      if (theme !== 'auto') {
        window.localStorage.setItem(COLOR_THEME_STORAGE_KEY, theme);
        document.documentElement.setAttribute('data-theme', theme);
      } else {
        window.localStorage.removeItem(COLOR_THEME_STORAGE_KEY);
        document.documentElement.removeAttribute('data-theme');
      }
      this.$store.commit(UserMutations.SET_APPSETTING, {
        key: 'theme',
        val: theme,
      } as AppSettingPayload);
    },
    transitionTheme(): void {
      document.documentElement.classList.add('theme-transition');
      window.setTimeout(() => {
        document.documentElement.classList.remove('theme-transition');
      }, 500);
    },
  },
});
</script>

<style lang="scss" scoped>
.active {
  color: red;
}
</style>

<style lang="scss">
html.theme-transition,
html.theme-transition *,
html.theme-transition *:before,
html.theme-transition *:after {
  transition: cubic-bezier(0.68, -0.55, 0.27, 01.55) 420ms !important;
  transition-delay: 0s !important;
}

// TODO: move this stuff into global styles
html[data-theme='dark'] {
  img {
    filter: brightness(0.8) contrast(1.2); // make images more comfortable to look at by dimming the image, reducing constrast to the dark background
  }
}

:root {
  --surface-opacity: 0;
  --surface-overlay-color: 255, 255, 255;
  --surface-overlay-color-hover: 255, 255, 255;
  --surface-background-color: #121212;
  --surface-opacity-hover-increment: 0.02;
  --surface-opacity-focus-increment: 0.04;

  @media (prefers-color-scheme: light) {
    // --surface-overlay-color: 0, 0, 0;
    --surface-overlay-color-hover: 150, 150, 150;
    --surface-background-color: #fff;
    --surface-opacity-hover-increment: 0.01;
    --surface-opacity-focus-increment: 0.08;
  }
}
.surface {
  --surface-opacity: 0.05;
  --surface-opacity-hover: calc(var(--surface-opacity) + var(--surface-opacity-hover-increment));
  --surface-opacity-focus: calc(var(--surface-opacity) + var(--surface-opacity-focus-increment));

  &--interactive {
    &:hover {
      &::before {
        background-color: rgba(var(--surface-overlay-color-hover), var(--surface-opacity-hover));
      }
    }
    &:focus,
    &:active {
      &::before {
        background-color: rgba(var(--surface-overlay-color-hover), var(--surface-opacity-focus));
      }
    }
  }

  background-color: var(--surface-background-color);
  padding: 20px;
  position: relative;
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    pointer-events: none;
    background-color: rgba(var(--surface-overlay-color), var(--surface-opacity));
  }

  .surface {
    --surface-opacity: 0.07;
    .surface {
      --surface-opacity: 0.08;
      .surface {
        --surface-opacity: 0.09;
        .surface {
          --surface-opacity: 0.11;
        }
      }
    }
  }
}
</style>
