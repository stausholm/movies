<template>
  <modal
    v-if="showReleaseNotes"
    @close="closeReleaseNotes"
    cancelLabel="Close"
    title="A new release has been downloaded 🎉"
    v-slot="{ close }"
  >
    <h2 class="h4">{{ appName }} {{ appVersion }} introduces the following updates:</h2>
    <div class="changelog-md changelog-md--modal" v-html="latestLogEntry"></div>
    <p>
      You can always return to these releasenotes under the
      <!-- Using a button as a router-link doesn't work because the router prevents navigation while a modal is open -->
      <button
        class="link"
        role="link"
        @click="
          close();
          redirect = true;
        "
      >
        "Changelog"
      </button>
      section of the settings page.
    </p>
  </modal>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import Modal from '@/components/Modal.vue';
import { APP_NAME, APP_VERSION } from '@/constants/SiteSettings.json';
import { AppMutations } from '@/store/app/mutations';
import { latestLogEntry } from '@/changelog';

export default defineComponent({
  name: 'ChangelogModal',
  components: {
    Modal,
  },
  data() {
    return {
      appName: APP_NAME,
      appVersion: APP_VERSION,
      redirect: false,
      latestLogEntry: latestLogEntry,
    };
  },
  computed: {
    showReleaseNotes(): boolean {
      return this.$store.getters.showReleaseNotes;
    },
  },
  methods: {
    closeReleaseNotes(): void {
      this.$store.commit(AppMutations.SET_USING_NEW_RELEASE, false);
      if (this.redirect) {
        this.$router.push({ name: 'Changelog' });
      }
    },
  },
  created() {
    this.$store.commit(AppMutations.COMPARE_VERSION_NUMBER);
  },
});
</script>

<style lang="scss">
.changelog-md--modal {
  h2 {
    // margin: 0;
    // padding: 0;
    // background-color: transparent;
    // color: currentColor;
    display: none;
  }
}
</style>
