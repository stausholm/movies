<template>
  <settings-group name="Data">
    <settings-item-storage />
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
import SettingsItemStorage from '@/components/account/SettingsItemStorage.vue';

export default defineComponent({
  name: 'SettingsGroupData',
  components: {
    SettingsItem,
    SettingsGroup,
    SettingsItemStorage,
  },
  methods: {
    test() {
      alert('TODO test data group');
    },
  },
});
</script>
