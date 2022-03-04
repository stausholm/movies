<template>
  <li
    class="hs-item"
    :tabindex="active ? 0 : -1"
    @keydown.left="left"
    @keydown.right="right"
    :class="[colClasses, { active: active }]"
  >
    <div class="hs-item__inner">
      <slot></slot>
    </div>
  </li>
</template>

<script lang="ts">
import { getFocusableChildren } from '@/utils/focus-trap';
import { defineComponent, inject, PropType } from 'vue';

export default defineComponent({
  name: 'HorizontalScrollerItem',
  setup() {
    const HorizontalScroller = inject('HorizontalScroller') as {
      counter: number;
      items: number[];
      active: number;
    };

    return {
      HorizontalScroller,
    };
  },
  props: {
    colWidth: {
      type: [Number, Array] as PropType<number | number[]>,
    },
  },
  data() {
    return {
      indexKey: -1,
    };
  },
  computed: {
    active(): boolean {
      return this.indexKey === this.HorizontalScroller.active;
    },
    colClasses(): string {
      if (this.colWidth) {
        if (Array.isArray(this.colWidth)) {
          // colWidth is a list of widths representing the col's width at each of our scss min-width breakpoints
          return 'todo';
        } else {
          return 'todo';
        }
      }
      // No colWidth defined so don't use a fixed width, and instead let the content dictate the width
      return '';
    },
    indexInList(): number {
      return this.HorizontalScroller.items.indexOf(this.indexKey);
    },
  },
  methods: {
    left(e: KeyboardEvent) {
      // Prevent triggering a normal scroll in the container by pressing arrow keys.
      // Only scroll when a focused item triggers the scroll naturally
      e.preventDefault();

      if (this.indexInList === 0) {
        return;
      }
      this.HorizontalScroller.active = this.HorizontalScroller.items[this.indexInList - 1];
    },
    right(e: KeyboardEvent) {
      e.preventDefault();

      if (this.indexInList === this.HorizontalScroller.items.length - 1) {
        return;
      }
      this.HorizontalScroller.active = this.HorizontalScroller.items[this.indexInList + 1];
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
    this.indexKey = this.HorizontalScroller.counter++;
    this.HorizontalScroller.items.push(this.indexKey);
  },
  mounted() {
    const focusableChildren = getFocusableChildren(this.$el);
    focusableChildren.forEach((child) => {
      child.setAttribute('data-scroller-focusable', '1');
    });

    // init tabindex -1
    if (this.indexKey === 0) {
      this.toggleChildrenTabindex(true);
    } else {
      this.toggleChildrenTabindex(false);
    }

    // we use this.$watch instead of the the standard watch property with options api, in order to not trigger on first load,
    // after the injected HorizontalScroller object is injected
    this.$watch('active', (isActive: boolean) => {
      if (isActive) {
        this.toggleChildrenTabindex(true);
        const firstFocusableChild = this.$el.querySelector(
          '[data-scroller-focusable]'
        ) as HTMLElement | null;
        if (firstFocusableChild) {
          // focus first focusable child if any exist
          firstFocusableChild.focus();
        } else {
          // otherwise focus the scroller item
          this.$el.focus();
        }
      } else {
        this.toggleChildrenTabindex(false);
      }
    });
  },
  beforeUnmount() {
    // if this item is the currently active item, make the previous item the active one instead
    if (this.active) {
      this.HorizontalScroller.active = this.HorizontalScroller.items[this.indexInList - 1];
    }

    // remove this scroller item from list
    this.HorizontalScroller.items.splice(this.HorizontalScroller.items.indexOf(this.indexKey), 1);
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

  //width: 200px;
  // containersize minus left+right padding on .container
  // divided by 3 to get 3 column layout
  // gutter-gap * 2, divided by 3 columns
  //width: calc((cssvar(container-size) - $default-spacing * 2) / 3 - ($default-spacing * 2 / 3));
  // width: min(
  //   calc(100vw - 2 * $default-spacing),
  //   calc(cssvar(container-size) - 2 * $default-spacing)
  // );

  &__inner {
    height: 100%;
  }

  &.active {
    border: 4px solid red;
  }
}
</style>
