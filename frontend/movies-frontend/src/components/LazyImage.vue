<template>
  <div class="lazy-image" :class="{ 'lazy-image--use-ratio': ratio, loaded: loaded }">
    <div class="lazy-image__bg" aria-hidden="true" v-if="showPlaceholder">
      <svg viewBox="0 0 24 24" v-if="error">
        <path d="M0 0h24v24H0V0z" fill="none" />
        <path
          d="M21 5v6.59l-2.29-2.3c-.39-.39-1.03-.39-1.42 0L14 12.59 10.71 9.3c-.39-.39-1.02-.39-1.41 0L6 12.59 3 9.58V5c0-1.1.9-2 2-2h14c1.1 0 2 .9 2 2zm-3 6.42l3 3.01V19c0 1.1-.9 2-2 2H5c-1.1 0-2-.9-2-2v-6.58l2.29 2.29c.39.39 1.02.39 1.41 0l3.3-3.3 3.29 3.29c.39.39 1.02.39 1.41 0l3.3-3.28z"
        />
      </svg>
      <svg viewBox="0 0 24 24" v-else-if="!loaded" class="lazy-image__graphic-loader">
        <path d="M0 0h24v24H0V0z" fill="none" />
        <path
          d="M13.2 7.07L10.25 11l2.25 3c.33.44.24 1.07-.2 1.4-.44.33-1.07.25-1.4-.2-1.05-1.4-2.31-3.07-3.1-4.14-.4-.53-1.2-.53-1.6 0l-4 5.33c-.49.67-.02 1.61.8 1.61h18c.82 0 1.29-.94.8-1.6l-7-9.33c-.4-.54-1.2-.54-1.6 0z"
        />
      </svg>
    </div>
    <div class="lazy-image__ratio-container" :style="ratioPercentage">
      <div class="lazy-image__ratio-el">
        <picture class="lazy-image__picture" ref="picture">
          <source
            v-for="source in _sources"
            :key="source.media"
            :media="source.media"
            :data-srcset="source.srcset"
          />
          <img
            :data-srcset="_src"
            :alt="alt"
            :title="title || alt"
            loading="lazy"
            @load="loaded = true"
            @error="error = true"
            :class="{ loaded: loaded }"
          />
        </picture>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';
import { breakpoints } from '@/constants/breakpoints';

export default defineComponent({
  name: 'LazyImage',
  props: {
    src: {
      type: String,
    },
    sources: {
      // array of img src urls to be used at each of our css breakpoints. If used, src prop is ignored
      // starting at the lowest breakpoint (0 - 576)
      // if first source is null, there won't be a fallback for the smallest of viewports
      type: Array as PropType<(string | null)[]>,
    },
    alt: {
      type: String,
      default: '',
    },
    title: {
      type: String,
      default: '',
    },
    ratio: {
      // It is strongly recommended to use ratio, to prevent layoutshifts, unless you're styling the rendered image size with css elsewhere
      // Supports formats like 16x9, 16X9, 16/9, 16:9
      // If only one of the ratio values is provided, the unprovided one will fallback to 1. e.g. passing "16" as a prop would result in the ratio 16:1
      type: String,
    },
    showPlaceholder: {
      type: Boolean,
      default: true,
    },
  },
  data() {
    return {
      loaded: false,
      error: false,
      observer: null as null | IntersectionObserver,
    };
  },
  computed: {
    ratioPercentage() {
      if (!this.ratio) {
        return '';
      }

      let [width, height] = this.ratio.split(/x|X|:|\//).map((v) => parseInt(v));
      width = width || 1;
      height = height || 1;

      return `padding-bottom: ${(height / width) * 100}%`;
    },
    _src() {
      if (this.sources) {
        return this.sources[0];
      }

      return this.src;
    },
    _sources() {
      if (this.sources) {
        const sources: { srcset: string; media: string }[] = [];
        const _breakpoints = Object.values(breakpoints);
        // push 0, as the first source is what is shown from 0 to the first min-width breakpoint
        _breakpoints.push(0);

        _breakpoints
          .sort((a, b) => a - b)
          .forEach((breakpoint, i) => {
            const source = (this.sources as [])[i];
            if (source) {
              // map each source to a breakpoint, skipping the ones that doesn't have a breakpoint defined
              sources.push({ srcset: source, media: `(min-width: ${breakpoint}px)` });
            }
          });
        // ignore the first source, as we're using that as the <img> src
        // reverse for our loop in the template to render in the right order
        return sources.slice(1).reverse();
      }

      return [];
    },
  },
  mounted() {
    const switchDataSrcToSrc = () => {
      const sourcesAndImg = (this.$refs.picture as HTMLPictureElement).querySelectorAll<
        HTMLImageElement | HTMLSourceElement
      >('[data-srcset]');
      sourcesAndImg.forEach((el) => {
        el.srcset = el.dataset.srcset as string;
      });
    };

    if ('loading' in HTMLImageElement.prototype) {
      // browser supports native lazyloading so lets use it instead of setting up an intersectionobserver
      switchDataSrcToSrc();
    } else {
      this.observer = new IntersectionObserver(
        ([entry], observer) => {
          if (entry && entry.isIntersecting) {
            switchDataSrcToSrc();
            observer.unobserve(entry.target);
            observer.disconnect();
          }
        },
        {
          // start loading 200px before picture enters viewport
          rootMargin: '200px',
        }
      );

      this.observer.observe(this.$refs.picture as HTMLPictureElement);
    }
  },
  beforeUnmount() {
    if (this.observer) {
      this.observer.disconnect();
    }
  },
});
</script>

<style lang="scss" scoped>
@use 'sass:math';
@import '@/design/variables/index.scss';
@import '@/design/mixins/index.scss';

.lazy-image {
  position: relative;
  overflow: hidden;

  &__bg {
    background-color: $gray-400;
    color: $brand-primary-dark;
    position: absolute;
    left: 0;
    top: 0;
    height: 100%;
    // prevent bg from sometimes showing up when browsers try to render images that are not pixel perfect. e.g. 15.7px instead of 15px
    width: calc(100% - 1px);
    overflow: hidden;
    display: flex;
    align-items: center;
    justify-content: center;

    svg {
      opacity: 0.2;
      fill: currentColor;
      max-width: 80%;
      max-height: 80%;
      width: 180px;
      padding: $default-spacing;
    }
  }

  @keyframes lazy-image-loader {
    80% {
      opacity: 0.5;
    }
    100% {
      opacity: 0.5;
    }
  }

  &__graphic-loader {
    animation: lazy-image-loader 0.75s ease-in-out infinite alternate;
  }

  &__picture {
    display: block;
    width: 100%;
    height: 100%;
    line-height: 0;

    img {
      display: inline-block;
      height: 100%;
      width: 100%;
      max-height: 100%;
      max-width: 100%;
      object-fit: cover;
      opacity: 0;
      filter: blur(5px);
      transition: opacity 0.2s ease-out, filter 0.2s ease-out;

      &.loaded {
        filter: blur(0);
        opacity: 1;
      }
    }
  }
  &.loaded {
    .lazy-image__graphic-loader {
      animation: none;
    }
  }

  &:not(.lazy-image--use-ratio) {
    .lazy-image__ratio-container {
      height: auto;
      position: static;
    }
    .lazy-image__ratio-el {
      position: static;
    }
  }

  &__ratio-container {
    position: relative;
    width: 100%;
    height: 0;
  }
  &__ratio-el {
    position: absolute;
    inset: 0px;
  }
}
</style>
