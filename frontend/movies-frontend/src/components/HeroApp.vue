<template>
  <div
    class="sticky-top"
    ref="stickyTop"
    :class="{
      'scrolled-top': scrolledToTheTop,
      'scrolling-down': scrollingDown,
      'scrolled-to-hero-content-bottom': scrolledToHeroContentBottom,
      'scrolled-to-sticky-content': scrolledToStickycontent,
    }"
  >
    <div class="sticky-top-background" aria-hidden="true" ref="stickyTopBackground"></div>
    <div class="sticky-top__inner">
      <base-button
        class="btn--rounded sticky-back"
        @click="goBack"
        v-if="isMobileLayout && showBackButton"
        data-pushtip="Go back"
      >
        <span class="visually-hidden">Go back</span>
        <base-icon>
          <icon-arrow-left />
        </base-icon>
      </base-button>

      <span class="fw-bold title text-truncate" aria-hidden="true" ref="stickyTitle">{{
        titleComputed
      }}</span>

      <transition name="fade">
        <div
          class="sticky-actions"
          v-if="isMobileLayout || (!isMobileLayout && scrolledToHeroContentBottom)"
        >
          <base-button
            v-if="actions && actions.length === 1 && actions[0].icon"
            class="btn--rounded hero-action"
            :data-pushtip="actions[0].label"
            @click="$emit(actions[0].emit)"
          >
            <base-icon-async :name="actions[0].icon" />
          </base-button>
          <context-menu-button
            v-else-if="actions && actions.length"
            :actions="actions"
            id="hero-actions"
            class="hero-actions"
            v-bind="$attrs"
          />
        </div>
      </transition>
    </div>
  </div>
  <div
    ref="heroWrapper"
    class="hero-wrapper app-hero"
    :class="[
      className,
      {
        'scrolled-top': scrolledToTheTop,
        'scrolling-down': scrollingDown,
        'scrolled-to-hero-content-bottom': scrolledToHeroContentBottom,
        'scrolled-to-sticky-content': scrolledToStickycontent,
      },
    ]"
  >
    <hero
      :background="background"
      :bgImage="bgImage"
      :slim="slim"
      :tall="tall"
      :bgImageSources="bgImageSources"
      ref="hero"
    >
      <div class="hero-content-wrapper">
        <div class="hero-content" ref="heroContent">
          <slot :title="titleComputed">
            <h1 class="mb-0">{{ titleComputed }}</h1>
          </slot>
        </div>
        <div class="desktop-actions" v-if="!isMobileLayout && actions && actions.length > 0">
          <base-button
            v-if="actions && actions.length === 1 && actions[0].icon"
            class="btn--rounded hero-action ml-1"
            :data-pushtip="actions[0].label"
            @click="$emit(actions[0].emit)"
          >
            <base-icon-async :name="actions[0].icon" />
          </base-button>
          <context-menu-button
            v-else-if="actions && actions.length"
            :actions="actions"
            id="hero-actions-desktop"
            class="hero-actions ml-1"
            buttonClass="btn--text"
            v-bind="$attrs"
          />
        </div>
      </div>
    </hero>
  </div>
  <div class="sticky-content" v-if="$slots.stickyContent" ref="stickyContent">
    <slot name="stickyContent"></slot>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import BaseButton from '@/components/base/BaseButton.vue';
import BaseIcon from '@/components/base/BaseIcon.vue';
import BaseIconAsync from '@/components/base/BaseIconAsync.vue';
import IconArrowLeft from '@/components/icons/IconArrowLeft.vue';
import ContextMenuButton from '@/components/ContextMenuButton.vue';
import { AppLayoutSizeWidth } from '@/store/app/types';
import Hero from '@/components/Hero.vue';
import { clamp } from '@/utils/generic';

