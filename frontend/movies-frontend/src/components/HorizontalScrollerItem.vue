<template>
  <li class="hs-item">
    <div class="hs-item__inner">
      <slot></slot>
    </div>
  </li>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'HorizontalScrollerItem',
});
</script>

<style lang="scss" scoped>
@use 'sass:math';
@import '@/design/variables/index.scss';
@import '@/design/mixins/index.scss';
@import '@/design/functions/index.scss';

.hs-item {
  transform: translateZ(0); // prevent repainting entire component // TODO: check if necessary

  width: 200px;
  // containersize minus left+right padding on .container
  // divided by 3 to get 3 column layout
  // gutter-gap * 2, divided by 3 columns
  width: calc((cssvar(container-size) - $default-spacing * 2) / 3 - ($default-spacing * 2 / 3));

  &__inner {
    height: 100%;
  }
}
</style>
