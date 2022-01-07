<template>
  <div class="container">
    <h2>Modal</h2>
    <button @click="showModal = true" class="btn btn--primary">Show modal</button>
    <modal
      v-if="showModal"
      @close="showModal = false"
      @confirm="handleConfirm"
      confirmLabel="confirm"
      :confirmIsDestructive="false"
      :showCloseButton="false"
      title="title asdasd"
      :stackActions="false"
    >
      <p>test</p>
      <button @keyup.esc.stop="testkeyup" autofocus>test</button>
      <p>test</p>
      <p>test</p>
      <p>test</p>
      <p>test</p>
      <p>test</p>
      <p>test</p>
      <p>test</p>
      <p>test</p>
      <p>test</p>
      <p>test</p>
      <p>test</p>
      <p>test</p>
      <p>test</p>
      <p>test</p>
      <p>test</p>
      <p>test</p>
      <p>test</p>
      <p>test</p>
      <p>test</p>
      <p>test</p>
      <p>test</p>
      <p>test</p>
      <p>test</p>
      <p>test</p>
      <p>test</p>
      <p>test</p>
      <p>test</p>
      <p>test</p>
      <p>test</p>
      <p>test</p>
      <p>test</p>
      <button>another button</button>
      <p>test</p>
      <p>test</p>
      <p>test</p>
      <p>test</p>
    </modal>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import Modal from '@/components/Modal.vue';

export default defineComponent({
  name: 'ExampleModal',
  components: {
    Modal,
  },
  data() {
    return {
      showModal: false,
    };
  },
  methods: {
    handleConfirm() {
      console.log('confirmed aaaaa');
    },
    testkeyup() {
      console.log('test keyup propagation stop');
    },
  },
});
</script>
