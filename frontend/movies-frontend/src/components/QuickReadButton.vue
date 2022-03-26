<template>
  <div class="quick-read-button">
    <div class="quick-read-button__text mb-1" v-if="includeText">
      <slot>
        <div class="quick-read-button__scroll-text">
          <slot name="scroll-text">
            <p class="h3 text-center mb-0">Continue scrolling to keep reading</p>
          </slot>
        </div>
        <div class="quick-read-button__desc">
          <slot name="desc">
            <p class="text-big text-center mb-0">
              Click the button below to start this article in quick view.
            </p>
          </slot>
        </div>
      </slot>
    </div>
    <div class="quick-read-button__btn-wrapper">
      <div class="quick-read-button__logo">
        <svg
          id="Layer_1"
          data-name="Layer 1"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 80.97 12.33"
        >
          <path
            d="M961.6,535.9v5a.57.57,0,0,0,.56.56h1.12v4a.28.28,0,0,0,.52.14l2.9-5a.55.55,0,0,0-.48-.83H965l1.39-3.72a.56.56,0,0,0-.52-.76h-3.67A.57.57,0,0,0,961.6,535.9Z"
            transform="translate(-919.89 -534.19)"
          />
          <path
            d="M927.58,543.78l1.84,2.22h-2.48l-1.08-1.45a4.73,4.73,0,0,1-.93.09,4.2,4.2,0,1,1,2.65-.86Zm-2.65-1a2.46,2.46,0,1,0-2.23-2.44A2.2,2.2,0,0,0,924.93,542.77Z"
            transform="translate(-919.89 -534.19)"
          />
          <path
            d="M930.37,536.14h2v5c0,1,.49,1.57,1.46,1.57a1.39,1.39,0,0,0,1.49-1.57v-5h2v5a3.31,3.31,0,0,1-3.58,3.47,3.22,3.22,0,0,1-3.47-3.47Z"
            transform="translate(-919.89 -534.19)"
          />
          <path d="M938.86,536.14h2v8.42h-2Z" transform="translate(-919.89 -534.19)" />
          <path
            d="M946.29,536.05a3.9,3.9,0,0,1,4,3H948a1.84,1.84,0,0,0-1.76-1.08,2.44,2.44,0,0,0,0,4.84,1.84,1.84,0,0,0,1.76-1.08h2.26a3.89,3.89,0,0,1-4,2.94,4.29,4.29,0,0,1,0-8.57Z"
            transform="translate(-919.89 -534.19)"
          />
          <path
            d="M953.6,540.84v3.72h-2.06v-8.42h2.06v3.69l2.8-3.69h2.41l-3.26,4.13,3.38,4.29h-2.5Z"
            transform="translate(-919.89 -534.19)"
          />
          <path
            d="M972.89,536.14c2.07,0,3.1,1.19,3.1,2.65a2.46,2.46,0,0,1-1.87,2.44l1.94,3.33h-2.31L972,541.38h-.49v3.18h-2v-8.42Zm-.12,1.7H971.5v2.09h1.27c.77,0,1.13-.39,1.13-1S973.54,537.84,972.77,537.84Z"
            transform="translate(-919.89 -534.19)"
          />
          <path
            d="M982.43,537.78h-3.1v1.71h2.74v1.58h-2.74v1.85h3.1v1.64h-5.15v-8.42h5.15Z"
            transform="translate(-919.89 -534.19)"
          />
          <path
            d="M989,543.07h-3.14l-.51,1.49h-2.14l3-8.42h2.38l3,8.42h-2.17Zm-1.57-4.66-1,3.08h2.07Z"
            transform="translate(-919.89 -534.19)"
          />
          <path
            d="M1000.18,540.35a4.07,4.07,0,0,1-4.41,4.21h-3.16v-8.42h3.16A4.07,4.07,0,0,1,1000.18,540.35Zm-4.55,2.44a2.45,2.45,0,1,0,0-4.9h-1v4.9Z"
            transform="translate(-919.89 -534.19)"
          />
          <rect fill="none" width="80.97" height="12.33" />
        </svg>
      </div>
      <button
        class="quick-read-button__btn text-big text-uppercase fw-bold"
        @click="$emit('click', $event)"
      >
        <div class="quick-read-button__btn-img" v-if="imageSrc">
          <img :src="imageSrc" alt="" loading="lazy" />
        </div>
        <div class="quick-read-button__btn-text">
          <span>Start now</span>
          <div class="quick-read-button__btn-arrow d-flex">
            <base-icon>
              <icon-arrow-right />
            </base-icon>
          </div>
        </div>
      </button>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import BaseIcon from '@/components/base/BaseIcon.vue';
