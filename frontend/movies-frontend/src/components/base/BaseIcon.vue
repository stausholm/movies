<template>
  <svg
    xmlns="http://www.w3.org/2000/svg"
    :width="width"
    :height="height"
    viewBox="0 0 24 24"
    :aria-label="label"
    role="presentation"
    focusable="false"
    class="icon"
  >
    <title lang="en">{{ label }} icon</title>
    <g :fill="color">
      <transition :name="transitionNameFormatted" :css="!!transitionNameFormatted">
        <slot>
          <g>
            <rect fill="none" height="24" width="24" />
            <path d="M12,2C6.47,2,2,6.47,2,12s4.47,10,10,10s10-4.47,10-10S17.53,2,12,2z" />
          </g>
        </slot>
      </transition>
    </g>
  </svg>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
export default defineComponent({
  props: {
    label: {
      default: '',
      type: String,
    },
    transition: {
      type: String,
      validator(val: string) {
        return ['rotate', 'scale'].includes(val);
      },
    },
    color: {
      default: 'currentColor',
      type: String,
    },
    width: {
      type: [Number, String],
      default: 24,
    },
    height: {
      type: [Number, String],
      default: 24,
    },
  },
  computed: {
    transitionNameFormatted(): string {
      return this.transition ? `__icon-transition-${this.transition}` : '';
    },
  },
});
</script>

<style lang="scss" scoped>
svg {
  display: inline-block;
  vertical-align: baseline;
  /* margin-bottom: -2px; */
}

// NOTE: this expects all icon components to use a <g> element as a root element in the icon's template
svg > g > g {
  position: absolute;
  transform-origin: center center;
}

.__icon-transition-rotate-enter-from {
  opacity: 0;
  transform: rotate(180deg);
}
.__icon-transition-rotate-enter-active {
  transition: opacity 0.2s ease-out, transform 0.2s ease-out;
}
.__icon-transition-rotate-leave-active {
  transition: opacity 0.2s ease-out, transform 0.4s ease-out;
  opacity: 0;
  transform: rotate(-180deg);
}

.__icon-transition-scale-enter-from,
.__icon-transition-scale-leave-to {
  opacity: 0;
  transform: scale(0.7);
}
.__icon-transition-scale-enter-active {
  transition: opacity 0.2s ease-out, transform 0.2s ease-out;
}
.__icon-transition-scale-leave-active {
  transition: opacity 0.2s ease-out, transform 0.1s ease-out;
}
</style>
