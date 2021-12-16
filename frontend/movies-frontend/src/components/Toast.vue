<template>
  <div class="container toast-container">
    <transition name="toast">
      <output
        class="toast"
        :class="[notificationClass]"
        v-if="showing"
        @click="dismiss"
        role="status"
      >
        <div class="toast-inner">
          <div class="toast__content">
            <span>{{ notification.content }}</span>
          </div>
        </div>
      </output>
    </transition>
  </div>
</template>

<script lang="ts">
import { Toast } from '@/store/toast/types';
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'Toast',
  data() {
    return {
      showing: false,
      timer: null as null | number | undefined,
    };
  },
  computed: {
    notification(): Toast {
      return this.$store.getters.toastSettings;
    },
    notificationClass(): string {
      return 'toast--' + this.notification.theme;
    },
  },
  watch: {
    notification() {
      console.log('new notification');
      if (this.showing) {
        clearTimeout(this.timer as number);
      }

      this.showing = true;

      this.timer = setTimeout(() => {
        this.showing = false;
        console.log('hiding notification now');
        this.timer = null;
      }, this.notification.duration);
    },
  },
  methods: {
    dismiss() {
      if (this.notification.dismissable) {
        this.showing = false;
        clearTimeout(this.timer as number);
      }
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
}

.toast {
  display: block;
  width: 100%;
  max-width: 450px; // WCAG 2.1 - 1.4.10. 450px = 1800px viewport at 400% zoom
  transform-origin: center 0%;
  user-select: none;
  @include useGridSpacing(margin-bottom);

  &-inner {
    box-shadow: $box-shadow;
    transition: background-color 0.2s;
    border-radius: $border-radius-base;
    padding: $default-spacing;
    background-color: $gray-900;
    color: rgba($white, 0.87);
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    cursor: pointer;

    &:hover {
      background-color: darken($gray-900, 5);
    }
  }

  &__content {
    flex: 1;
    word-break: break-word;
    font-weight: bold;
  }

  @mixin toast-theme($color, $bg-color) {
    .toast-inner {
      background-color: $bg-color;
      color: rgba($color, 0.87);

      &:hover {
        background-color: darken($bg-color, 5);
      }
    }
  }
  &--warning {
    @include toast-theme($text-color-dark, $brand-warning);
  }
  &--danger {
    @include toast-theme($white, $brand-danger);
  }
  &--success {
    @include toast-theme($white, $brand-success);
  }
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
  opacity: 0;
  transform: translateY(10px);

  @include prefers-reduced-motion() {
    transition: opacity 0.15s ease-out;
    transform: translateY(0px);
  }
}
</style>
