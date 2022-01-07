<template>
  <base-icon :label="label" :color="color" :width="width" :height="height">
    <component :is="iconComponent" />
  </base-icon>
</template>

<script lang="ts">
import { ComponentPublicInstance, defineAsyncComponent, defineComponent } from 'vue';
import BaseIcon from './BaseIcon.vue';

export default defineComponent({
  components: {
    BaseIcon,
  },
  props: {
    label: {
      type: String,
    },
    name: {
      type: String,
      required: true,
    },
    color: {
      type: String,
    },
    width: {
      type: [Number, String],
    },
    height: {
      type: [Number, String],
    },
  },
  computed: {
    iconComponent(): ComponentPublicInstance | null {
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
