<template>
  <div>
    <h1>Themeswitcher</h1>
    <ul>
      <!-- Auto = localstoragevalue/ vuex value === null. So it will use system preference -->
      <li :class="{ active: colorTheme === 'auto' }" @click="setColorTheme('auto')">Auto</li>
      <li :class="{ active: colorTheme === 'light' }" @click="setColorTheme('light')">Light</li>
      <li :class="{ active: colorTheme === 'dim' }" @click="setColorTheme('dim')">Dim</li>
      <li :class="{ active: colorTheme === 'dark' }" @click="setColorTheme('dark')">Dark</li>
    </ul>
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
  },
});
</script>

<style lang="scss" scoped>
.active {
  color: red;
}
</style>
