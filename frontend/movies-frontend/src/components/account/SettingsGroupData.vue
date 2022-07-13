<template>
  <settings-group name="Data">
    <li>
      <div class="pl-1 pr-1 pt-1 pb-1 storage-bar-wrapper">
        <p class="m-0">Local storage used</p>
        <div class="storage-bar mt">
          <div class="storage-bar-percentage storage-bar-1" style="width: 20%"></div>
          <div class="storage-bar-percentage storage-bar-2" style="width: 24%"></div>
          <div class="storage-bar-percentage storage-bar-3" style="width: 21%"></div>
          <div class="storage-bar-percentage storage-bar-4" style="width: 24%"></div>
        </div>
        <div class="storage-bar-row">
          <div class="storage-bar-label pb-0 text-small">
            <div class="storage-bar-key storage-bar-1"></div>
            LocalStorage • {{ usedStorage.localStorage }}
          </div>
          <div class="storage-bar-label pb-0 text-small">
            <div class="storage-bar-key storage-bar-2"></div>
            Cookies • {{ usedStorage.cookies }}
          </div>
          <div class="storage-bar-label pb-0 text-small">
            <div class="storage-bar-key storage-bar-3"></div>
            IndexedDB • {{ usedStorage.indexedDB }}
          </div>
          <div class="storage-bar-label pb-0 text-small">
            <div class="storage-bar-key storage-bar-4"></div>
            Workers • {{ usedStorage.workers }}
          </div>
          <div class="storage-bar-label pb-0 text-small">
            <div class="storage-bar-key"></div>
            Estimated free space • {{ usedStorage.freeSpace }}
          </div>
        </div>
      </div>
    </li>
    <li>
      <settings-item
        @click="$router.push({ name: 'Delete' })"
        title="Delete my data"
        subtitle="Remove all locally stored content"
      />
    </li>
    <li>
      <settings-item
        @click="test"
        title="Export my data"
        subtitle="Download your data as a JSON file"
      />
      <!-- TOAST 
              show toast when file was downloaded
              -->
    </li>
    <li>
      <settings-item
        @click="test"
        title="Import data"
        subtitle="Requires valid JSON file"
        aria-haspopup="true"
      />
      <!-- MODAL
              title: Import existing data
              text: You can choose between overwriting your current locally stored data, or adding the imported data to your current dataset
              fileinput: choose a file
              fieldset legend: Please select an import type:
              radio title: Overwrite
              radio description: Overwrites all your existing local data
              radio title: Merge and add
              radio description: Merges existing data and adds new
              external link: More info about the JSON data structure (external link icon) Link goes to public repo 
              buttons: Cancel / Import
               -->
    </li>
  </settings-group>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import SettingsItem from '@/components/account/SettingsItem.vue';
import SettingsGroup from '@/components/account/SettingsGroup.vue';
import bytesToSize from '@/utils/BytesToSize';

export default defineComponent({
  name: 'SettingsGroupData',
  components: {
    SettingsItem,
    SettingsGroup,
  },
  computed: {
    usedStorage() {
      const localStorageBytes = unescape(encodeURIComponent(JSON.stringify(localStorage))).length;
      const cookiesBytes = document.cookie.length;
      return {
        localStorage: bytesToSize(localStorageBytes, ' '),
        cookies: bytesToSize(cookiesBytes, ' '),
        indexedDB: 'TODO',
        workers: 'TODO',
        freeSpace: 'TODO',
      };
    },
  },
  methods: {
    test() {
      alert('test data group');
    },
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
  &-2 {
    background-color: $brand-secondary;
  }
  &-3 {
    background-color: $brand-tertiary;
  }
  &-4 {
    background-color: $white;
  }
}
</style>
