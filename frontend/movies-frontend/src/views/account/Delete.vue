<template>
  <layout>
    <div class="container">
      <h1>Danger Zone</h1>
      <p>
        Delete all locally stored application data. Deleting your data is a
        <strong>permanent and irreversible action.</strong> Please be sure before proceeding.
      </p>
      <button class="btn btn--danger btn--uppercase" @click="showModal = true">
        <base-icon>
          <icon-delete />
        </base-icon>
        <span>Delete application data</span>
      </button>
      <modal
        v-if="showModal"
        @close="showModal = false"
        @confirm="handleConfirm"
        confirmLabel="Delete"
        :confirmIsDestructive="true"
        title="Confirm deletion"
      >
        <p>Permanently delete all locally stored content?</p>
      </modal>
    </div>
  </layout>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import BaseIcon from '@/components/base/BaseIcon.vue';
import IconDelete from '@/components/icons/IconDelete.vue';
// import IconWarningTriangle from '@/components/icons/IconWarningTriangle.vue';
import Layout from '@/layouts/Main.vue';
import Modal from '@/components/Modal.vue';

export default defineComponent({
  name: 'Delete',
  components: {
    BaseIcon,
    IconDelete,
    Layout,
    Modal,
  },
  data() {
    return {
      showModal: false,
    };
  },
  methods: {
    handleConfirm() {
      alert('TODO confirmed delete');
    },
  },
});
</script>
