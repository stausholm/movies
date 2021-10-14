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
        <component v-if="name" :is="iconComponent" />
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
    iconComponent() {
      if (this.name) {
        return defineAsyncComponent(
          () =>
            import(
              /* webpackChunkName: "icon-[request]" */
              '@/components/icons/Icon' + this.name + '.vue'
            )
        );
      }
      return null;
    },
  },
});
</script>

<style scoped>
svg {
  display: inline-block;
  vertical-align: baseline;
  /* margin-bottom: -2px; */
}
</style>
