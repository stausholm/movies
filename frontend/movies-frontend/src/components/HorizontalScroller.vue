<template>
  <div class="horizontal-scroller" :class="containerSize" role="group">
    <div class="horizontal-scroller__buttons">
      <div class="">
        <button
          class="hs-button hs-button--prev btn btn--rounded"
          type="button"
          @click="back"
          :disabled="buttonsDisabled.prev"
          :class="{ 'scrollbar-adjusted': showScrollbar }"
        >
          <span class="visually-hidden">Previous carousel page</span>
          <base-icon>
            <icon-chevron-left />
          </base-icon>
        </button>
        <button
          class="hs-button hs-button--next btn btn--rounded"
          type="button"
          @click="forwards"
          :disabled="buttonsDisabled.next"
          :class="{ 'scrollbar-adjusted': showScrollbar }"
        >
          <span class="visually-hidden">Next carousel page</span>
          <base-icon>
            <icon-chevron-right />
          </base-icon>
        </button>
      </div>
    </div>
    <span class="visually-hidden">
      Use left- and right- arrow keys to navigate between items in the list
      <!-- TODO: use this with aria to describe how to use the slider -->
    </span>
    <div
      class="horizontal-scroller__scroller"
      :class="{ 'hide-scrollbars': !showScrollbar, 'scroll-snap': scrollSnap }"
      ref="scroller"
    >
      <div class="container-spacer" aria-hidden="true"></div>
      <ul class="horizontal-scroller__scroller-inner" ref="scrollerContent">
        <slot />
      </ul>
      <observer
        v-if="intersectionRoot"
        @intersect="$emit('intersect')"
        :options="{ root: intersectionRoot, rootMargin: intersectionMargin }"
      />
      <div class="container-spacer" aria-hidden="true"></div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import Observer from '@/components/Observer.vue';
import BaseIcon from '@/components/base/BaseIcon.vue';
import IconChevronRight from '@/components/icons/IconChevronRight.vue';
import IconChevronLeft from '@/components/icons/IconChevronLeft.vue';

// https://bbc.github.io/gel/components/carousels/

export default defineComponent({
  name: 'HorizontalScroller',
  emits: ['intersect'],
  components: {
    Observer,
    BaseIcon,
    IconChevronRight,
    IconChevronLeft,
  },
  props: {
    intersectionMargin: {
      type: String,
      default: '200px',
    },
    showScrollbar: {
      type: Boolean,
      default: false,
    },
    scrollSnap: {
      type: Boolean,
      default: true,
    },
    containerSize: {
      type: String,
      default: '',
      validator(val: string) {
        return ['', 'xxs', 'small', 'big'].includes(val);
      },
    },
  },
  data() {
    return {
      intersectionRoot: null as null | HTMLElement,
      buttonsDisabled: {
        prev: true,
        next: false,
      },
      debounceFunc: undefined as number | undefined,
      horizontalScroller: {
        count: 0, // amount of scroller items in this component
        active: 0, // the scroller item's index that is currently active
      },
    };
  },
  methods: {
    back() {
      // on click, scroll the container half of it's own width
      const scroller = this.$refs.scroller as HTMLElement;
      const scrollAmount = scroller.offsetWidth / 2;
      scroller.scrollLeft -= scrollAmount;
    },
    forwards() {
      // on click, scroll the container half of it's own width
      const scroller = this.$refs.scroller as HTMLElement;
      const scrollAmount = scroller.offsetWidth / 2;
      scroller.scrollLeft += scrollAmount;
    },
    handleScroll() {
      clearTimeout(this.debounceFunc);
      this.debounceFunc = setTimeout(this.disableEnableButtons, 200);
    },
    disableEnableButtons() {
      const scroller = this.$refs.scroller as HTMLElement;
      this.buttonsDisabled.prev = scroller.scrollLeft < 1;
      this.buttonsDisabled.next =
        scroller.scrollLeft === scroller.scrollWidth - scroller.offsetWidth;
    },
  },
  mounted() {
    const scroller = this.$refs.scroller as HTMLElement;
    this.intersectionRoot = scroller;

    // TODO: handle page resize and cases where there are not enough list items to be scrollable and when list items gets added/removed
    scroller.addEventListener('scroll', this.handleScroll);
  },
  beforeUnmount() {
    const scroller = this.$refs.scroller as HTMLElement;
    scroller.removeEventListener('scroll', this.handleScroll);
    clearTimeout(this.debounceFunc);
  },
  provide() {
    return { HorizontalScroller: this.horizontalScroller };
  },
});
</script>

<style lang="scss">
@use 'sass:math';
@import '@/design/variables/index.scss';
@import '@/design/mixins/index.scss';

@function containerSize() {
  @return max(calc((100% - cssvar(container-size)) / 2 + $default-spacing), $default-spacing);
}

