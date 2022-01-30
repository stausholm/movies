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
      <button class="btn btn--primary" @click="trapTest = true">
        this is a button in modal. It will open another modal
      </button>
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

    <modal v-if="trapTest" @close="trapTest = false">
      <p>this is modal 2 opened from inside modal</p>
      <button class="btn btn--primary">this is a button in modal 2</button>
      <button class="btn btn--primary" @click="trapTest2 = true">
        this button will open an overlay
      </button>
    </modal>
    <!-- <overlay label="overlay label" v-if="trapTest" @close="trapTest = false">
        <p>this is overlay opened from inside modal</p>
        <button class="btn btn--primary">this is a button in overlay</button>
        <button class="btn btn--primary" @click="trapTest2 = true">
          this button will open another overlay
        </button>
      </overlay> -->
    <overlay label="overlay label" v-if="trapTest2" @close="trapTest2 = false" v-slot="{ close }">
      <p>this is overlay opened from inside overlay 1</p>
      <button class="btn btn--primary" @click="close">this is a button in overlay</button>
    </overlay>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import Modal from '@/components/Modal.vue';
import Overlay from '@/components/Overlay.vue';

export default defineComponent({
  name: 'ExampleModal',
  components: {
    Modal,
    Overlay,
  },
  data() {
    return {
      showModal: false,
      trapTest: false,
      trapTest2: false,
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
