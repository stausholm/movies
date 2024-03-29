<template>
  <div class="hero" :class="{ 'hero--slim': slim, 'hero--tall': tall }">
    <div class="hero__backgrounds" v-if="backgrounds.length > 0">
      <div class="hero__bg" v-for="bg in backgrounds" :key="bg" :class="'hero__bg--' + bg">
        <lazy-image
          v-if="bg === 'image'"
          :src="bgImage"
          :sources="bgImageSources"
          :showPlaceholder="false"
          class="hero__bg-image"
        />
      </div>
    </div>
    <div class="hero__content container">
      <slot />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';
import LazyImage from '@/components/LazyImage.vue';

type background = '' | 'image' | 'gray' | 'primary' | 'gradient' | 'fade';

export default defineComponent({
  name: 'Hero',
  components: {
    LazyImage,
  },
  props: {
    bgImage: {
      type: String,
    },
    bgImageSources: {
      type: Array as PropType<(string | null)[]>,
    },
    background: {
      type: [String, Array] as PropType<background | background[]>,
      default: '',
    },
    slim: {
      // if true, there's a smaller min-height on .hero
      type: Boolean,
      default: false,
    },
    tall: {
      // if true, there's a bigger min-height on .hero. Does not work with slim prop
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      backgrounds: [] as string[],
    };
  },
  computed: {},
  methods: {},
  created() {
    if (Array.isArray(this.background)) {
      this.backgrounds = this.background;
    } else if (this.background !== '') {
      this.backgrounds.push(this.background);
    }
  },
});
</script>

<style lang="scss">
@import '@/design/variables/index.scss';
@import '@/design/mixins/index.scss';

.hero {
  position: relative;
  min-height: 400px;
  display: flex;
  flex-direction: column;

  @include breakpoint-max($breakpoint-navigation-change) {
    min-height: 150px;
  }

  &--slim {
    min-height: 200px;

    @include breakpoint-max($breakpoint-navigation-change) {
      min-height: 0;
    }
  }
  &--tall {
    min-height: 600px;

    @include breakpoint-max($breakpoint-navigation-change) {
      min-height: 400px;
    }
  }

  &__bg {
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    z-index: -1;

    &--image {
      // TODO: calculate optimal overlay color for WCAG contrast https://codepen.io/yaphi1/pen/oNbEqGV?editors=1010
      // &::after {
      //   content: '';
      //   position: absolute;
      //   width: 100%;
      //   height: 100%;
      //   top: 0;
      //   left: 0;
      //   background-color: rgba(0, 0, 0, 0.3);
      // }

      .hero__bg-image {
        position: absolute;
        inset: 0;
        display: flex;
        align-items: center;
        justify-content: center;

        &.loaded {
          animation: zoom-image 0.4s ease;
        }
      }
    }

    &--gray {
      background-color: $gray-500;
    }
    &--primary {
      background-color: $brand-primary;
    }

    &--gradient {
      // https://www.joshwcomeau.com/gradient-generator/
      background-image: linear-gradient(
        45deg,
        hsl(240deg 100% 20%) 0%,
        hsl(289deg 100% 21%) 11%,
        hsl(315deg 100% 27%) 22%,
        hsl(329deg 100% 36%) 33%,
        hsl(337deg 100% 43%) 44%,
        hsl(357deg 91% 59%) 56%,
        hsl(17deg 100% 59%) 67%,
        hsl(34deg 100% 53%) 78%,
        hsl(45deg 100% 50%) 89%,
        hsl(55deg 100% 50%) 100%
      );
    }

    &--fade {
      background-image: linear-gradient(to bottom, rgba($__body-bg, 0) 0%, rgba($__body-bg, 1) 95%);
      // https://www.joshwcomeau.com/gradient-generator/?angle=0&easingCurve=0.25%7C0.75%7C0.75%7C0.25&precision=8&colorMode=hsl&colors=000000%7Cffffff
      // $mask-gradient: linear-gradient(
      //   0deg,
      //   hsl(0deg 0% 0%) 0%,
      //   hsl(0deg 0% 11%) 11%,
      //   hsl(0deg 0% 22%) 22%,
      //   hsl(0deg 0% 33%) 33%,
      //   hsl(0deg 0% 44%) 44%,
      //   hsl(0deg 0% 56%) 56%,
      //   hsl(0deg 0% 67%) 67%,
      //   hsl(0deg 0% 78%) 78%,
      //   hsl(0deg 0% 89%) 89%,
      //   hsl(0deg 0% 100%) 100%
      // );
      // background-image: $mask-gradient;
      // mix-blend-mode: multiply;
      // opacity: 0.8;
    }
  }

  &__backgrounds {
    overflow: hidden;
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    z-index: -1;
  }
  &__content {
    padding-top: $default-spacing * 4;
    padding-bottom: $default-spacing * 2;
    margin-top: auto;
    width: 100%;
  }
}
@keyframes zoom-image {
  0% {
    transform: scale(1.1) translateZ(0);
  }
  100% {
    transform: scale(1) translateZ(0);
  }
}
</style>
