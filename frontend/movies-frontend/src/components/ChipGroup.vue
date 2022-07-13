<template>
  <div class="chip-group-wrapper">
    <div
      class="chip-group"
      :class="{ 'chip-group--scrollable': scrollable }"
      :aria-label="label"
      aria-orientation="horizontal"
      v-bind="computedAttributes"
    >
      <div class="chip-group__inner" role="presentation">
        <slot />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';
import { chipType } from '@/types/Chips';

export default defineComponent({
  name: 'ChipGroup',
  props: {
    type: {
      type: String as PropType<chipType>,
      // the type that all chips in this chip group are
      // "presentation": purely presentational, chip not for use as a button, radio, or checkbox
      // "radio": function as a radiobutton input
      // "checkbox": function as a checkbox/checkboxlist input
      // "button" function as a button
      required: true,
    },
    label: {
      type: String,
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
  computed: {
    isPresentation(): boolean {
      return this.type === 'presentation';
    },
    computedAttributes() {
      if (this.type === 'presentation') {
        return {
          role: 'presentation',
        };
      }
      if (this.type === 'button') {
        return {};
      }

      return {
        role: 'listbox',
        tabindex: '0',
        'aria-required': this.required,
        'aria-disabled': this.disabled,
        'aria-multiselectable': this.type === 'checkbox',
      };
    },
  },
  provide() {
    return { ChipType: this.type };
  },
});
</script>

<style lang="scss" scoped>
@use 'sass:math';
@import '@/design/variables/index.scss';
@import '@/design/mixins/index.scss';

.chip-group {
  display: flex;
  padding-top: math.div($default-spacing, 4);
  padding-bottom: math.div($default-spacing, 4);

  &__inner {
    display: flex;
    flex-flow: wrap;
    margin-left: math.div(-$default-spacing, 2);
    margin-right: 0;
    min-width: 100%;
  }

  &-wrapper {
    margin-top: math.div(-$default-spacing, 2);
    margin-bottom: math.div(-$default-spacing, 2);
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
}
</style>
