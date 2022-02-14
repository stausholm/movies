<template>
  <div :class="classes">
    <slot />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'Zone',
  props: {
    theme: {
      type: String,
      default: '',
    },
  },
  computed: {
    classes() {
      return {
        zone: true,
        'zone--with-bg': this.theme,
        ['theme-' + this.theme]: this.theme,
      };
    },
  },
});
</script>

<style lang="scss" scoped>
.zone {
  position: relative;
  // z-index is needed for components like media cards that use a negative z-index for things like a backgroundimage.
  //Without a z-index defined, the zone would not be able to have a background color
  z-index: 1;

  &--with-bg {
    // Padding is set to 0.1 because modules inside the zone can have a margin / spacing between each other,
    // and the padding on the zone prevents module margins within the zone from collapsing with module margins from outside the zone
    // This way it ensures that a zone with a background, always has adequate spacing to modules outside the zone
    padding-top: 0.1px;
    padding-bottom: 0.1px;
  }
}
</style>
