<template>
  <svg
    xmlns="http://www.w3.org/2000/svg"
    :width="width"
    :height="height"
    viewBox="0 0 24 24"
    :aria-label="label"
    role="presentation"
  >
    <title lang="en">{{ label }} icon</title>
    <g :fill="color">
      <slot>
        <transition name="icon-scale">
          <component v-if="name" :is="iconComponent" />
        </transition>
      </slot>
    </g>
  </svg>
</template>

<script lang="ts">
import { defineComponent, defineAsyncComponent } from 'vue';
export default defineComponent({
  props: {
    label: {
      default: 'box',
      type: String,
    },
    name: {
      type: String,
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
    iconComponent(): any {
      // TODO: "any" type
      if (this.name) {
        return defineAsyncComponent(
          () =>
            import(
              /* webpackChunkName: "icon-[request]" */
              '@/components/icons/Icon' + this.name + '.vue'
            ) // TODO: don't animate on enter
        );
      }
      return null;
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

svg > g > g {
  position: absolute;
  transform-origin: center center;
}

// TODO: "transitionName" prop
.icon-rotate-enter-from {
  opacity: 0;
  transform: rotate(180deg);
}
.icon-rotate-enter-active {
  transition: opacity 0.2s ease-out, transform 0.2s ease-out;
}
.icon-rotate-leave-active {
  transition: opacity 0.2s ease-out, transform 0.4s ease-out;
  opacity: 0;
  transform: rotate(-180deg);
}

.icon-scale-enter-from,
.icon-scale-leave-to {
  opacity: 0;
  transform: scale(0.7);
}
.icon-scale-enter-active {
  transition: opacity 0.2s ease-out, transform 0.2s ease-out;
}
.icon-scale-leave-active {
  transition: opacity 0.2s ease-out, transform 0.1s ease-out;
}
</style>
