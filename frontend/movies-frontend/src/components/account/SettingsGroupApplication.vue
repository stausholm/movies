<template>
  <li class="settings-list__group">
    <h3 class="group__title">Application</h3>
    <ul class="group__list">
      <li>
        <settings-item
          @click="test"
          title="Theme"
          actionLabel="currentTheme"
          aria-haspopup="true"
        />
        <!-- MODAL
              <theme-switcher />
              buttons: Cancel
               -->
      </li>
      <li>
        <settings-item
          @click="test"
          title="Image saturation"
          subtitle="Adjust the vibrance of colors in images"
          actionLabel="Off"
          aria-haspopup="true"
        />
        <!-- MODAL
              text: Adjusting the saturation of images can make them easier on the eye. This can work great in combination with darkmode enabled
              2 images
              slider input
              buttons: cancel / save
               -->
      </li>
      <li>
        <settings-item
          @click="test"
          title="Prefer reduced motion"
          subtitle="Disable/enable app animations and transitions"
          type="switch"
          :value="isReducedMotion"
        />
        <!-- TODO: make settings-item work with v-model -->
        <input type="checkbox" v-model="isReducedMotion" />
      </li>
      <li>
        <settings-item @click="test" title="Change language" actionLabel="currentLanguage" />
      </li>
      <li>
        <settings-item @click="test" title="Start product tour" subtitle="Short tour of the app" />
      </li>
      <li>
        <sparkles :animate="!isReducedMotion">
          <settings-item
            @click="$router.push({ name: 'Changelog' })"
            title="Changelog"
            subtitle="See what's new"
          />
        </sparkles>
      </li>
      <li>
        <settings-item @click="$router.push({ name: 'Feedback' })" title="Send Feedback" />
      </li>
      <li>
        <settings-item @click="$router.push({ name: 'About' })" title="About" />
      </li>
      <li>
        <settings-item @click="$router.push({ name: 'ButtonPage' })" title="?" subtitle="?? ????" />
      </li>
    </ul>
  </li>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import SettingsItem from '@/components/account/SettingsItem.vue';
import ThemeSwitcher from '@/components/account/ThemeSwitcher.vue';
import Sparkles from '@/components/Sparkles.vue';
import { AppSettingPayload } from '@/store/user/types';
import { UserMutations } from '@/store/user/mutations';

export default defineComponent({
  name: 'SettingsGrouApplication',
  components: {
    SettingsItem,
    // ThemeSwitcher,
    Sparkles,
  },
  computed: {
    isReducedMotion: {
      get(): boolean {
        return this.$store.getters.getAppSettings.preferReducedMotion;
      },
      set(value: boolean): void {
        this.$store.commit(UserMutations.SET_APPSETTING, {
          key: 'preferReducedMotion',
          val: value,
        } as AppSettingPayload);
      },
    },
  },
  methods: {
    test() {
      alert('test application group');
    },
  },
});
</script>
