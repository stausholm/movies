<template>
  <div class="">
    <h1>Danger Zone</h1>
    <p>
      Delete all locally stored application data. Deleting your data is a permanent and irreversible
      action. Please be sure before proceeding.
    </p>
    <button class="btn btn--danger btn--uppercase">
      <base-icon>
        <icon-delete />
      </base-icon>
      <span>Delete application data</span>
    </button>
  </div>
</template>

<script lang="ts">
import BaseIcon from '@/components/base/BaseIcon.vue';
import IconDelete from '@/components/icons/IconDelete.vue';
// import IconWarningTriangle from '@/components/icons/IconWarningTriangle.vue';
import { defineComponent } from 'vue';

export default defineComponent({
  components: { BaseIcon, IconDelete },
  name: 'Delete',
});
</script>
