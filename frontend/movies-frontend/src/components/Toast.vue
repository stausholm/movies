<template>
  <div class="container toast-container">
    <transition name="toast">
      <output
        class="toast"
        :class="[notificationClass]"
        v-if="showing"
        @click="dismiss"
        role="status"
        :tabindex="notification.actionLabel && notification.action ? '0' : '-1'"
      >
        <div class="toast-inner">
          <div class="toast__content">
            <span>{{ notification.content }}</span>
          </div>
          <button
            class="toast__label"
            v-if="notification.actionLabel && notification.action"
            @click.stop="handleAction"
            ref="btn"
          >
            {{ notification.actionLabel }}
          </button>
          <button class="visually-hidden" @click.stop="dismiss">Dismiss</button>
        </div>
      </output>
    </transition>
  </div>
</template>

<script lang="ts">
import { Toast } from '@/store/toast/types';
import { defineComponent } from 'vue';

// should be focusable if there's an action. If there's an action there should also be a focussable dissmissable button. move focus to toast and focus trap.
// Once toast dissapears, either by dismissing it or countdown expires, move focus back to previously focused element
export default defineComponent({
  name: 'Toast',
  data() {
    return {
      showing: false,
      timer: null as null | number | undefined,
      previousFocusEl: null as null | Element,
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
        (this.previousFocusEl as HTMLElement)?.focus();
      }

      this.showing = true;

      // TODO: focus trap and esc to dismiss
      if (this.notification.action && this.notification.actionLabel) {
        this.$nextTick(() => {
          this.previousFocusEl = document.activeElement;
          (this.$refs.btn as HTMLButtonElement).focus();
        });
      }

      this.timer = setTimeout(() => {
        this.showing = false;
        (this.previousFocusEl as HTMLElement)?.focus();
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
    handleAction() {
      if (this.notification.action) {
        this.notification.action();
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
  box-shadow: $box-shadow;
  transform-origin: center 0%;
  user-select: none;
  @include useGridSpacing(margin-bottom);

  &-inner {
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
  }

  &__label {
    text-transform: uppercase;
    letter-spacing: 1.8px;
    font-size: 0.75rem;
    font-weight: 600;
    text-align: right;
    white-space: nowrap;
    color: $brand-info;
    margin: math.div(-$default-spacing, 2);
    margin-left: auto;
    border: 0;
    padding: math.div($default-spacing, 2);
    background-color: transparent;

    &:hover {
      text-decoration: underline;
      background-color: rgba($white, 0.05);
    }
  }

  @mixin toast-theme($bg-color, $color, $label-color) {
    .toast-inner {
      background-color: $bg-color;
      color: rgba($color, 0.87);

      &:hover {
        background-color: darken($bg-color, 5);
      }

      .toast__label {
        color: $label-color;
      }
    }
  }
  &--light {
    @include toast-theme(#fefefe, $brand-primary-bg__text-color, $brand-primary);
  }
  &--warning {
    @include toast-theme($gray-900, $text-color-light, $brand-warning);
  }
  &--danger {
    @include toast-theme($gray-900, $white, $brand-danger);
  }
  &--success {
    @include toast-theme($gray-900, $white, $brand-success);
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
