<template>
  <base-icon :label="label" :color="color" :width="width" :height="height">
    <component :is="iconComponent" />
  </base-icon>
</template>

<script lang="ts">
import { ComponentPublicInstance, defineAsyncComponent, defineComponent, h } from 'vue';
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
          // onError: (err) => {
          //   console.error(err);
          // },
          // loadingComponent: defineComponent({
          //   template: 'loading',
          // }),
          errorComponent: defineComponent({
            // fallback to solid circle
            render() {
              return h('g', [
                h('rect', { fill: 'none', height: 24, width: 24 }),
                h('path', {
                  d: 'M12,2C6.47,2,2,6.47,2,12s4.47,10,10,10s10-4.47,10-10S17.53,2,12,2z',
                }),
              ]);
            },
          }),
          // delay: 200,
          // timeout: 5000,
        });
      }
      return null;
    },
  },
  errorCaptured(err, instance, info) {
    console.error('[BaseIconAsync] Error captured:', err, instance, info);
    return false; // let the app know that we've handled the error here and don't allow it to bubble up.
  },
});
</script>
