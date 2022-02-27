<template>
  <transition name="fade">
    <div class="global-loader" v-if="loading" aria-hidden="true">
      <div class="global-loader__bar" v-if="bar" :class="{ loaded: !loading }">
        <div class="peg"></div>
      </div>
      <div class="global-loader__spinner" v-if="spinner">
        <div class="spinner-icon"></div>
      </div>
    </div>
  </transition>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'LoaderGlobal',
  props: {
    bar: {
      type: Boolean,
      default: true,
    },
    spinner: {
      type: Boolean,
      default: true,
    },
  },
  data() {
    return {
      loading: false,
    };
  },
  computed: {
    routeLoading(): boolean {
      return this.$store.state.app.routeLoading;
    },
  },
  watch: {
    routeLoading(isLoading: boolean) {
      if (isLoading) {
        this.loading = true;
      } else {
        this.loading = false;
      }
    },
  },
});
</script>

<style lang="scss" scoped>
@import '@/design/variables/index.scss';
@import '@/design/mixins/index.scss';

// https://ricostacruz.com/nprogress/ styles inspired from

.global-loader {
  pointer-events: none;
  $loader-color: $brand-primary-light;

  &__bar {
    background-color: $loader-color;
    position: fixed;
    @include z-index(globalloader);
    top: 0;
    left: 0;
    width: 100%;
    height: 2px;
    transition: transform 200ms ease 0s;
    transform: translateX(-101%); // 101% to avoid showing boxshadow from .peg
    animation: loader-bar-fill 4s $ease-in-out-cubic forwards;

    @keyframes loader-bar-fill {
      0%,
      10% {
        transform: translateX(-101%);
      }
      19%,
      25% {
        transform: translateX(-90%);
      }
      33% {
        transform: translateX(-83%);
      }
      41%,
      66% {
        transform: translateX(-33%);
      }
      87% {
        transform: translateX(-17%);
      }
      100% {
        transform: translateX(-10%);
      }
    }

    &.loaded {
      transform: translateX(0);
    }

    .peg {
      display: block;
      position: absolute;
      right: 0px;
      width: 100px;
      height: 100%;
      box-shadow: 0 0 10px $loader-color, 0 0 5px $loader-color;
      opacity: 1;
      transform: rotate(3deg) translate(0px, -4px);
    }
  }

  &__spinner {
    display: block;
    position: fixed;
    @include z-index(globalloader);
    top: $default-spacing;
    right: $default-spacing;

    .spinner-icon {
      width: $icon-size-small;
      height: $icon-size-small;
      border: solid 2px transparent;
      border-top-color: $loader-color;
      border-left-color: $loader-color;
      border-radius: 50%;

      animation: loader-spinner-rotate 400ms linear infinite;
    }
    @keyframes loader-spinner-rotate {
      0% {
        transform: rotate(0deg);
      }
      100% {
        transform: rotate(360deg);
      }
    }
  }
}
</style>
