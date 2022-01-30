<template>
  <output class="toast" :class="[notificationClass]" @click="dismiss" role="status">
    <div class="toast-inner">
      <div class="toast__content">
        <span>{{ notification.content }}</span>
      </div>
      <button
        class="toast__label btn mt btn--uppercase"
        v-if="notification.actionLabel && notification.action"
        @click.stop="handleAction"
      >
        {{ notification.actionLabel }}
      </button>
    </div>
  </output>
</template>

<script lang="ts">
import { Toast } from '@/store/toast/types';
import { defineComponent, PropType } from 'vue';

export default defineComponent({
  name: 'Toast',
  data() {
    return {
      showing: false,
      timer: null as null | number | undefined,
    };
  },
  props: {
    notification: {
      type: Object as PropType<Toast>,
      required: true,
    },
  },
  computed: {
    notificationClass(): string {
      return 'toast--' + this.notification.theme;
    },
  },
  watch: {
    notification() {
      // existing notification modified
      if (this.showing) {
        clearTimeout(this.timer as number);
      }

      this.showing = true;

      this.timer = setTimeout(() => {
        this.showing = false;
        this.timer = null;
        this.$emit('done');
      }, this.notification.duration);
    },
  },
  methods: {
    dismiss() {
      if (this.notification.dismissable) {
        this.showing = false;
        clearTimeout(this.timer as number);
        this.$emit('done');
      }
    },
    handleAction() {
      if (this.notification.action) {
        this.notification.action();
      }
    },
  },
  created() {
    this.showing = true;

    this.timer = setTimeout(() => {
      this.showing = false;
      this.timer = null;
      this.$emit('done');
    }, this.notification.duration);
  },
  beforeUnmount() {
    clearTimeout(this.timer as number);
  },
});
</script>

<style lang="scss">
@use 'sass:math';
@import '@/design/variables/index.scss';
@import '@/design/mixins/index.scss';

.toast {
  display: block;
  max-width: 450px; // WCAG 2.1 - 1.4.10. 450px = 1800px viewport at 400% zoom
  transform-origin: center 0%;
  user-select: none;
  @include useGridSpacing(margin-bottom);
  pointer-events: auto;

  &-inner {
    box-shadow: $box-shadow;
    transition: background-color 0.2s;
    border-radius: $border-radius-base;
    padding: $default-spacing;
    background-color: $gray-900;
    color: rgba($white, 0.87);
    display: inline-block;
    cursor: pointer;

    @include hover() {
      background-color: darken($gray-900, 5);
    }

    @include breakpoint-max(xs) {
      width: 100%;
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

      .toast__label {
        background-color: rgba($color, 0.87);
        color: $bg-color;

        &:hover {
          background-color: $color;
        }
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
</style>