export default defineComponent({
  inheritAttrs: false,
  components: {
    BaseButton,
    BaseIcon,
    BaseIconAsync,
    IconArrowLeft,
    ContextMenuButton,
    Hero,
  },
  name: 'HeroApp',
  props: {
    ...Hero.props,
    showBackButton: {
      type: Boolean,
      default: false,
    },
    actions: {
      type: Array,
      required: false,
    },
    title: {
      type: String,
      //required: true,
    },
    class: {
      // since $attrs is bound to the <context-menu-button /> component we want to make sure if any class is set when importing this component,
      // that classes are applied the correct place and not on <context-menu-button />
      type: String,
      default: '',
    },
  },
  data() {
    return {
      scrollingDown: false,
      prevScrollPos: 0,
      scrolledToTheTop: true,
      ticking: false,
      scrolledToHeroContentBottom: false,
      scrolledToStickycontent: false,
    };
  },
  computed: {
    isMobileLayout(): boolean {
      return this.$store.getters.layoutSizeWidth === ('mobile' as AppLayoutSizeWidth);
    },
    className(): string {
      return this.class;
    },
    titleComputed(): string | null {
      if (this.title) {
        return this.title;
      }

      const r = this.$route;
      if (r.meta && r.meta.title && r.matched[r.matched.length - 1].meta.title) {
        //fallback to title defined on the route
        return r.meta.title;
      } else if (r.matched.length > 1) {
        // multiple matches, so there might be a parentpage that we can use the title from
        const match = r.matched.filter((x) => x.meta && x.meta.title).slice(-1); // get last match in list
        if (match.length > 0 && match[0].path !== r.path) {
          console.warn(
            '[Hero Title]: title is using a fallback from a parent page. You should probably set a specific title for this page '
          );

          return match[0].meta.title as string;
        }
      }

      console.error('[Hero Title] title is required');
      return null;
    },
  },
  methods: {
    goBack(): void {
      // only go back if we have a page to go back to. Otherwise go to the frontpage
      window.history.length > 1 && window.history.state.back
        ? this.$router.go(-1)
        : this.$router.push({ name: 'Home' });
    },
    handleScroll(prevScrollPos: number): void {
      const header = this.$refs.stickyTop as HTMLElement;
      const headerHeight = header.offsetHeight;

      if (window.scrollY < headerHeight * 2) {
        this.scrolledToTheTop = true;
        this.scrollingDown = false;
      } else {
        this.scrolledToTheTop = false;
        this.scrollingDown = window.scrollY > prevScrollPos;
      }

      const heroContent = this.$refs.heroContent as HTMLElement;
      const stickyTitle = this.$refs.stickyTitle as HTMLElement;
      const stickyTopBackground = this.$refs.stickyTopBackground as HTMLElement;

      // we can use offsetTop instead of getboundclientrect() because we know from the design that this hero will always be rendered at the top of the page
      // how far down the bottom of the heroContent element is from the top of the entire page (not top of viewport)
      const heroContentBottom = heroContent.offsetTop + heroContent.offsetHeight;
      // when window is scrolled all the way to the top, we want heroContent opacity to be 100%.
      // When the bottom of the heroContent is scrolled to the top of the viewport, heroContent opacity should be at 0%.
      // detract the height of the sticky header*1.5, so we reach 100% a little before the heroContent has scrolled entirely out of view, for a better visual effect
      const heroContentBottomOffset = heroContentBottom - headerHeight * 1.5;
      const percentage = window.scrollY / heroContentBottomOffset; // e.g. scrolled 150px and heroContentBottom is 300px from top of page, 150/300 = 0.5 = 50%
      const difference = 1 - percentage;
      const opacity = difference.toString();

      heroContent.style.opacity = opacity;
      // as the heroContent fades out, we want to fade in the title in the stickyTop
      stickyTitle.style.opacity = percentage.toString();
      const stickyTitleTransform = clamp((100 - percentage * 100) / 20, 0, 6);
      stickyTitle.style.transform = `translateY(${stickyTitleTransform}px)`;
      stickyTopBackground.style.opacity = percentage.toString();

      if (this.isMobileLayout) {
        const scale = clamp(difference + percentage / 1.1, 0, 1);
        heroContent.style.transform = `scale(${scale}) translateY(-${(percentage * 100) / 10}px)`;
      } else {
        heroContent.style.transform = ``;
      }

      const heroWrapper = this.$refs.heroWrapper as HTMLElement;
      const heroWrapperBottom = heroWrapper.offsetTop + heroWrapper.offsetHeight;
      // calculate height for when scroll reaches stickyContent, so we can apply styles for when content sticks
      if (this.$refs.stickyContent && window.scrollY >= heroWrapperBottom - headerHeight) {
        this.scrolledToStickycontent = true;
      } else {
        this.scrolledToStickycontent = false;
      }
      // calculate height for when scroll reaches bottom of hero, so we can scroll sticky-top out of view
      if (window.scrollY >= heroWrapperBottom) {
        this.scrolledToHeroContentBottom = true;
      } else {
        this.scrolledToHeroContentBottom = false;
      }
    },
    handleScrollTick(): void {
      // https://developer.mozilla.org/en-US/docs/Web/API/Document/scroll_event
      // https://www.html5rocks.com/en/tutorials/speed/animations/
      if (!this.ticking) {
        requestAnimationFrame(() => {
          this.handleScroll(this.prevScrollPos);
          this.ticking = false;
          this.prevScrollPos = window.scrollY;
        });

        this.ticking = true;
      }
    },
  },
  mounted() {
    // TODO: if there's a page navigation and it has a storedScrollPos, a scroll event will most likely be triggered, potentially breaking this.scrollingDown
    window.addEventListener('scroll', this.handleScrollTick);
  },
  beforeUnmount() {
    window.removeEventListener('scroll', this.handleScrollTick);
  },
});
</script>

