<template>
  <div
    class="chip-group"
    :class="{ 'chip-group--scrollable': scrollable }"
    :aria-label="label"
    tabindex="0"
    role="listbox"
    :aria-required="required"
    :aria-disabled="disabled"
    :aria-multiselectable="multiselectable"
    aria-orientation="horizontal"
  >
    <div class="chip-group__inner" role="presentation">
      <slot />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'ChipGroup',
  props: {
    label: {
      type: String,
      required: true,
    },
    multiselectable: {
      // should be set to true with checkbox chips
      type: Boolean,
      required: true,
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    required: {
      type: Boolean,
      default: false,
    },
    scrollable: {
      type: Boolean,
      default: false,
    },
  },
});
</script>

<style lang="scss" scoped>
@use 'sass:math';
@import '@/design/variables/index.scss';
@import '@/design/mixins/index.scss';

.chip-group {
  display: flex;
  padding-top: 4px;
  padding-bottom: 4px;

  &__inner {
    display: flex;
    flex-flow: wrap;
    margin-left: -8px;
    margin-right: 0;
    min-width: 100%;
  }

  &--scrollable {
    margin-left: -$default-spacing;
    margin-right: -$default-spacing;
    .chip-group__inner {
      padding-left: $default-spacing;
      padding-right: $default-spacing;
      flex-wrap: nowrap;
      overflow-x: auto;
    }
  }

  // TODO: clean up css
}
</style>