import IconArrowRight from '@/components/icons/IconArrowRight.vue';

export default defineComponent({
  name: 'QuickReadButton',
  emits: ['click'],
  components: {
    BaseIcon,
    IconArrowRight,
  },
  props: {
    includeText: {
      type: Boolean,
      default: true,
    },
    imageSrc: {
      type: String,
      required: false,
    },
  },
});
</script>

<style lang="scss" scoped>
@use 'sass:math';
@import '@/design/variables/index.scss';
@import '@/design/mixins/index.scss';

.quick-read-button {
  position: relative;

  &__text {
    // make the max linelength around 60 characters for better readability
    max-width: 60ch;
    margin-left: auto;
    margin-right: auto;
  }

  &__scroll-text + .quick-read-button__desc {
    &::before {
      content: '';
      display: block;
      width: 50px;
      height: 1px;
      margin: $default-spacing auto;
      background: $gray-400;
    }
  }

  &__btn-wrapper {
    position: relative;
    border: 1px solid $gray-300;
    padding: $default-spacing * 0.75;
    border-radius: $border-radius-base;
    text-decoration: none;

    @include breakpoint($breakpoint-font-size-change) {
      padding: $default-spacing;
    }
  }
  &__logo {
    position: absolute;
    top: -8px;
    left: $default-spacing * 0.5;
    padding: 0 $default-spacing * 0.5;
    background: $body-bg;
    display: flex;

    @include breakpoint($breakpoint-font-size-change) {
      left: $default-spacing;
    }

    svg {
      width: auto;
      height: 14px;

      path {
        fill: $gray-400;
      }
    }
  }

  &__btn {
    display: flex;
    align-items: center;
    position: relative;
    height: $min-touch-target-size + $default-spacing * 0.5;
    width: 100%;
    border-radius: $border-radius-small;
    background: $brand-tertiary;
    color: $brand-tertiary-bg__text-color;
    box-shadow: $box-shadow;
    overflow: hidden;
    transition: opacity 0.2s ease-out;
    flex: 1;
    text-decoration: none;
    border: 0;
    user-select: none;
    padding: 0;

    @include breakpoint(xs) {
      height: $min-touch-target-size + $default-spacing;
    }

    @include hover() {
      opacity: 0.85;

      .quick-read-button__btn-img {
        img {
          transform: scale(1.05);
        }
      }
    }
    &:active {
      opacity: 0.85;

      .quick-read-button__btn-img {
        img {
          transform: scale(1.05);
        }
      }
    }

    &-img {
      display: block;
      height: 100%;
      width: 64px;
      background-color: rgba($black, 0.15);
      overflow: hidden;

      img {
        object-fit: cover;
        width: 100%;
        height: 100%;
        transition: transform 0.8s cubic-bezier(0.35, 0, 0, 1) 0s;
      }

      @include breakpoint(xs) {
        width: 120px;
      }
    }

    &-text {
      display: flex;
      align-items: center;
      justify-content: space-between;
      flex: 1;
      padding: $default-spacing * 0.5 $default-spacing * 0.75;
      padding-left: $default-spacing;

      @include breakpoint($breakpoint-font-size-change) {
        padding-left: $default-spacing * 1.5;
      }
    }

    &-arrow {
      margin-left: $default-spacing * 0.75;
    }
  }
}
</style>
