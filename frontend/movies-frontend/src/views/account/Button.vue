<template>
  <div class="container">
    <br /><br /><br /><br /><br /><br /><br /><br />
    <div class="justify-center align-center d-flex">
      <red-button @click="handleClick" />
    </div>
  </div>
</template>

<script lang="ts">
import RedButton from '@/components/RedButton.vue';
import { UserMutations } from '@/store/user/mutations';
import { AppSettingPayload } from '@/store/user/types';
import { defineComponent } from 'vue';

export default defineComponent({
  components: { RedButton },
  name: 'ButtonPage',
  data() {
    return {
      localClickCount: 0,
    };
  },
  computed: {
    storedClickCount(): number {
      return this.$store.getters.getAppSettings.buttonClicks;
    },
    clickCount(): number {
      return this.storedClickCount + this.localClickCount;
    },
  },
  methods: {
    handleClick(): void {
      console.log('click');
      this.localClickCount++;
    },
  },
  watch: {
    clickCount(newVal) {
      if (newVal === 10) {
        console.log('clicked 10 times!');
        // TODO: show toast, saying 'crown unlocked', and show a crown on the avatarCard component.
        // Could also implement multiple hats, and then this page would be a page to select a hat, and all unlocked hats would show above the button.
        // Not yet unlocked hats could show a black silhouette with a question mark, "Who's that pokémon" style
        // don't show how many times the button has been clicked
      }
    },
  },
  beforeUnmount() {
    this.$store.commit(UserMutations.SET_APPSETTING, {
      key: 'buttonClicks',
      val: this.clickCount,
    } as AppSettingPayload);
  },
});
</script>
