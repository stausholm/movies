<template>
  <ul
    class="inline-list"
    :aria-label="label || null"
    :class="{ 'inline-list--custom-separator': separator }"
  >
    <li v-if="label" class="inline-list__label" role="presentation" aria-hidden="true">
      {{ label }}
    </li>
    <template v-if="items">
      <li v-for="item in items" :key="item" :data-separator="separator">
        <slot :item="item">{{ item }}</slot>
      </li>
    </template>
  </ul>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'InlineList',
  props: {
    separator: {
      type: String,
    },
    label: {
      type: String,
    },
    items: {
      type: Array,
      required: true,
    },
  },
});
</script>

<style lang="scss" scoped>
@use 'sass:math';
@import '@/design/variables/index.scss';
@import '@/design/mixins/index.scss';

.inline-list {
  display: flex;
  flex-flow: row wrap;
  list-style-type: none;
  padding: 0;
  margin: 0;

  li {
    display: flex;
    align-items: center;
    &:not(:last-child) {
      margin-right: math.div($default-spacing, 2);
    }
  }

  &__label {
    font-weight: bold;
  }

  &:not(.inline-list--custom-separator) {
    > li:not(:last-child):not(.inline-list__label) {
      &::after {
        display: inline-block;
        content: '';
        min-width: 4px;
        min-height: 4px;
        border-radius: 50%;
        background-color: currentColor;
        margin-left: math.div($default-spacing, 2);
      }
    }
  }

  &--custom-separator {
    > [data-separator]:not(:last-child) {
      &::after {
        white-space: pre;
        content: attr(data-separator);
      }
    }
  }
}
</style>
