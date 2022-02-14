<template>
  <header class="section-header">
    <component :is="headingLevel" class="h3 mb-0">
      <component
        :is="to ? 'router-link' : 'span'"
        :to="to"
        class="d-flex justify-between align-center"
      >
        <span class="d-flex align-center">
          <base-icon-async :name="icon" v-if="icon" class="mr" />
          <span class="d-flex flex-column">
            <span class="d-block section-header__title">{{ title }}</span>
            <span class="text-small fw-normal" v-if="subtitle">{{ subtitle }}</span>
          </span>
        </span>

        <span v-if="to" class="ml-1 d-flex align-center section-header__cta">
          <span v-if="ctaLabel" class="text-normal mb-0 fw-bold mr">{{ ctaLabel }}</span>
          <base-icon-async name="ArrowRight" />
        </span>
      </component>
    </component>
  </header>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import BaseIconAsync from '@/components/base/BaseIconAsync.vue';

export default defineComponent({
  name: 'SectionHeader',
  components: {
    BaseIconAsync,
  },
  props: {
    headingLevel: {
      type: String,
      default: 'h2',
    },
    title: {
      type: String,
      required: true,
    },
    subtitle: {
      type: String,
    },
    to: {
      // routerlink :to
      type: [String, Object],
    },
    ctaLabel: {
      type: String,
    },
    icon: {
      type: String,
    },
  },
});
</script>

<style lang="scss" scoped>
@use 'sass:math';
@import '@/design/variables/index.scss';
@import '@/design/mixins/index.scss';

.section-header {
  a {
    text-decoration: none;
    outline-offset: 4px;
    position: relative;
    color: inherit;

    &::before {
      content: '';
      position: absolute;
      width: 100%;
      height: 2px;
      background: currentColor;
      bottom: 0;
      left: 0;
      pointer-events: none;
      transform-origin: 100% 50%;
      transform: scale3d(0, 1, 1);
      transition: transform 0.3s;
      opacity: 0.4;
    }

    @include hover() {
      &::before {
        transform-origin: 0% 50%;
        transform: scale3d(1, 1, 1);
      }

      .section-header__cta .icon {
        animation: animateRight 0.5s ease-in-out;
      }
    }
  }

  .icon {
    min-width: $icon-size-default;
  }
  &__cta {
    white-space: nowrap;

    .icon {
      @include breakpoint-max($breakpoint-font-size-change) {
        min-width: $icon-size-small;
        width: $icon-size-small;
        height: $icon-size-small;
      }
    }
  }
  &__title {
    line-height: 1.15;
  }

  @keyframes animateRight {
    0% {
      opacity: 1;
      transform: translateZ(0);
    }
    39% {
      opacity: 0.2;
      transform: translate3d(50%, 0, 0);
    }
    40% {
      opacity: 0;
      transform: translate3d(-30%, 0, 0);
    }
    100% {
      opacity: 1;
      transform: translateZ(0);
    }
  }
}
</style>
