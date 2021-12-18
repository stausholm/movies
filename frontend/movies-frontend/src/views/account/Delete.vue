<template>
  <layout>
    <div class="container">
      <h1>Danger Zone</h1>
      <p>
        Delete all locally stored application data. Deleting your data is a permanent and
        irreversible action. Please be sure before proceeding.
      </p>
      <button class="btn btn--danger btn--uppercase">
        <base-icon>
          <icon-delete />
        </base-icon>
        <span>Delete application data</span>
      </button>
    </div>
  </layout>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import BaseIcon from '@/components/base/BaseIcon.vue';
import IconDelete from '@/components/icons/IconDelete.vue';
// import IconWarningTriangle from '@/components/icons/IconWarningTriangle.vue';
import Layout from '@/layouts/Main.vue';

export default defineComponent({
  name: 'Delete',
  components: { BaseIcon, IconDelete, Layout },
});
</script>
