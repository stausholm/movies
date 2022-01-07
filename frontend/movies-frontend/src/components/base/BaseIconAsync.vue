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
        return defineAsyncComponent({
          loader: () =>
            import(
              /* webpackChunkName: "icon-[request]" */
              '@/components/icons/Icon' + this.name + '.vue'
            ),
          // onError: (e) => {
          //   console.log(e);
          // },
          // loadingComponent: defineComponent({
          //   template: 'loading',
          // }),
          // errorComponent: defineComponent({
          //   template: 'error',
          // }),
          // delay: 200,
          // timeout: 5000,
        });
      }
      return null;
    },
  },
});
</script>
