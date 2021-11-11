<template>
  <button class="red-button">
    <span class="red-button__shadow"></span>
    <span class="red-button__contact">
      <span class="red-button__bottom"></span>
      <span class="red-button__edge"></span>
      <span class="red-button__top"></span>
    </span>
  </button>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'RedButton',
  data() {
    return {};
  },
});
</script>

<style lang="scss" scoped>
@import '@/design/variables/_colors.scss';
@import '@/design/mixins/_breakpoints.scss';

.red-button {
  margin-top: 30px; // account for the extra 30px that the button sticks up
  transform: translate3d(0, 0, 0);
  touch-action: manipulation;
  -webkit-tap-highlight-color: transparent;
  user-select: none;
  outline-offset: 4px;
  cursor: pointer;
  display: inline-block;
  padding: 0;
  position: relative;
  min-width: 126px;
  min-height: 90px;
  border-radius: 100%;
  background: hsl(240deg 19% 95%);
  box-shadow: -6px -20px 35px #ffffff, -6px -10px 15px #ffffff, -20px 0px 30px #ffffff,
    6px 20px 25px rgb(0 0 0 / 20%);
  border: 2px solid #b1b2b5;

  &__shadow {
    position: absolute;
    bottom: calc(50% - 45px);
    display: block;
    left: 0;
    right: 0;
    height: 90px;
    border-radius: 100%;
    box-shadow: 3px 5px 20px 3px rgb(0 0 0 / 20%);
  }

  &__edge {
    height: 90px;
    width: 100%;
    background: linear-gradient(
      to left,
      hsl(340deg 100% 16%) 0%,
      hsl(340deg 100% 32%) 30%,
      hsl(340deg 100% 32%) 70%,
      hsl(340deg 100% 50%) 100%
    );
    display: block;
    position: absolute;
    bottom: calc(50% - 105px);
    left: 0;
    right: 0;
  }

  &__bottom {
    position: absolute;
    left: 0;
    right: 0;
    bottom: 0;
    width: 100%;
    height: 90px;
    display: block;
    border-radius: 100%;
    background: linear-gradient(
      to left,
      hsl(0deg 0% 80%) 0%,
      hsl(0deg 0% 80%) 30%,
      hsl(0deg 0% 44%) 70%,
      hsl(0deg 0% 18%) 100%
    );
  }

  &__top {
    width: 100%;
    height: 90px;
    background: hsl(345deg 100% 47%);
    display: block;
    border-radius: 100%;
    transform: translateY(60px);
    background: linear-gradient(to bottom, #f0003c, hsl(345deg 100% 65%));
    box-shadow: inset 4px 0px 2px -3px rgb(255 255 255 / 65%),
      inset 32px 0px 29px -30px rgb(255 255 255 / 40%);
    pointer-events: all;
  }

  &__contact {
    position: relative;
    display: block;
    overflow: hidden;
    border-radius: 50% 50% 50% 50% / 25% 25% 25% 25%;
    height: calc(90px * 2);
    position: absolute;
    pointer-events: none;
    bottom: -2px;
    left: -2px;
    right: -2px;
    border: 2px solid transparent;
  }

  &:focus:not(:focus-visible) {
    outline: none;
  }

  // transitions
  transition: border-color 60ms 40ms;

  &__contact {
    transition: filter 250ms;
  }
  &__top,
  &__edge {
    will-change: transform, box-shadow;
    transition: transform 600ms cubic-bezier(0.3, 0.7, 0.4, 1);
  }
  &__shadow {
    will-change: box-shadow;
    transition: box-shadow 600ms cubic-bezier(0.3, 0.7, 0.4, 1);
  }
  &:hover {
    .red-button__contact {
      filter: brightness(110%);
    }
    .red-button__shadow {
      box-shadow: 9px 4px 23px 6px rgb(0 0 0 / 22%);
      transition: box-shadow 250ms cubic-bezier(0.3, 0.7, 0.4, 1.5);
    }
    .red-button__top {
      transform: translateY(56px);
      transition: transform 250ms cubic-bezier(0.3, 0.7, 0.4, 1.5);
    }
    .red-button__edge {
      transform: translateY(-4px);
      transition: transform 250ms cubic-bezier(0.3, 0.7, 0.4, 1.5);
    }
  }
  &:active {
    border: 2px solid $body-bg;

    .red-button__top {
      transform: translateY(94px);
      transition: transform 100ms, box-shadow 60ms 40ms;
      // box-shadow: inset 6px 20px 35px rgb(0 0 0 / 20%),
      //   inset 6px 10px 15px rgb(0 0 0 / 20%),
      //   inset 20px 0px 30px rgb(0 0 0 / 20%),
      //   inset 0 -9px 23px -5px rgb(0 0 0 / 20%),
      //   inset 4px 3px 7px -4px rgb(0 0 0 / 20%);
      box-shadow: inset 6px 20px 35px rgb(0 0 0 / 0%), inset 7px 3px 15px rgb(0 0 0 / 20%),
        inset 20px 0px 30px rgb(0 0 0 / 20%), inset 0 -9px 23px -5px rgb(0 0 0 / 20%),
        inset 4px 3px 7px -4px rgb(0 0 0 / 26%), inset -20px -20px 20px 10px rgb(255 255 255 / 18%);
    }
    .red-button__edge {
      transform: translateY(34px);
      transition: transform 100ms;
    }
    .red-button__shadow {
      box-shadow: 0px 0px 0px 0px rgb(0 0 0 / 0%);
      transition: box-shadow 60ms 40ms;
    }
  }

  @include breakpoint-max(xs) {
    &:active {
      .red-button__top {
        transition: transform 34ms, box-shadow 34ms;
      }
      .red-button__edge {
        transition: transform 34ms;
      }
      .red-button__shadow {
        transition: box-shadow 34ms;
      }
    }
  }
}
</style>
