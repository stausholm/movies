<template>
  <component
    :is="tag"
    @keyup.enter.space="handleKeyboard"
    @click="showPrompt"
    tabindex="0"
    class="pwa-install-button"
    role="button"
  >
    <slot>
      <base-icon iconName="add to home screen">
        <icon-install />
      </base-icon>
      <span class="pwa-install-button__label">Add to home screen</span>
    </slot>
  </component>
</template>

<script lang="ts">
// this component handles the add to home screen install prompt for your PWA
// https://developers.google.com/web/fundamentals/app-install-banners/
// https://developers.google.com/web/updates/2018/06/a2hs-updates

import { defineComponent } from 'vue';
import BaseIcon from '@/components/base/BaseIcon.vue';
import IconInstall from '@/components/icons/IconInstall.vue';
import { PWAMutations } from '@/store/PWA/mutations';
import BeforeInstallPromptEvent from '@/types/BeforeInstallPromptEvent';

export default defineComponent({
  name: 'PwaInstallButton',
  components: {
    BaseIcon,
    IconInstall,
  },
  props: {
    tag: {
      type: String,
      default: 'button',
    },
  },
  computed: {
    deferredPrompt(): BeforeInstallPromptEvent | null | undefined {
      return this.$store.getters.deferredPrompt;
    },
  },
  methods: {
    showPrompt(): void {
      if (this.deferredPrompt) {
        this.deferredPrompt.prompt();

        this.deferredPrompt.userChoice.then((choice) => {
          console.log(choice.outcome);
          if (choice.outcome === 'dismissed') {
            console.log('user cancelled installation');
          } else {
            console.log('user added to home screen');
          }
        });
      } else {
        this.$store.commit(PWAMutations.TOGGLE_OVERLAY);
      }
    },
    handleKeyboard(): void {
      if (this.tag.toLowerCase() !== 'button') {
        // if tag is not button, we loose out on native browser clicks with keyboard. if this.tag is a button, we don't want to call this.showprompt twice
        this.showPrompt();
      }
    },
  },
});
</script>
