<template>
  <div class="sparkle-wrapper" :class="{ 'disable-animate': animate === false }">
    <transition-group name="fade">
      <span
        aria-hidden="true"
        class="sparkle"
        v-for="sparkle in sparkles"
        :key="sparkle.id"
        :style="sparkle.style"
      >
        <svg :width="sparkle.size" :height="sparkle.size" :viewBox="sparkle.viewBox" fill="none">
          <path :d="sparkle.path" :fill="sparkle.color" />
        </svg>
      </span>
    </transition-group>
    <div class="sparkle-content">
      <slot />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';
import { random, sample } from '@/utils/generic';

interface Sparkle {
  id: number;
  createdAt: number;
  size: number;
  style: Record<string, unknown>;
  color: string;
  path: string;
  viewBox: string;
}
/**
 * Sources:
 * https://joshwcomeau.com/react/animated-sparkles-in-react/#generation-and-cleanup
 */

// A wrapper component that adds sparkles on top of everything inside it. Sparkles are only rendered when visible on screen. This should probably be a directive instead
export default defineComponent({
  name: 'Sparkles',
  data() {
    return {
      isOnScreen: true, // intersection observer updates this
      observer: null as null | IntersectionObserver,
      sparkles: [] as Sparkle[],
      mediaQueryList: window.matchMedia('(prefers-reduced-motion: no-preference)'),
      prefersReducedMotion: false,
      randomIntervalFunc: null as null | number,
    };
  },
  props: {
    minSize: {
      // minimum size for the sparkle
      type: Number,
      default: 10,
    },
    maxSize: {
      // mazimum size for the sparkle
      type: Number,
      default: 20,
    },
    rate: {
      // the rate at which new sparkles can be generated. Number is in milliseconds
      type: Number,
      default: 250,
    },
    variance: {
      // a variance indicator for how manu ms the sparkle generation rate is allowed to vary between each generation. Default settings mean that delay between each sparkle can be anywhere from 50ms (250-200) to 450ms (250+200)
      type: Number,
      default: 200,
    },
    sparkleType: {
      // how many points each sparkle should have. if an array, choose randomly between them
      type: String,
      default: 'default', // default, alt, random
    },
    colors: {
      // a list of whitelisted colors that each new sparkle will randomly pick from
      type: Array as PropType<string[]>,
      default: () => ['#FFC700', 'hsl(50deg, 100%, 50%)'],
    },
    constrainToEdges: {
      // if this is set, the sparkles will only appear randomly along the top and bottom of the element
      type: Boolean,
      default: false,
    },
    animate: {
      // override the automatic check for "prefers-reduced-motion: no-preference", and lets you handle it yourself
      type: Boolean,
      default: null,
    },
  },
  methods: {
    generateSparkle(): Sparkle {
      const settings = {
        minSize: this.minSize,
        maxSize: this.maxSize,
        colors: this.colors,
      };

      const size = random(settings.minSize, settings.maxSize);
      const style = this.generatePosition(size);
      const color = sample(settings.colors)[0] as string;

      // generate the svg path
      const sparkleType = this.sparkleType;
      let numOfPoints = 4; // default
      if (sparkleType === 'random') {
        numOfPoints = random(4, 6);
      } else if (sparkleType === 'alt') {
        numOfPoints = 5;
      }

      const path =
        numOfPoints === 4
          ? 'M92 0C92 0 96 63.4731 108.263 75.7365C120.527 88 184 92 184 92C184 92 118.527 98 108.263 108.263C98 118.527 92 184 92 184C92 184 86.4731 119 75.7365 108.263C65 97.5269 0 92 0 92C0 92 63.9731 87.5 75.7365 75.7365C87.5 63.9731 92 0 92 0Z'
          : 'M34 0C34 0 33.4886 20.0074 41.7749 26.3376C50.0612 32.6678 68 25.9737 68 25.9737C68 25.9737 49.7451 31.6449 46.58 41.8873C43.4149 52.1298 55.0132 68 55.0132 68C55.0132 68 44.2424 51.4976 34 51.4976C23.7576 51.4976 12.9868 68 12.9868 68C12.9868 68 24.5851 52.1298 21.42 41.8873C18.2549 31.6449 0 25.9737 0 25.9737C0 25.9737 17.9388 32.6678 26.2251 26.3376C34.5114 20.0074 34 0 34 0Z';

      const sparkle: Sparkle = {
        id: random(1, 999999),
        createdAt: Date.now(),
        size,
        style,
        color,
        path,
        viewBox: numOfPoints === 4 ? '0 0 184 184' : '0 0 84 84',
      };

      return sparkle;
    },
    generatePosition(size: number) {
      let style = {} as { left: string; zIndex: number; top?: string; bottom?: string };
      style.left = random(0, 100) + '%';
      style.zIndex = sample([3, 5])[0] as number; // always appear on top of the wrapped content, but randomize the z-index relative to all other sparkles

      if (this.constrainToEdges) {
        // only align the sparkles to the edges of the element
        if (Math.random() > 0.5) {
          style.top = size * 0.5 + '%';
        } else {
          style.bottom = -size * 0.5 + '%';
        }
      } else {
        style.top = random(5, 95) + '%';
      }

      return style;
    },
    updateSparkles() {
      const sparkle = this.generateSparkle();
      const now = Date.now();

      this.sparkles = this.sparkles.filter((sp) => {
        const delta = now - sp.createdAt;
        return delta < 1000; // css animation is 1000ms long
      });

      this.sparkles.push(sparkle);
    },
    useRandomInterval(cb: () => void) {
      if (!this.isOnScreen) {
        return;
      }

      const minDelay = this.rate - this.variance;
      const maxDelay = this.rate + this.variance;

      const nextTickAt = random(minDelay, maxDelay);
      this.randomIntervalFunc = setTimeout(() => {
        cb();
        this.useRandomInterval(cb);
      }, nextTickAt);
    },
    usePrefersReducedMotion() {
      return (this.prefersReducedMotion = !this.mediaQueryList.matches);
    },
    useIsOnScreen() {
      this.observer = new IntersectionObserver(([entry]) => {
        if (entry) {
          this.isOnScreen = entry.isIntersecting;
        }
      }, {});

      this.observer.observe(this.$el);
    },
    toggleAnimations(disableAnimations: boolean) {
      // disable animation if prefers reduced motion
      if (disableAnimations) {
        clearTimeout(this.randomIntervalFunc as number);
        this.randomIntervalFunc = null;
      } else if (this.randomIntervalFunc === null) {
        this.useRandomInterval(this.updateSparkles);
      }
    },
  },
  watch: {
    prefersReducedMotion(prefers) {
      this.toggleAnimations(prefers);
    },
    animate() {
      this.prefersReducedMotion = !this.animate;
    },
    isOnScreen(isOnScreen) {
      if (this.prefersReducedMotion) {
        this.toggleAnimations(true);
      } else {
        this.toggleAnimations(!isOnScreen);
      }
    },
  },
  created() {
    if (this.animate !== null) {
      this.prefersReducedMotion = !this.animate;
    } else {
      this.mediaQueryList.addListener(this.usePrefersReducedMotion);
      this.usePrefersReducedMotion();
    }

    this.sparkles = [
      // init with 4
      this.generateSparkle(),
      this.generateSparkle(),
      this.generateSparkle(),
      this.generateSparkle(),
    ];

    if (!this.prefersReducedMotion) {
      this.useRandomInterval(this.updateSparkles);
    }
  },
  mounted() {
    this.useIsOnScreen();
  },
  beforeUnmount() {
    if (this.animate === null) {
      this.mediaQueryList.removeListener(this.usePrefersReducedMotion);
    }

    window.clearTimeout(this.randomIntervalFunc as number);
    if (this.observer) {
      this.observer.disconnect();
    }
  },
});
</script>

<style lang="scss">
.sparkle-wrapper {
  position: relative;
  color: inherit;
  //display: inline-block;
  //text-shadow: 0px 0px 3px hsl(0deg, 0%, 100%),1px 1px 1px hsl(0deg, 0%, 100%);

  .sparkle-content {
    position: relative;
    z-index: 2;
  }

  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(100deg);
    }
  }
  @keyframes comeInOut {
    0% {
      transform: translate3d(-50%, -50%, 0) scale(0);
    }
    50% {
      transform: translate3d(-50%, -50%, 0) scale(1);
    }
    100% {
      transform: translate3d(-50%, -50%, 0) scale(0);
    }
  }

  .sparkle {
    position: absolute;
    display: block;
    pointer-events: none;

    @media (prefers-reduced-motion: no-preference) {
      animation: comeInOut 900ms forwards;
    }

    svg {
      display: block;
      pointer-events: none;

      @media (prefers-reduced-motion: no-preference) {
        animation: spin 1000ms linear;
      }
    }
  }

  &.disable-animate {
    .sparkle {
      transition: none;
      animation: none;

      svg {
        animation: none;
      }
    }
  }
}
</style>
