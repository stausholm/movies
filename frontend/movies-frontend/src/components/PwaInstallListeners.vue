<script lang="ts">
import { defineComponent } from 'vue';
import { PWAMutations } from '@/store/PWA/mutations';
import BeforeInstallPromptEvent from '@/types/BeforeInstallPromptEvent';

export default defineComponent({
  computed: {
    deferredPrompt(): BeforeInstallPromptEvent | null | undefined {
      return this.$store.getters.deferredPrompt;
    },
  },
  methods: {
    handleBeforeInstallPrompt(e: Event): boolean {
      e.preventDefault();
      this.$store.commit(PWAMutations.SET_DEFERRED_PROMPT, e);
      return false;
    },
    handleAppInstalledEvent(): void {
      this.$store.commit(PWAMutations.HIDE_INSTALL_BUTTON);
    },
  },
  render() {
    return null;
  },
  created() {
    if (this.deferredPrompt) return;

    console.log('added event listener for beforeinstallprompt');
    window.addEventListener('beforeinstallprompt', this.handleBeforeInstallPrompt);

    window.addEventListener('appinstalled', this.handleAppInstalledEvent);
  },
  beforeUnmount() {
    window.removeEventListener('beforeinstallprompt', this.handleBeforeInstallPrompt);
    window.removeEventListener('appinstalled', this.handleAppInstalledEvent);
  },
});
</script>
