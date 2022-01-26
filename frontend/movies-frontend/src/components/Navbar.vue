<template>
  <header class="navbar" :class="{ 'navbar--hide': hide }">
    <div class="container">
      <nav class="primary-nav">
        <router-link :to="{ name: 'Home' }" class="nav-item nav-item--home">
          <base-icon class="nav-item__icon">
            <icon-home />
          </base-icon>
          <span class="nav-item__label text-small text-truncate">Home</span>
        </router-link>

        <router-link :to="{ name: 'Find' }" class="nav-item" @click="handleSearchClick">
          <base-icon class="nav-item__icon">
            <icon-search />
          </base-icon>
          <span class="nav-item__label text-small text-truncate">Find</span>
        </router-link>

        <router-link :to="{ name: 'Library' }" class="nav-item">
          <base-icon class="nav-item__icon">
            <icon-video-library />
          </base-icon>
          <span class="nav-item__label text-small text-truncate">Library</span>
        </router-link>

        <router-link v-if="useSmallLayout" :to="{ name: 'Account' }" class="nav-item">
          <base-icon class="nav-item__icon">
            <icon-account-circle />
          </base-icon>
          <span class="nav-item__label text-small text-truncate">My Stuff</span>
        </router-link>
        <div v-else class="dropdown-wrapper" v-click-outside="hideDropdown">
          <button
            @click="handleAccountClick"
            class="nav-item"
            :class="{ 'router-link-active': $route.name === 'Account' }"
          >
            <base-icon class="nav-item__icon">
              <icon-account-circle />
            </base-icon>
            <span class="nav-item__label text-small text-truncate">My Stuff</span>
          </button>

          <transition name="slide-up">
            <div class="dropdown" v-if="!useSmallLayout && showAccountDropdown" role="dialog">
              <account-card :alt="true" />
              <router-link :to="{ name: 'Starred' }" class="btn" @click="hideDropdown">
                Starred
              </router-link>
              <router-link :to="{ name: 'Account' }" class="btn" @click="hideDropdown">
                Settings
              </router-link>
            </div>
          </transition>
        </div>
      </nav>
    </div>
  </header>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import BaseIcon from '@/components/base/BaseIcon.vue';
import IconHome from '@/components/icons/IconHome.vue';
import IconSearch from '@/components/icons/IconSearch.vue';
import IconVideoLibrary from '@/components/icons/IconVideoLibrary.vue';
import IconAccountCircle from '@/components/icons/IconAccountCircle.vue';
import { AppLayoutSizeWidth } from '@/store/app/types';
import AccountCard from '@/components/account/AccountCard.vue';
import { isTouchOnlyDevice } from '@/utils/touchDevice';

export default defineComponent({
  components: {
    BaseIcon,
    IconHome,
    IconSearch,
    IconVideoLibrary,
    IconAccountCircle,
    AccountCard,
  },
  data() {
    return {
      showAccountDropdown: false,
      onScreenKeyboardActive: false,
    };
  },
  computed: {
    useSmallLayout(): boolean {
      return this.$store.getters.layoutSizeWidth !== ('desktop' as AppLayoutSizeWidth);
    },
    hide(): boolean {
      const isMobile = this.$store.getters.layoutSizeWidth === ('mobile' as AppLayoutSizeWidth);
      const shouldHideOnMobile =
        (this.$route.meta.hideNavOnMobile as boolean) || this.onScreenKeyboardActive;

      // this class is useful when showing a toast, so it doesn't overlap with the bottomnav
      if (shouldHideOnMobile) {
        document.body.classList.add('mobile-hide-bottom-nav');
      } else {
        document.body.classList.remove('mobile-hide-bottom-nav');
      }
      return isTouchOnlyDevice() && isMobile && shouldHideOnMobile;
    },
  },
  methods: {
    handleAccountClick(): void {
      this.showAccountDropdown = !this.showAccountDropdown;
    },
    hideDropdown(): void {
      this.showAccountDropdown = false;
    },
    handleKeyboard({ type, target }: FocusEvent): void {
      const t = target as HTMLElement;
      if (
        t.tagName === 'TEXTAREA' ||
        (t.tagName === 'INPUT' &&
          t.getAttribute('type')?.match(/password|text|number|search|email|tel|url/i))
      ) {
        if (type === 'focus') {
          this.onScreenKeyboardActive = true;
        } else {
          this.onScreenKeyboardActive = false;
        }
      }
    },
    handleSearchClick(): void {
      if (this.$route.name === 'Find') {
        // clicked search icon while already on the search page. Move focus into the textsearch input field
        const input = document.querySelector('.js-search-input-field');
        if (input && input.tagName === 'INPUT') {
          (input as HTMLInputElement).focus();
        }
      }
    },
  },
  mounted() {
    // prevent nav from being attached to the top of on-screen keyboard, by hiding it.
    document.addEventListener('focus', this.handleKeyboard, true);
    document.addEventListener('blur', this.handleKeyboard, true);
  },
  beforeUnmount() {
    // we never destroy the bottom nav, but just in case we decide to in the future
    document.removeEventListener('focus', this.handleKeyboard, true);
    document.removeEventListener('blur', this.handleKeyboard, true);
  },
});
</script>

<style lang="scss" scoped>
@use 'sass:math';
@import '@/design/variables/index.scss';
@import '@/design/mixins/index.scss';

.navbar {
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  height: $nav-height;
  @include z-index(nav);

  .container {
    height: 100%;
  }

  @include breakpoint-max($breakpoint-navigation-change) {
    position: fixed;
    bottom: 0;
    background-color: $nav-bg;
    left: 0;
    right: 0;
    top: auto;
    transition: transform 0.2s;
    box-shadow: 0 0px 2px 0 rgba(0, 0, 0, 0.14), 0 0px 1px -2px rgba(0, 0, 0, 0.2),
      0 0px 5px 0 rgba(0, 0, 0, 0.12);

    // the fixed navbar should be hidden when an input is focused,
    // so it doesn't take up the already very limited screenspace on mobile when an onscreen keyboard is showing
    &.navbar--hide {
      transform: translateY(calc(100% + 5px)); // + 5px to hide box shadow height
    }
  }
}

.primary-nav {
  height: 100%;
  display: flex;
  align-items: center;
}

.nav-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: relative;
  color: $nav-link-color;
  white-space: nowrap;
  height: $min-touch-target-size;
  text-decoration: none;
  border: 0;
  background-color: transparent;
  padding: 0;
  font-weight: bold;
  margin-left: $default-spacing;

  &::after {
    content: '';
    transition: background-color 0.125s ease-out;
  }

  @include hover() {
    &::after {
      // hover background color is added like this to make sure link/button labels are still visually aligned with the grid
      position: absolute;
      top: 0;
      bottom: 0;
      left: math.div(-$default-spacing, 2);
      right: math.div(-$default-spacing, 2);
      z-index: -1;
      border-radius: $border-radius-small;
      background-color: $gray-200;
    }
  }

  &.router-link-active {
    color: $nav-link-color-active;
  }

  @include breakpoint($breakpoint-navigation-change) {
    margin-left: $default-spacing * 2;

    &--home {
      flex-direction: row;
      margin-left: 0;
      margin-right: auto;

      .nav-item__icon {
        margin-right: math.div($default-spacing, 4);
      }
      .nav-item__label {
        font-size: inherit;
      }
    }
  }

  @include breakpoint-max($breakpoint-navigation-change) {
    flex: 1;
    overflow: hidden;

    .nav-item__label {
      max-width: 80%;
    }

    &--home {
      margin-left: 0;
    }
  }
}
</style>
