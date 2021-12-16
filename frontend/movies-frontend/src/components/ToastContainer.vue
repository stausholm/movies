<template>
  <div class="container toast-container">
    <transition-group name="toast">
      <toast
        v-for="toast in toasts"
        :key="toast.content"
        :notification="toast"
        @done="handleDone(toast)"
      />
    </transition-group>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import Toast from '@/components/Toast.vue';
import { Toast as ToastInterface } from '@/store/toast/types';
import { ToastMutations } from '@/store/toast/mutations';

export default defineComponent({
  name: 'ToastContainer',
  components: {
    Toast,
  },
  computed: {
    toasts(): ToastInterface[] {
      return this.$store.getters.toasts;
    },
  },
  methods: {
    handleDone(toast: ToastInterface): void {
      this.$store.commit(ToastMutations.REMOVE_TOAST, toast);
    },
  },
});
</script>

<style lang="scss">
@use 'sass:math';
@import '@/design/variables/index.scss';
@import '@/design/mixins/index.scss';

.toast-container {
  position: fixed;
  @include z-index(notification);
  left: 0;
  right: 0;
  bottom: 0;
  pointer-events: none;
}

body:not(.mobile-hide-bottom-nav) {
  .toast-container {
    @include breakpoint-max($breakpoint-navigation-change) {
      bottom: $nav-height;
    }
  }
}

.toast-enter-from {
  opacity: 0;
  transform: translateY(10px) scale(0.9);
}
.toast-enter-active {
  transition: opacity 0.125s ease-out, transform 0.125s cubic-bezier(0.51, 0.23, 0.34, 0.96);

  @include prefers-reduced-motion() {
    transition: opacity 0.125s ease-out;
  }
}
.toast-leave-active {
  transition: opacity 0.15s ease-out, transform 0.2s ease-in-out;

  &:not(:first-child) {
    position: absolute !important;
  }
}
.toast-leave-to {
  opacity: 0;
  transform: translateY(10px);

  @include prefers-reduced-motion() {
    transition: opacity 0.15s ease-out;
    transform: translateY(0px);
  }
}

.toast-move {
  transition: transform 0.2s;

  @include prefers-reduced-motion() {
    transition: none;
  }
}
</style>
