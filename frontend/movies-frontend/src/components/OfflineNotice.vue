<script lang="ts">
import { defineComponent } from 'vue';
import { CHECK_OFFLINE_EVENT_KEY } from '@/utils/networkConnection';

// THIS DOES NOT TAKE INTO ACCOUNT IF YOU GO FROM ONLINE TO LIE-FI. You need to call checkOffline(), to make that check
export default defineComponent({
  name: 'OfflineNotice',
  emits: ['online', 'offline'],
  data() {
    return {
      isOnline: true,
      attemptsDelay: 1,
      timeout: undefined as undefined | number,
      loading: false,
    };
  },
  methods: {
    checkStatus() {
      if (!navigator.onLine) {
        // we are DEFINITELY offline
        return new Promise((resolve) => resolve((this.isOnline = false)));
      }

      this.loading = true;

      // are we really online or in Lie-Fi?
      return window
        .fetch('/img/icons/favicon-16x16.png?hash=' + new Date().getTime(), { cache: 'no-store' })
        .then((response) => {
          // we're online, even if it returns 400 or 500
          this.isOnline = true;
          this.loading = false;

          if (!response.ok) {
            // 4xx or 5xx error
            console.log('online, but checkStatus returned', response.status);
          }
        })
        .catch(() => {
          // actual network error, we're offline
          this.loading = false;
          return (this.isOnline = false);
        });
    },
    retry() {
      this.checkStatus().then(() => {
        console.log("[OfflineNotice] We're " + (this.isOnline ? 'online' : 'offline'));
        if (this.isOnline) {
          return;
        }

        this.attemptsDelay *= 2; // offline, double each time
        this.timeout = window.setTimeout(this.retry, this.attemptsDelay * 1000);
      });
    },
  },
  render() {
    return null;
  },
  created() {
    window.addEventListener('load', () => {
      this.retry();

      // something changed, we went online
      window.addEventListener('online', () => {
        this.attemptsDelay = 1;
        clearTimeout(this.timeout); // clear currently running timeout, set by being offline
        this.retry(); // Retry, as we could be in lie-fi
      });

      window.addEventListener('offline', () => {
        this.retry();
      });
    });

    document.addEventListener(CHECK_OFFLINE_EVENT_KEY, this.retry);
  },
  watch: {
    isOnline(newVal) {
      if (newVal === true) {
        this.$emit('online');
      } else {
        this.$emit('offline');
      }
    },
  },
});
</script>
