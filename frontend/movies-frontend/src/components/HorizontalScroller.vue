<template>
  <div class="horizontal-scroller" role="group">
    <div class="horizontal-scroller__buttons">
      <button
        class="hs-button hs button--prev"
        type="button"
        @click="back"
        :disabled="buttonsDisabled.prev"
      >
        <span class="visually-hidden">Previous</span>
        <base-icon>
          <icon-chevron-left />
        </base-icon>
      </button>
      <button
        class="hs-button hs button--next"
        type="button"
        @click="forwards"
        :disabled="buttonsDisabled.next"
      >
        <span class="visually-hidden">Next</span>
        <base-icon>
          <icon-chevron-right />
        </base-icon>
      </button>
    </div>
    <div
      class="horizontal-scroller__scroller"
      :class="[containerSize, { 'hide-scrollbars': !showScrollbar }]"
      ref="scroller"
    >
      <div class="container-spacer" aria-hidden="true"></div>
      <ul class="horizontal-scroller__scroller-inner">
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
    containerSize: {
      type: String,
      default: '',
      validator(val: string) {
        return ['', 'xxs', 'small', 'big', 'fluid'].includes(val);
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
    };
  },
  mounted() {
    const scroller = this.$refs.scroller as HTMLElement;
    this.intersectionRoot = scroller;

    scroller.addEventListener('scroll', this.handleScroll);
    // TODO: handle page resize and cases where there are not enough list items to be scrollable and when list items gets added/removed
  },
  beforeUnmount() {
    const scroller = this.$refs.scroller as HTMLElement;
    scroller.removeEventListener('scroll', this.handleScroll);
    clearTimeout(this.debounceFunc);
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
});
</script>

<style lang="scss" scoped>
@use 'sass:math';
@import '@/design/variables/index.scss';
@import '@/design/mixins/index.scss';

$scroll-gap: $default-spacing;

.horizontal-scroller {
  &__scroller {
    scroll-behavior: smooth;

    @include prefers-reduced-motion() {
      scroll-behavior: auto;
    }

    display: flex;
    overflow-x: auto;
    overscroll-behavior-inline: contain;
    -webkit-overflow-scrolling: touch;
    scroll-snap-type: x mandatory;

    //scroll-padding-left: $scroll-gap;
    //scroll-padding-right: $scroll-gap;
    //padding-left: $scroll-gap;
    //padding-right: $scroll-gap;

    // margin-left: calc(-50vw);
    // margin-right: calc(-50vw);
    // width: calc(100vw);
    // position: relative;
    // left: 50%;
    // right: 50%;
    // background: yellow;
    // padding-left: max(calc((100vw - 1000px) / 2 + 16px), 16px);
    // padding-right: max(calc((100vw - 1000px) / 2 + 16px), 16px);
    // scroll-padding-left: max(calc((100vw - 1000px) / 2 + 16px), 16px);
    // scroll-padding-right: max(calc((100vw - 1000px) / 2 + 16px), 16px);

    // TODO: scroll gap between items should be half of gap out to edge of screen
    // This could also be solved by having a padding-left and padding right of $default-spacing/2 on .hs-item
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
    &.fluid {
      @include setCssvar(container-size, 100%);
    }
    // scroll-padding-left: $scroll-gap;
    // scroll-padding-right: $scroll-gap;
    scroll-padding-left: max(
      calc((100% - cssvar(container-size)) / 2 + $default-spacing),
      $default-spacing
    );
    scroll-padding-right: max(
      calc((100% - cssvar(container-size)) / 2 + $default-spacing),
      $default-spacing
    );
    .container-spacer {
      scroll-snap-align: start;
      min-width: max(
        calc((100% - cssvar(container-size)) / 2 + $default-spacing),
        $default-spacing
      );
    }

    &-inner {
      display: grid;
      grid-auto-flow: column;
      gap: $scroll-gap;

      // TODO: scroll gap between items is half of gap out to edge of screen on mobile only
      @media (max-width: $container-width-small) {
        gap: math.div($scroll-gap, 2);
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
