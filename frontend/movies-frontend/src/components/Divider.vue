<template>
  <div :class="classes" role="separator">{{ label }}</div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';

export default defineComponent({
  name: 'Divider',
  props: {
    label: {
      type: String,
      default: '',
    },
    dashed: {
      type: Boolean,
    },
    hairline: {
      type: Boolean,
    },
    padded: {
      type: Boolean,
    },
    labelPosition: {
      type: String as PropType<'center' | 'left' | 'right'>,
      default: 'center',
    },
  },
  computed: {
    classes() {
      return {
        divider: true,
        'divider--dashed': this.dashed,
        'divider--hairline': this.hairline,
        'divider--padded': this.padded,
        [`divider--content-${this.labelPosition}`]: this.label,
        'text-small': true,
      };
    },
  },
});
</script>

<style lang="scss" scoped>
@import '@/design/variables/index.scss';

.divider {
  // based on https://youzan.github.io/vant/#/en-US/divider
  $divider-margin: $default-spacing 0;
  $divider-border-color: $gray-400;
  $divider-text-color: $gray-600;
  $divider-line-height: 1.2;
  $divider-content-padding: $default-spacing;
  $divider-content-left-width: 10%;
  $divider-content-right-width: $divider-content-left-width;
  $divider-height: 1px;

  margin: $divider-margin;
  display: flex;
  align-items: center;
  border-style: solid;
  border-width: 0;
  border-color: $divider-border-color;
  user-select: none;

  line-height: $divider-line-height;
  color: $divider-text-color;

  &::before,
  &::after {
    display: block;
    flex: 1;
    box-sizing: border-box;
    height: 1px;
    border-color: inherit;
    border-style: inherit;
    border-width: $divider-height 0 0;
  }

  &::before {
    content: '';
  }

  &--hairline {
    &::before,
    &::after {
      transform: scaleY(0.5);
    }
  }

  &--dashed {
    border-style: dashed;
  }

  &--padded {
    padding: 0 $default-spacing;
  }

  &--content-center,
  &--content-left,
  &--content-right {
    &::before {
      margin-right: $divider-content-padding;
    }

    &::after {
      margin-left: $divider-content-padding;
      content: '';
    }
  }

  &--content-center {
    text-align: center;
  }

  &--content-left {
    &::before {
      max-width: $divider-content-left-width;
    }
  }

  &--content-right {
    &::after {
      max-width: $divider-content-right-width;
    }
  }
}
</style>
