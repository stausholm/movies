<template>
  <settings-group name="Application">
    <li>
      <settings-item
        @click="showThemeModal = true"
        title="Theme"
        :actionLabel="currentThemeLabel"
        aria-haspopup="true"
      />
      <modal
        v-if="showThemeModal"
        @close="showThemeModal = false"
        title="Select theme"
        cancelLabel="Close"
      >
        <theme-switcher />
      </modal>
    </li>
    <li>
      <settings-item-image-saturation />
    </li>
    <li>
      <settings-item
        title="Prefer reduced motion"
        subtitle="Disable/enable app animations and transitions"
        type="switch"
        v-model="isReducedMotion"
      />
    </li>
    <li>
      <settings-item
        @click="todo"
        title="Change language"
        actionLabel="currentLanguage TODO"
        :disabled="true"
      />
    </li>
    <li>
      <settings-item @click="todo" title="Start product tour" subtitle="Short tour of the app" />
    </li>
    <li>
      <settings-item
        @click="$router.push({ name: 'Tips' })"
        title="Tips"
        subtitle="Simple tips to personalize your experience and increase efficiency"
      />
    </li>
    <!-- Overflow-hide is necessary for mobile, because Sparkles component for some reason decides to overflow the body, even though the body has overflow-x: hidden; -->
    <li class="overflow-hide">
      <sparkles :animate="!isReducedMotion">
        <settings-item
          @click="$router.push({ name: 'Changelog' })"
          title="Changelog"
          subtitle="See what's new"
        />
      </sparkles>
    </li>
    <li>
      <settings-item
        @click="$router.push({ name: 'Feedback' })"
        title="Give Feedback"
        :subtitle="`Let us know how we can improve ${appName}`"
      />
    </li>
    <li>
      <settings-item @click="$router.push({ name: 'About' })" title="About" />
    </li>
    <li>
      <settings-item @click="$router.push({ name: 'ButtonPage' })" title="?" subtitle="?? ????" />
    </li>
  </settings-group>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import SettingsItem from '@/components/account/SettingsItem.vue';
import SettingsGroup from '@/components/account/SettingsGroup.vue';
import ThemeSwitcher from '@/components/account/ThemeSwitcher.vue';
import Sparkles from '@/components/Sparkles.vue';
import { AppSettingPayload } from '@/store/user/types';
import { UserMutations } from '@/store/user/mutations';
import Modal from '@/components/Modal.vue';
import SettingsItemImageSaturation from '@/components/account/SettingsItemImageSaturation.vue';
import { APP_NAME } from '@/constants/SiteSettings.json';

export default defineComponent({
  name: 'SettingsGrouApplication',
  components: {
    SettingsItem,
    SettingsGroup,
    ThemeSwitcher,
    Sparkles,
    Modal,
    SettingsItemImageSaturation,
  },
  data() {
    return {
      appName: APP_NAME,
      showThemeModal: false,
    };
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
    currentThemeLabel(): string {
      return this.$store.getters.getAppSettings.theme;
    },
  },
  methods: {
    todo() {
      alert('todo application group');
    },
  },
});
</script>
