<template>
  <component :is="tag" class="resize-watcher">
    <slot v-bind="{ width, height }" />
  </component>
</template>

<script>
import { defineComponent } from 'vue';

// adapted from https://vuetensils.austingil.com/components/resize.html

export default defineComponent({
  name: 'ResizeWatcher',
  emits: ['resize'],
  props: {
    tag: {
      type: String,
      default: 'div',
    },
  },
  data() {
    return {
      observer: null,
      width: null,
      height: null,
    };
  },
  methods: {
    updateDimensions() {
      const el = this.$el;
      this.width = el.offsetWidth;
      this.height = el.offsetHeight;
      this.$emit('resize', arguments);
    },
  },
  mounted() {
    this.observer = new ResizeObserver(this.updateDimensions);
    this.observer.observe(this.$el);
  },
  beforeUnmount() {
    this.observer.disconnect();
  },
});
</script>
