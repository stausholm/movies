<template>
  <div class="horizontal-scroller" :class="containerSize" role="group">
    <div class="horizontal-scroller__buttons">
      <div :class="{ 'buttons-rounded': buttonsRounded, 'buttons-faded': !buttonsRounded }">
        <!-- NOTE: We handle keyboard navigation with arrowkeys, so we prevent these from being navigatable via tabing -->
        <button
          class="hs-button hs-button--prev btn btn--rounded"
          type="button"
          @click="back"
          :disabled="buttonsDisabled.prev"
          :class="{ 'scrollbar-adjusted': showScrollbar }"
          aria-hidden="true"
          tabindex="-1"
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
          aria-hidden="true"
          tabindex="-1"
        >
          <span class="visually-hidden">Next carousel page</span>
          <base-icon>
            <icon-chevron-right />
          </base-icon>
        </button>
      </div>
    </div>
    <span class="visually-hidden-focusable mb-1 d-flex" tabindex="0">
      <div class="container-spacer" aria-hidden="true"></div>
      Use left- and right- arrow keys to navigate between items in the list
      <div class="container-spacer" aria-hidden="true"></div>
    </span>
    <div
      class="horizontal-scroller__scroller"
      :class="{ 'hide-scrollbars': !showScrollbar, 'scroll-snap': scrollSnap }"
      ref="scroller"
    >
      <div class="container-spacer" aria-hidden="true"></div>
      <ul class="horizontal-scroller__scroller-inner" :class="{ 'use-css-gap': useCssGap }">
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
    useCssGap: {
      type: Boolean,
      default: false,
    },
    buttonsRounded: {
      type: Boolean,
      default: false,
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
        counter: 0, // handling unique keys for each scroller item
        items: [] as number[], // all scroller items in this component
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

  @include hover() {
    .buttons-faded .hs-button {
      opacity: 1;
    }
  }
  &__buttons {
    @include breakpoint-max($breakpoint-navigation-change) {
      display: none;
    }
    .buttons-rounded {
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

    .buttons-faded {
      .hs-button {
        opacity: 0;
        position: absolute;
        z-index: 1;
        top: $default-spacing;
        bottom: $default-spacing;
        border-radius: 0;
        width: 64px;
        background: linear-gradient(
          to right,
          rgba($gray-400, 0) 0%,
          rgba($gray-400, 0.11) 11%,
          rgba($gray-400, 0.22) 22%,
          rgba($gray-400, 0.33) 33%,
          rgba($gray-400, 0.44) 44%,
          rgba($gray-400, 0.56) 56%,
          rgba($gray-400, 0.67) 67%,
          rgba($gray-400, 0.78) 78%,
          rgba($gray-400, 0.89) 89%,
          rgba($gray-400, 1) 100%
        );

        svg {
          width: 32px;
          height: 32px;
        }
        &:disabled {
          opacity: 0;
        }

        &--next {
          right: 0;
        }
        &--prev {
          left: 0;
          transform: rotate(180deg);

          svg {
            transform: rotate(180deg);
          }
        }
      }
    }
  }

  .container-spacer {
    min-width: containerSize();
  }

  &__scroller {
    scroll-behavior: smooth;

    @include prefers-reduced-motion() {
      scroll-behavior: auto;
    }

    // add extra padding so scroller doesn't cut of styles like a box-shadow on a .card,
    // and then subtract that extra padding so the scroller doesn't take up the extra space
    padding-top: $default-spacing;
    padding-bottom: $default-spacing;
    margin-top: -$default-spacing;
    margin-bottom: -$default-spacing;

    display: flex;
    overflow-x: auto;
    overscroll-behavior-inline: contain;
    -webkit-overflow-scrolling: touch;
    scroll-snap-type: x mandatory;

    scroll-padding-left: containerSize();
    scroll-padding-right: containerSize();

    &.scroll-snap {
      .container-spacer,
      .hs-item__inner {
        scroll-snap-align: start;
      }
    }

    &-inner {
      display: grid;
      grid-auto-flow: column;

      // use our default flexbox grid column classes sizes
      &:not(.use-css-gap) {
        @include setCssvar(grid-gutter, $grid-gutter);
        margin-left: calc(0px - cssvar(grid-gutter) / 2);
        margin-right: calc(0px - cssvar(grid-gutter) / 2);
        @include breakpoint(xs) {
          @include setCssvar(grid-gutter, $grid-xs-gutter);
        }
        @include breakpoint(sm) {
          @include setCssvar(grid-gutter, $grid-sm-gutter);
        }

        .hs-item {
          padding-bottom: 0;
          width: min(
            calc(
              (cssvar(container-size) - ($default-spacing * 2) + cssvar(grid-gutter)) /
                $grid-columns * cssvar(col-size)
            ),
            calc(
              (100vw - ($default-spacing * 2) + cssvar(grid-gutter)) / $grid-columns *
                cssvar(col-size)
            )
          );
        }
      }

      // don't use our flexbox grid column classes but handle column sizes manually
      &.use-css-gap {
        gap: $grid-gutter;
        @include breakpoint(xs) {
          gap: $grid-xs-gutter;
        }
        @include breakpoint(sm) {
          gap: $grid-sm-gutter;
        }
      }

      list-style-type: none;
      margin-top: 0;
      margin-bottom: 0;
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
