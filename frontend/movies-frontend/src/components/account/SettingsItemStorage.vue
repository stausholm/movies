<template>
  <li v-if="storageSupported || (persistedStorageSupported && !storagePersisted)">
    <div class="pl-1 pr-1 pt-1 pb-1 storage-bar-wrapper" v-if="storageSupported">
      <p class="m-0">Local storage used</p>
      <div class="storage-bar mt">
        <div
          class="storage-bar-percentage storage-bar-1"
          :style="{ width: usedStorage.total.percentageUsed + '%' }"
        ></div>
      </div>
      <div class="storage-bar-row">
        <div class="storage-bar-label pb-0 text-small">
          <div class="storage-bar-key storage-bar-1"></div>
          Used storage • ~{{ usedStorage.total.bytesUsedLabel }}
        </div>
        <div class="storage-bar-label pb-0 text-small">
          <div class="storage-bar-key"></div>
          Estimated free space • {{ usedStorage.total.bytesRemainingLabel }}
        </div>
      </div>
      <div class="" v-if="devmodeEnabled && usedStorage.hasDetails">
        <p class="mt-1 m-0">Storage breakdown for nerds:</p>
        <div class="storage-bar-row">
          <div
            class="storage-bar-label pb-0 text-small"
            v-if="usedStorage.usageDetails.caches.bytesUsed"
          >
            <div class="storage-bar-key storage-bar-1"></div>
            caches • ~{{ usedStorage.usageDetails.caches.label }}
          </div>
          <div
            class="storage-bar-label pb-0 text-small"
            v-if="usedStorage.usageDetails.indexedDB.bytesUsed"
          >
            <div class="storage-bar-key storage-bar-1"></div>
            IndexedDB • ~{{ usedStorage.usageDetails.indexedDB.label }}
          </div>
          <div
            class="storage-bar-label pb-0 text-small"
            v-if="usedStorage.usageDetails.localStorage.bytesUsed"
          >
            <div class="storage-bar-key storage-bar-1"></div>
            localStorage • ~{{ usedStorage.usageDetails.localStorage.label }}
          </div>
          <div
            class="storage-bar-label pb-0 text-small"
            v-if="usedStorage.usageDetails.serviceWorkerRegistrations.bytesUsed"
          >
            <div class="storage-bar-key storage-bar-1"></div>
            serviceWorkerRegistrations • ~{{
              usedStorage.usageDetails.serviceWorkerRegistrations.label
            }}
          </div>
          <div
            class="storage-bar-label pb-0 text-small"
            v-if="usedStorage.usageDetails.sessionStorage.bytesUsed"
          >
            <div class="storage-bar-key storage-bar-1"></div>
            sessionStorage • ~{{ usedStorage.usageDetails.sessionStorage.label }}
          </div>
        </div>
      </div>
    </div>

    <div class="pl-1 pr-1 pt-1 pb-1" v-if="persistedStorageSupported && !storagePersisted">
      <base-note
        title="Storage is at risk of being deleted"
        :hideIcon="true"
        type="warning"
        :bordered="false"
      >
        <p>
          You're using a browser that enforces a "Best Effort" eviction policy on web storage.
          <br />
          This means the browser may clear site data at its discretion, for example, when device
          storage is low or after x amount of days.
          <br />
          While the risk of data loss might be low in some browsers, the risk is still there.
          <br />
          By switching to a "Persistent" eviction policy, your data is only deleted when you want
          it.
        </p>
        <button class="btn btn--danger btn--responsive" @click="persistData">
          Switch to persistent storage
        </button>
      </base-note>
    </div>
  </li>
  <!-- <li v-if="persistedStorageSupported && !storagePersisted">
  </li> -->
</template>

<script>
import { defineComponent } from 'vue';
import bytesToSize from '@/utils/BytesToSize';
import BaseNote from '@/components/base/BaseNote.vue';
import { ToastMutations } from '@/store/toast/mutations';

