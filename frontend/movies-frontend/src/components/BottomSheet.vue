<template>
  <div class="bottom-sheet">
    <modal @close="$emit('close')">
      <slot>
        <p>
          TODO: this needs everything that Modal has + touch/mousedown listeners to be able to be
          dismissable by dragging it down
        </p>
      </slot>
    </modal>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import Modal from '@/components/Modal.vue';
export default defineComponent({
  name: 'BottomSheet',
  components: {
    Modal,
  },
});
</script>

<style lang="scss" scoped>
@use 'sass:math';
@import '@/design/variables/index.scss';
@import '@/design/mixins/index.scss';

.bottom-sheet {
}
</style>
