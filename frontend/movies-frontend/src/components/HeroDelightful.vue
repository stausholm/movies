<template>
  <div class="hero-delight">
    <div class="hero-delight__bg" :style="{ 'background-image': `url('${bgImage}')` }">
      <div class="hero-delight__bg-content" aria-hidden="true" role="presentation">
        <div
          class="slam-icon-wrapper"
          v-for="(icon, index) in slamIcons"
          :key="index"
          :style="icon.styles"
        >
          <img
            :src="icon.icon"
            alt=""
            :style="{ animationDelay: icon.delay + 'ms' }"
            class="slam-icon"
            aria-hidden="true"
            role="presentation"
          />
        </div>
      </div>
    </div>
    <div class="hero-delight__content container">
      <slot />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'HeroDelightful',
  props: {
    bgImage: {
      type: String,
    },
    slamIcons: {
      type: Array,
      default: () => [
        {
          icon: '/img/icons/android-chrome-512x512.png',
          styles: {
            top: '8%',
            left: '28%',
          },
          delay: -2200,
        },
        {
          icon: '/img/icons/android-chrome-512x512.png',
          styles: {
            top: '75%',
            left: '80%',
          },
          delay: -400,
        },
        {
          icon: '/img/icons/android-chrome-512x512.png',
          styles: {
            top: '-15%',
            left: '50%',
          },
          delay: -1200,
        },
        {
          icon: '/img/icons/android-chrome-512x512.png',
          styles: {
            top: '15%',
            left: '63%',
          },
          delay: -1800,
        },
        {
          icon: '/img/icons/android-chrome-512x512.png',
          styles: {
            top: '60%',
            left: '5%',
          },
          delay: -1750,
        },
        {
          icon: '/img/icons/android-chrome-512x512.png',
          styles: {
            top: '28%',
            left: '77%',
            transform: 'scale(0.65)',
          },
          delay: -2600,
        },
        {
          icon: '/img/icons/android-chrome-512x512.png',
          styles: {
            top: '28%',
            left: '16%',
            transform: 'scaleX(-0.65) scaleY(0.65)',
          },
          delay: -1200,
        },
        {
          icon: '/img/icons/android-chrome-512x512.png',
          styles: {
            top: '80%',
            left: '36%',
            transform: 'scale(0.7)',
          },
          delay: -1200,
        },
        {
          icon: '/img/icons/android-chrome-512x512.png',
          styles: {
            top: '80%',
            left: '50%',
            transform: 'scale(2.7)',
            filter: 'blur(5px)',
          },
          delay: -1200,
        },
      ],
    },
  },
});
</script>

<style lang="scss" scoped>
@import '@/design/variables/index.scss';

.hero-delight {
  width: 100%;
  min-height: 215px;
  background: #6f80f7;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: relative;
  overflow: hidden;

  &__bg {
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    background-position: 50% 50%;
    background-repeat: no-repeat;
    background-size: cover;
  }

  &__bg-content {
    width: 100%;
    height: 100%;
    position: absolute;
    animation: slam-in 1s;
    animation-delay: 2s;
    animation-fill-mode: both;
  }

  &__content {
    display: flex;
    align-content: center;
    z-index: 1;
    width: 100%;
    padding-top: $default-spacing;
    padding-bottom: $default-spacing;
    box-sizing: border-box;
  }
}

.slam-icon {
  min-width: 60px;
  max-width: 80px;
  width: 10vh;
  position: absolute;
  animation: slam-icon 6.3s linear infinite;

  &-wrapper {
    position: absolute;
  }
}

@keyframes slam-in {
  0% {
    transform: translateY(30px) scale(0.5);
    opacity: 0;
  }
  45% {
    opacity: 0.75;
  }
  100% {
    transform: translate(0) scale(1);
    opacity: 1;
  }
}

@keyframes slam-icon {
  0% {
    transform: translate(-10.6066017178px, 10.6066017178px);
  }
  5% {
    transform: translate(-11.1800177406px, 8.9949376183px);
  }
  10% {
    transform: translate(-10.6590557312px, 6.5027863534px);
  }
  15% {
    transform: translate(-9.0947110808px, 3.3740970526px);
  }
  20% {
    transform: translate(-6.6401127432px, -0.0848723765px);
  }
  25% {
    transform: translate(-3.5355339059px, -3.5355339059px);
  }
  30% {
    transform: translate(-0.0848723765px, -6.6401127432px);
  }
  35% {
    transform: translate(3.3740970526px, -9.0947110808px);
  }
  40% {
    transform: translate(6.5027863534px, -10.6590557312px);
  }
  45% {
    transform: translate(8.9949376183px, -11.1800177406px);
  }
  50% {
    transform: translate(10.6066017178px, -10.6066017178px);
  }
  55% {
    transform: translate(11.1800177406px, -8.9949376183px);
  }
  60% {
    transform: translate(10.6590557312px, -6.5027863534px);
  }
  65% {
    transform: translate(9.0947110808px, -3.3740970526px);
  }
  70% {
    transform: translate(6.6401127432px, 0.0848723765px);
  }
  75% {
    transform: translate(3.5355339059px, 3.5355339059px);
  }
  80% {
    transform: translate(0.0848723765px, 6.6401127432px);
  }
  85% {
    transform: translate(-3.3740970526px, 9.0947110808px);
  }
  90% {
    transform: translate(-6.5027863534px, 10.6590557312px);
  }
  95% {
    transform: translate(-8.9949376183px, 11.1800177406px);
  }
  100% {
    transform: translate(-10.6066017178px, 10.6066017178px);
  }
}
</style>
