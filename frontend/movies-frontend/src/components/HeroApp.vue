<template>
  <div
    class="hero-wrapper"
    :class="[className, { 'scrolled-top': scrolledToTheTop, 'scrolling-down': scrollingDown }]"
  >
    <div class="sticky-top" ref="stickyTop">
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

        <span class="fw-bold title text-truncate" aria-hidden="true">{{ titleComputed }}</span>

        <div class="sticky-actions">
          <base-button
            v-if="actions && actions.length === 1 && actions[0].icon"
            class="btn--rounded hero-action"
            :data-pushtip="actions[0].label"
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
      </div>
    </div>
    <hero :background="['primary', 'fade']">
      <slot>
        <span class="text-pre-head">lorem ipsum</span>
        <h1 class="mb-0" ref="title">{{ titleComputed }}</h1>
      </slot>
    </hero>
  </div>
  <div class="sticky-content" v-if="$slots.stickyContent">
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
      if (r.meta && r.meta.title) {
        //fallback to title defined on the route
        return r.meta.title;
      } else if (r.matched && r.matched.length > 1) {
        // multiple matches, so there might be a parentpage that we can use the title from
        const match = r.matched.filter((x) => x.meta && x.meta.title).slice(-1); // get last match in list
        if (match.length > 0) {
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
      const headerHeight = (this.$refs.stickyTop as HTMLElement).offsetHeight;

      if (window.scrollY < headerHeight * 2) {
        this.scrolledToTheTop = true;
        this.scrollingDown = false;
        return;
      }

      this.scrolledToTheTop = false;
      this.scrollingDown = window.scrollY > prevScrollPos;
    },
    handleScrollTick(): void {
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
@use 'sass:math';
@import '@/design/variables/index.scss';
@import '@/design/mixins/index.scss';

$sticky-height: $min-touch-target-size + math.div($default-spacing, 2);

.sticky-top {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  // height: $nav-height;
  background-color: $nav-bg;
  @include z-index(nav);
  box-shadow: 0 0px 2px 0 rgba(0, 0, 0, 0.14), 0 0px 1px -2px rgba(0, 0, 0, 0.2),
    0 0px 5px 0 rgba(0, 0, 0, 0.12);
  transition: transform 0.3s, background-color 0.3s;

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
  transition: top 0.3s;
  z-index: 1;
}

.scrolled-top {
  .sticky-top {
    background-color: transparent;
    box-shadow: none;
  }
}

// TODO: should this be a prop?
// .scrolling-down {
//   .sticky-top {
//     transform: translateY(-100%);
//   }
//   + .sticky-content {
//     top: 0;
//   }
// }
</style>