export default defineComponent({
  components: { BaseNote },
  name: 'SettingsItemStorage',
  data() {
    return {
      persistedStorageSupported: !!navigator.storage && !!navigator.storage.persist,
      storagePersisted: undefined,
      storageSupported: !!navigator.storage && !!navigator.storage.estimate,
      usedStorage: {
        hasDetails: false,
        total: {
          percentageUsed: 0,
          bytesUsed: 0,
          bytesRemaining: 0,
          bytesTotal: 0,
          bytesUsedLabel: '',
          bytesRemainingLabel: '',
        },
        usageDetails: {
          caches: {
            percentageUsed: 0,
            bytesUsed: 0,
            label: '',
          },
          indexedDB: {
            percentageUsed: 0,
            bytesUsed: 0,
            label: '',
          },
          localStorage: {
            percentageUsed: 0,
            bytesUsed: 0,
            label: '',
          },
          serviceWorkerRegistrations: {
            percentageUsed: 0,
            bytesUsed: 0,
            label: '',
          },
          sessionStorage: {
            percentageUsed: 0,
            bytesUsed: 0,
            label: '',
          },
        },
      },
    };
  },
  computed: {
    devmodeEnabled() {
      return this.$store.getters.devmodeEnabled;
    },
  },
  methods: {
    async checkForPersistedStorage() {
      if (this.persistedStorageSupported) {
        const isPersisted = await navigator.storage.persisted();
        this.storagePersisted = isPersisted;
      }
    },
    async persistData() {
      if (this.persistedStorageSupported) {
        //NOTE: result might fail silently in Chrome https://web.dev/persistent-storage/#chrome-and-other-chromium-based-browsers
        const result = await navigator.storage.persist();
        // eslint-disable-next-line no-constant-condition
        if (result) {
          this.checkForPersistedStorage();
          this.$store.commit(ToastMutations.ADD_TOAST, {
            content: '✅ storage is now being persisted',
            theme: 'success',
          });
        } else {
          this.$store.commit(ToastMutations.ADD_TOAST, {
            content: '❎ Storage eviction policy change was denied.',
            theme: 'warning',
          });
        }
        // example using navigator.permissions: https://storage.spec.whatwg.org/#example-3a7051a8
        // Promise.all([
        //   // check if persisted
        //   navigator.storage.persisted(),
        //   // request permission
        //   navigator.permissions.query({ name: 'persistent-storage' }),
        // ]).then(([persisted, permission]) => {
        //   if (!persisted && permission.state == 'granted') {
        //     // persist storage
        //     navigator.storage.persist().then((res) => {
        //       console.log('res', res);
        //     });
        //     // prompt user for permissions
        //   } else if (!persisted && permission.state == 'prompt') {
        //     // show explanation why and for what is used
        //     console.log('yoyoyoyoyo');
        //   }
        // });
      }
    },
    // https://web.dev/storage-for-the-web/
    // https://developer.mozilla.org/en-US/docs/Web/API/StorageManager/estimate
    async calculateStorage() {
      if (this.storageSupported) {
        const { usage, quota, usageDetails } = await navigator.storage.estimate();

        if (usage || quota) {
          // usage -> Number of bytes used.
          // quota -> Maximum number of bytes available.
          this.usedStorage.total.percentageUsed = (usage / quota) * 100;
          this.usedStorage.total.bytesUsed = usage;
          this.usedStorage.total.bytesRemaining = quota - usage;
          this.usedStorage.total.bytesTotal = quota;
          this.usedStorage.total.bytesUsedLabel = bytesToSize(usage, ' ');
          this.usedStorage.total.bytesRemainingLabel = bytesToSize(quota - usage, ' ');
        }

        if (usageDetails && quota) {
          // https://storage.spec.whatwg.org/#storage-endpoint-identifier
          // https://pwadvent.dev/day/7/
          if (usageDetails.caches) {
            this.usedStorage.hasDetails = true;
            this.usedStorage.usageDetails.caches.percentageUsed =
              (usageDetails.caches / quota) * 100;
            this.usedStorage.usageDetails.caches.bytesUsed = usageDetails.caches;
            this.usedStorage.usageDetails.caches.label = bytesToSize(usageDetails.caches, ' ');
          }
          if (usageDetails.indexedDB) {
            this.usedStorage.hasDetails = true;
            this.usedStorage.usageDetails.indexedDB.percentageUsed =
              (usageDetails.indexedDB / quota) * 100;
            this.usedStorage.usageDetails.indexedDB.bytesUsed = usageDetails.indexedDB;
            this.usedStorage.usageDetails.indexedDB.label = bytesToSize(
              usageDetails.indexedDB,
              ' '
            );
          }
          if (usageDetails.localStorage) {
            this.usedStorage.hasDetails = true;
            this.usedStorage.usageDetails.localStorage.percentageUsed =
              (usageDetails.localStorage / quota) * 100;
            this.usedStorage.usageDetails.localStorage.bytesUsed = usageDetails.localStorage;
            this.usedStorage.usageDetails.localStorage.label = bytesToSize(
              usageDetails.localStorage,
              ' '
            );
          }
          if (usageDetails.serviceWorkerRegistrations) {
            this.usedStorage.hasDetails = true;
            this.usedStorage.usageDetails.serviceWorkerRegistrations.percentageUsed =
              (usageDetails.serviceWorkerRegistrations / quota) * 100;
            this.usedStorage.usageDetails.serviceWorkerRegistrations.bytesUsed =
              usageDetails.serviceWorkerRegistrations;
            this.usedStorage.usageDetails.serviceWorkerRegistrations.label = bytesToSize(
              usageDetails.serviceWorkerRegistrations,
              ' '
            );
          }
          if (usageDetails.sessionStorage) {
            this.usedStorage.hasDetails = true;
            this.usedStorage.usageDetails.sessionStorage.percentageUsed =
              (usageDetails.sessionStorage / quota) * 100;
            this.usedStorage.usageDetails.sessionStorage.bytesUsed = usageDetails.sessionStorage;
            this.usedStorage.usageDetails.sessionStorage.label = bytesToSize(
              usageDetails.sessionStorage,
              ' '
            );
          }
        }
      }
    },
  },
  created() {
    this.calculateStorage();
    this.checkForPersistedStorage();
  },
});
</script>

<style lang="scss" scoped>
@use 'sass:math';
@import '@/design/variables/index.scss';
@import '@/design/mixins/index.scss';

.storage-bar {
  width: 100%;
  height: $default-spacing * 0.75;
  background-color: $gray-500;
  display: flex;

  &-percentage {
    height: 100%;
    background-color: $white;
    display: inline-block;
  }

  &-row {
    display: flex;
    flex-flow: row wrap;
  }

  &-label {
    white-space: nowrap;
    margin-right: $default-spacing;
    margin-top: math.div($default-spacing, 4);

    @include breakpoint($breakpoint-font-size-change) {
      margin-right: $default-spacing * 2;
    }
  }

  &-key {
    width: 8px;
    height: 8px;
    display: inline-block;
    margin-right: 4px;
    background-color: $gray-500;
  }

  &-1 {
    background-color: $brand-primary;
  }
}
</style>
