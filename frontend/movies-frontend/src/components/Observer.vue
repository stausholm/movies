<template>
  <div class="observer-sentinel" style="height: 0px; width: 0px" />
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';

// emits event when user scrolls element into view/when options conditions are met
export default defineComponent({
  name: 'Observer',
  emits: ['intersect'],
  props: {
    options: {
      // intersection observer 'options' param
      // eslint-disable-next-line no-undef
      type: [Object, undefined] as PropType<IntersectionObserverInit | undefined>,
    },
  },
  data() {
    return {
      observer: null as null | IntersectionObserver,
    };
  },
  mounted() {
    const options = this.options || {};
    this.observer = new IntersectionObserver(([entry]) => {
      if (entry && entry.isIntersecting) {
        this.$emit('intersect');
        console.log('intersecting');
      }
    }, options);

    this.observer.observe(this.$el);
  },
  beforeUnmount() {
    if (this.observer) {
      this.observer.disconnect();
    }
  },
});
</script>
