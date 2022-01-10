<template>
  <transition :name="transition" appear>
    <!-- TODO: get enter/leave transition working again https://v3.vuejs.org/guide/migration/transition-as-root.html#overview -->
    <aside
      v-if="!dismissed && !!visible"
      :class="[
        'side-note',
        `side-note--${type}`,
        {
          'side-note--dismissable': dismissable,
          'hide-icon': hideIcon,
          'side-note--bordered': bordered,
        },
      ]"
    >
      <div class="d-flex align-center mb" v-if="title || !hideIcon">
        <div
          class="side-note__icon mr"
          :class="{ 'side-note__icon--bordered': bordered }"
          aria-hidden="true"
          v-if="!hideIcon"
        >
          <base-icon-async :width="18" :height="18" :name="iconName" />
        </div>
        <strong class="side-note__title" v-if="title">{{ title }}</strong>
      </div>
      <div v-if="dismissable" class="side-note__dismiss p">
        <span class="side-note__dismiss-countdown mr text-small" v-if="typeof visible === 'number'"
          >Dismisses in {{ visible }}s..</span
        >
        <button
          :aria-label="dismissLabel"
          class="side-note__dismiss-btn btn--absolute-sized"
          @click="dismiss"
        >
          <base-icon-async name="Close" />
        </button>
      </div>
      <div class="side-note__body">
        <slot />
        <div class="side-note__expanded" v-if="hasExpandedChildren">
          <div v-if="!showExpandedChildren">
            <button
              @click="showExpandedChildren = true"
              class="side-note__expanded-toggle btn--absolute-sized d-flex align-center fw-bold"
            >
              <span>Show more</span>
              <base-icon-async name="ChevronDown" />
            </button>
          </div>
          <transition name="slide-down">
            <div class="side-note__expanded-content" v-if="showExpandedChildren">
              <slot name="expanded"></slot>
            </div>
          </transition>
        </div>
      </div>
    </aside>
  </transition>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';
import BaseIconAsync from '@/components/base/BaseIconAsync.vue';

/**
 * Sources:
 * https://joshwcomeau.com/react/animated-sparkles-in-react/ (general design)
 * https://vuetensils.stegosource.com/components/alert.html#dismissible (alert functionality)
 * https://github.com/Stegosource/vuetensils/blob/master/src/components/VAlert/VAlert.vue
 */

export default defineComponent({
  name: 'BaseNote',
  components: { BaseIconAsync },
  props: {
    type: {
      type: String as PropType<'info' | 'warning' | 'success' | 'error'>,
      default: 'info',
      // validator(val: string) { // TODO: why does this kill typescript?
      //   return ['info', 'warning', 'success', 'error'].includes(val);
      // },
    },
    title: {
      type: String,
    },
    visible: {
      // determines whether the note is visible. Also binds with v-model:visible
      type: [Boolean, Number] as PropType<boolean | number>,
      default: true,
    },
    dismissable: {
      type: Boolean,
      default: false,
    },
    dismissLabel: {
      // aria-label for dismiss button
      type: String,
      default: 'Dismiss this note',
    },
    hideIcon: {
      // optionally hide the icon
      type: Boolean,
      default: false,
    },
    icon: {
      // optionally show custom icon
      type: String,
    },
    transition: {
      // a transition name if you want to add one
      type: String,
      default: undefined,
    },
    bordered: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      dismissed: false,
      timerId: null as null | number,
      showExpandedChildren: false,
    };
  },
  computed: {
    hasExpandedChildren() {
      return this.$slots.expanded && this.$slots.expanded().length > 0;
    },
    iconName() {
      const defaults = {
        info: 'InfoCircle',
        warning: 'WarningTriangle',
        success: 'Check',
        error: 'ErrorCircle',
      };
      return this.icon || defaults[this.type];
    },
  },
  methods: {
    dismiss() {
      // Fired when a user manually dismissed an alert
      this.$emit('dismiss');
      this.dismissed = true;
      if (typeof this.visible === 'number') {
        this.$emit('update:visible', 0);
        this.clearTimer();
      } else {
        this.$emit('update:visible', false);
      }
    },
    countdown() {
      const visible = this.visible as number;
      if (visible <= 0) return;
      this.timerId = setTimeout(() => {
        // Fired whenever the visibility changes. Either through user interaction, or a countdown timer
        this.$emit('update:visible', visible - 1);
      }, 1000);
    },
    clearTimer() {
      const { timerId } = this;
      if (timerId) {
        clearInterval(timerId);
        this.timerId = null;
      }
    },
  },
  watch: {
    visible: {
      handler(visible) {
        if (visible) {
          this.dismissed = false;
        }
        if (typeof visible === 'number') {
          this.clearTimer(); // Clear timers in case this.visible watcher adds multiples
          this.countdown();
        }
      },
      immediate: true,
    },
  },
  beforeUnmount() {
    this.clearTimer();
  },
});
</script>