<style lang="scss">
// TODO: clean up styles
@use 'sass:math';
@import '@/design/variables/index.scss';
@import '@/design/mixins/index.scss';

$sticky-height: $min-touch-target-size + math.div($default-spacing, 2);

.sticky-top {
  position: sticky;
  top: 0;
  left: 0;
  right: 0;
  @include z-index(nav);
  transition: transform 0.3s;

  &-background {
    background-color: $nav-bg;
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    box-shadow: 0 0px 2px 0 rgba(0, 0, 0, 0.14), 0 0px 1px -2px rgba(0, 0, 0, 0.2),
      0 0px 5px 0 rgba(0, 0, 0, 0.12);
    opacity: 0;
    z-index: -1;
    transition: box-shadow 0.125s;
  }

  &__inner {
    height: $sticky-height;
    display: flex;
    align-items: center;
    justify-content: space-between;

    @include breakpoint($breakpoint-navigation-change) {
      @include makeContainer($container-width);
    }
  }

  .title {
    flex: 1;
    //transition: transform 0.125s ease-out;

    &:first-child {
      @include breakpoint-max($breakpoint-navigation-change) {
        padding-left: $default-spacing * 0.75;
      }
    }
  }

  .sticky-back,
  .hero-action,
  .context-menu-button__btn {
    background-color: transparent;
  }

  @include breakpoint-max($breakpoint-navigation-change) {
    padding-left: math.div($default-spacing, 4);
    padding-right: math.div($default-spacing, 4);

    .sticky-back {
      margin-right: math.div($default-spacing, 4);
    }
    .sticky-actions {
      margin-left: math.div($default-spacing, 4);
    }
  }
}

.sticky-content {
  position: -webkit-sticky;
  position: sticky;
  top: $sticky-height;
  transition: top 0.3s, background-color 0.125s ease-out, box-shadow 0.125s ease-out;
  z-index: 1;
}

.sticky-top.scrolled-top {
  background-color: transparent;
  box-shadow: none;

  @include breakpoint($breakpoint-navigation-change) {
    user-select: none;
    pointer-events: none;
  }

  .title {
    opacity: 0;
  }
}

.hero-content {
  transform-origin: bottom center;
  // this transition is specifically set to none as we update styles based on scroll position every RAF
  transition: none;
}

.scrolled-to-sticky-content {
  + .sticky-content {
    background-color: $nav-bg;
    box-shadow: 0 0px 2px 0 rgba(0, 0, 0, 0.14), 0 0px 1px -2px rgba(0, 0, 0, 0.2),
      0 0px 5px 0 rgba(0, 0, 0, 0.12);
  }

  .sticky-top-background {
    box-shadow: none;
  }
}

.sticky-top {
  &.scrolled-to-hero-content-bottom.scrolling-down {
    transform: translateY(-100%);

    .sticky-top-background {
      box-shadow: none;
    }
  }
}

.scrolled-to-hero-content-bottom.scrolling-down {
  + .sticky-content {
    top: 0;
  }
}

.hero-wrapper {
  .hero {
    &::after {
      content: '';
      position: absolute;
      left: 0;
      right: 0;
      top: 0;
      height: 170px;
      z-index: -1;
      background: linear-gradient(
        to top,
        rgba(0, 0, 0, 0),
        rgba(0, 0, 0, 0.03) 15%,
        rgba(0, 0, 0, 0.125) 30%,
        rgba(0, 0, 0, 0.25) 46%,
        rgba(0, 0, 0, 0.4) 61%,
        rgba(0, 0, 0, 0.553) 75%,
        rgba(0, 0, 0, 0.694) 88%,
        rgba(0, 0, 0, 0.8)
      );
      background: linear-gradient(
        to top,
        rgba(255, 255, 255, 0),
        rgba(255, 255, 255, 0.03) 15%,
        rgba(255, 255, 255, 0.125) 30%,
        rgba(255, 255, 255, 0.25) 46%,
        rgba(255, 255, 255, 0.4) 61%,
        rgba(255, 255, 255, 0.553) 75%,
        rgba(255, 255, 255, 0.694) 88%,
        rgba(255, 255, 255, 0.8)
      );
    }
  }
}

.hero-content-wrapper {
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
}
</style>
