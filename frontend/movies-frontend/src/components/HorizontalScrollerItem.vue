<template>
  <li
    class="hs-item"
    :tabindex="active ? 0 : -1"
    @keydown.left="left"
    @keydown.right="right"
    :class="{ active: active }"
  >
    <div class="hs-item__inner">
      <slot></slot>
    </div>
  </li>
</template>

<script lang="ts">
import { getFocusableChildren } from '@/utils/focus-trap';
import { defineComponent, inject } from 'vue';

export default defineComponent({
  name: 'HorizontalScrollerItem',
  setup() {
    const HorizontalScroller = inject('HorizontalScroller') as { count: number; active: number };

    return {
      HorizontalScroller,
    };
  },
  data() {
    return {
      index: -1,
    };
  },
  computed: {
    active(): boolean {
      return this.index === this.HorizontalScroller.active;
    },
  },
  methods: {
    left() {
      if (this.index === 0) {
        return;
      }
      this.HorizontalScroller.active = this.index - 1;
    },
    right() {
      if (this.index === this.HorizontalScroller.count - 1) {
        return;
      }
      this.HorizontalScroller.active = this.index + 1;
    },
    toggleChildrenTabindex(enable: boolean) {
      const focusableScrollerChildren = this.$el.querySelectorAll('[data-scroller-focusable]');
      if (enable) {
        focusableScrollerChildren.forEach((child: HTMLElement) => {
          child.tabIndex = 0;
        });
      } else {
        focusableScrollerChildren.forEach((child: HTMLElement) => {
          child.tabIndex = -1;
        });
      }
    },
  },
  created() {
    // TODO: use an array of indexes as unique ids for handling which one is active, to better be able to handle dynamically removing/adding scrollerItems
    this.index = this.HorizontalScroller.count++;
  },
  mounted() {
    const focusableChildren = getFocusableChildren(this.$el);
    focusableChildren.forEach((child) => {
      child.setAttribute('data-scroller-focusable', '1');
    });

    // init tabindex -1
    if (this.index === 0) {
      this.toggleChildrenTabindex(true);
    } else {
      this.toggleChildrenTabindex(false);
    }

    // we use this.$watch instead of the the standard watch property with options api, in order to not trigger on first load,
    // after the injected HorizontalScroller object is injected
    this.$watch('active', (isActive: boolean) => {
      if (isActive) {
        this.$el.focus(); // TODO: focus first focusable child if any exist
        this.toggleChildrenTabindex(true);
      } else {
        this.toggleChildrenTabindex(false);
      }
    });
  },
  beforeUnmount() {
    this.HorizontalScroller.count--;
  },
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

  &.active {
    border: 4px solid red;
  }
}
</style>
