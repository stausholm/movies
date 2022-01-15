<template>
  <!-- TODO: test aria -->
  <div class="loader" role="status">
    <div class="loader__icon">
      <div class="spinner" :style="{ width: size + 'px', height: size + 'px' }">
        <div class="double-bounce1"></div>
        <div class="double-bounce2"></div>
      </div>
    </div>
    <span class="loader__message d-block mt text-small fw-bold" v-if="message">{{ message }}</span>
    <span class="visually-hidden" v-else>Loading.</span>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'Loader',
  props: {
    message: {
      type: String,
    },
    size: {
      type: [String, Number],
      default: 24,
    },
  },
});
</script>

<style lang="scss" scoped>
@import '@/design/variables/index.scss';
// https://tobiasahlin.com/spinkit/
.spinner {
  position: relative;
}

.double-bounce1,
.double-bounce2 {
  width: 100%;
  height: 100%;
  border-radius: 50%;
  background-color: $brand-primary;
  opacity: 0.6;
  position: absolute;
  top: 0;
  left: 0;

  animation: sk-bounce 2s infinite ease-in-out;
}

.double-bounce2 {
  animation-delay: -1s;
}

@keyframes sk-bounce {
  0%,
  100% {
    transform: scale(0);
  }
  50% {
    transform: scale(1);
  }
}
</style>