<style lang="scss">
@use 'sass:math';
@import '@/design/variables/index.scss';
@import '@/design/mixins/index.scss';

.side-note {
  $color-muted: #dfebf6;
  $color-info: #4433ff;
  $color-alert-background: #faf2be;
  $color-alert: #ff9d00;
  $color-success-background: #dff5f2;
  $color-success: #00cc88;
  $color-error-background: #f5e1ec;
  $color-error: #f90657;
  $color-background: #ffffff;
  $color-text: #0a0c10;
  $color-primary: #4433ff;

  // TODO: darkmode
  //darkmode variables
  // $color-muted: hsl(210deg, 38%, 15%);
  // $color-info: hsl(230deg, 92%, 63%);
  // $color-alert-background: hsla(38deg, 100%, 50%, 0.1);
  // $color-alert: hsl(30deg, 100%, 50%);
  // $color-success-background: hsla(160deg, 100%, 40%, 0.1);
  // $color-success: hsl(160deg, 100%, 40%);
  // $color-error-background: hsla(340deg, 95%, 43%, 0.1);
  // $color-error: hsl(340deg, 95%, 60%);
  // $color-background: hsl(210deg, 30%, 8%);
  // $color-text: hsl(0deg, 0%, 100%);
  // $color-primary: hsl(333deg, 100%, 52%);

  position: relative;
  padding-top: $default-spacing * 1.5;
  padding-bottom: $default-spacing * 1.5;
  padding-left: $default-spacing;
  padding-right: $default-spacing;
  color: $color-text;
  border-radius: $border-radius-base;

  @include breakpoint(sm) {
    padding-left: $default-spacing * 2;
    padding-right: $default-spacing * 2;
  }

  &.side-note--bordered {
    border-width: $border-width-base;
    border-style: solid;

    .side-note__icon {
      background: $color-background;
      border-width: $border-width-base;
      transform: translateY(calc(50% - math.div($border-width-base, 2))) translateX(-50%);

      @include breakpoint(sm) {
        left: $default-spacing * 2 - $border-width-base;
        transform: translateY(calc(50% - math.div($border-width-base, 2)));
      }
    }
  }

  // TODO: margins should not be on the component itself
  margin-top: $default-spacing * 3;
  margin-bottom: $default-spacing * 4;

  &--info {
    background: $color-muted;
    border-color: $color-info;

    .side-note__icon {
      color: $color-muted;
      background-color: #8a80ff;
    }
    .side-note__icon--bordered {
      color: $color-info;
    }

    .link {
      &:after {
        background-color: $color-info;
      }

      &:hover,
      &:focus {
        color: $color-info;
      }
    }
  }

  &--warning {
    background: $color-alert-background;
    border-color: $color-alert;

    .side-note__icon {
      color: $color-alert-background;
      background-color: #fea921;
      border-radius: 25% 25%;
    }
    .side-note__icon--bordered {
      color: $color-alert;
    }

    .link {
      &:after {
        background-color: $color-alert;
      }

      &:hover,
      &:focus {
        color: $color-alert;
      }
    }
  }

  &--success {
    background: $color-success-background;
    border-color: $color-success;

    .side-note__icon {
      color: $color-success-background;
      background-color: $color-success;
    }
    .side-note__icon--bordered {
      color: $color-success;
    }

    .link {
      &:after {
        background-color: $color-success;
      }

      &:hover,
      &:focus {
        color: $color-success;
      }
    }
  }

  &--error {
    background: $color-error-background;
    border-color: $color-error;

    .side-note__icon {
      color: $color-error-background;
      background-color: $color-error;
    }
    .side-note__icon--bordered {
      color: $color-error;
    }

    .link {
      &:after {
        background-color: $color-error;
      }

      &:hover,
      &:focus {
        color: $color-error;
      }
    }
  }

  &__body {
    > *:last-child {
      margin-bottom: 0 !important;
    }
  }

  &__icon {
    padding: math.div($default-spacing, 2);
    border-radius: 50%;
    display: inline-block;
    position: absolute;
    bottom: 100%;
    left: 50%;
    border-style: solid;

    // non --bordered stykes
    border-width: $border-width-large;
    transform: translateY(50%) translateX(-50%);

    @include breakpoint(sm) {
      left: $default-spacing * 2 - $border-width-large * 2;
      transform: translateY(50%);
    }

    svg {
      display: block;
    }
  }

  &--dismissable {
    padding-top: $min-touch-target-size;
  }

  &__dismiss {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: $min-touch-target-size;
    display: flex;
    align-items: center;
    justify-content: flex-end;

    &-btn {
      color: currentColor;
      line-height: 0;
      margin-right: math.div($default-spacing, 4);
    }
  }

  &__expanded {
    &-toggle {
      &:focus:not(:focus-visible) {
        outline: none;
      }

      transition: color 0.2s ease-out;

      &:hover {
        color: $color-primary;
      }

      .icon {
        margin-left: math.div($default-spacing, 4);
      }
    }
  }
}
</style>
