<template>
  <li class="icon-list-item">
    <div class="icon-list-item__icon">
      <base-icon-async v-if="icon" :name="icon" :width="14" :height="14" />
      <base-icon v-else :width="14" :height="14">
        <icon-check />
      </base-icon>
    </div>
    <div class="icon-list-item__text">
      <slot />
    </div>
  </li>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import BaseIcon from '@/components/base/BaseIcon.vue';
import BaseIconAsync from '@/components/base/BaseIconAsync.vue';
import IconCheck from '@/components/icons/IconCheck.vue';

export default defineComponent({
  name: 'IconListItem',
  components: {
    BaseIcon,
    BaseIconAsync,
    IconCheck,
  },
  props: {
    icon: {
      type: String,
    },
  },
});
</script>

<style lang="scss" scoped>
@use 'sass:math';
@import '@/design/variables/index.scss';
@import '@/design/mixins/index.scss';

.icon-list-item {
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  justify-content: flex-start;
  align-items: stretch;

  &:not(:first-child) {
    margin-top: $default-spacing * 0.75;
  }
  &__icon {
    width: $icon-size-default;
    height: $icon-size-default;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: $brand-primary-lighter;
    border-radius: 50%;
    color: $brand-primary-bg__text-color;
    flex-shrink: 0;
    margin-right: math.div($default-spacing, 2);

    @include breakpoint($breakpoint-font-size-change) {
      margin-right: $default-spacing;
    }
  }
  &__text {
    &::before {
      content: '';
      display: inline-block;
      height: math.div($icon-size-default, 2) * $line-height-body;
    }
  }
}
</style>