.horizontal-scroller {
  position: relative;

  @include setCssvar(container-size, $container-width);
  &.xxs {
    @include setCssvar(container-size, $container-width-xxs);
  }
  &.small {
    @include setCssvar(container-size, $container-width-small);
  }
  &.big {
    @include setCssvar(container-size, $container-width-big);
  }

  &__buttons {
    @include breakpoint-max($breakpoint-navigation-change) {
      display: none;
    }
    .hs-button {
      box-shadow: $box-shadow, inset 0 0 0 1px $gray-400;
      position: absolute;
      z-index: 1;
      top: 50%;

      &.scrollbar-adjusted {
        top: calc(50% - 15px); // scrollbar-height / 2
      }

      &:disabled {
        opacity: 0;
        transform: scale(0);
      }

      &--next {
        right: containerSize();
        transform: translateX($default-spacing * 0.75) translateY(-50%);
      }
      &--prev {
        left: containerSize();
        transform: translateX(-$default-spacing * 0.75) translateY(-50%);
      }
    }
  }

  &__scroller {
    scroll-behavior: smooth;

    @include prefers-reduced-motion() {
      scroll-behavior: auto;
    }

    // add extra padding so scroller doesn't cut of styles like a box-shadow on a .card,
    // and then subtract that extra padding so the scroller doesn't take up the extra space
    // TODO
    // padding-top: $default-spacing;
    // padding-bottom: $default-spacing;
    // margin-top: -$default-spacing;
    // margin-bottom: -$default-spacing;

    display: flex;
    overflow-x: auto;
    overscroll-behavior-inline: contain;
    -webkit-overflow-scrolling: touch;
    scroll-snap-type: x mandatory;

    scroll-padding-left: containerSize();
    scroll-padding-right: containerSize();
    .container-spacer {
      min-width: containerSize();
    }

    &.scroll-snap {
      .container-spacer,
      .hs-item {
        scroll-snap-align: start;
      }
    }

    &-inner {
      display: grid;
      grid-auto-flow: column;

      gap: $grid-gutter;
      @include breakpoint(xs) {
        gap: $grid-xs-gutter;
      }
      @include breakpoint(sm) {
        gap: $grid-sm-gutter;
      }

      list-style-type: none;
      margin: 0;
      padding: 0;
    }
  }
}

.hide-scrollbars {
  scrollbar-width: none;
  -ms-overflow-style: none;

  &::-webkit-scrollbar {
    display: none;
  }
}

@mixin scrollbars($size, $foreground-color, $background-color: mix($foreground-color, white, 30%)) {
  // For Google Chrome
  &::-webkit-scrollbar {
    width: $size;
    height: $size;
  }

  &::-webkit-scrollbar-thumb {
    background: $foreground-color;
    background: linear-gradient(to right, rgba(0, 0, 0, 0) $default-spacing, rgba(0, 0, 0, 0) 100%),
      linear-gradient(to left, rgba(0, 0, 0, 0) $default-spacing, rgba(0, 0, 0, 0) 100%),
      linear-gradient(
        to bottom,
        rgba(0, 0, 0, 0) 0%,
        rgba(0, 0, 0, 0) 45%,
        rgba($foreground-color, 1) 46%,
        rgba($foreground-color, 1) 54%,
        rgba(0, 0, 0, 0) 55%,
        rgba(0, 0, 0, 0) 100%
      );

    &:hover {
      background: $foreground-color;
      background: linear-gradient(
          to right,
          rgba(0, 0, 0, 0) $default-spacing,
          rgba(0, 0, 0, 0) 100%
        ),
        linear-gradient(to left, rgba(0, 0, 0, 0) $default-spacing, rgba(0, 0, 0, 0) 100%),
        linear-gradient(
          to bottom,
          rgba(0, 0, 0, 0) 0%,
          rgba(0, 0, 0, 0) 40%,
          rgba($foreground-color, 1) 41%,
          rgba($foreground-color, 1) 59%,
          rgba(0, 0, 0, 0) 60%,
          rgba(0, 0, 0, 0) 100%
        );
    }
  }

  &::-webkit-scrollbar-track {
    background: $background-color;
    background: linear-gradient(to right, rgba(0, 0, 0, 0) $default-spacing, rgba(0, 0, 0, 0) 100%),
      linear-gradient(to left, rgba(0, 0, 0, 0) $default-spacing, rgba(0, 0, 0, 0) 100%),
      linear-gradient(
        to bottom,
        rgba(0, 0, 0, 0) 0%,
        rgba(0, 0, 0, 0) 45%,
        rgba($background-color, 1) 46%,
        rgba($background-color, 1) 54%,
        rgba(0, 0, 0, 0) 55%,
        rgba(0, 0, 0, 0) 100%
      );
  }
  // For Internet Explorer
  scrollbar-face-color: $foreground-color;
  scrollbar-track-color: $background-color;
}
.horizontal-scroller__scroller {
  @include scrollbars(30px, $body-color);
}
</style>
