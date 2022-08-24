<template>
  <div class="loader-logo" role="status">
    <div class="logo-wrapper" :style="{ width: `${sizeInternal}px`, height: `${sizeInternal}px` }">
      <div
        class="waveBg"
        :style="{
          transitionDuration: `${duration + duration / 6}s`,
          backgroundPosition: dynamicBGPositionBG,
        }"
        @transitionend="filledUp"
      />
      <div
        class="waveFg"
        :style="{ transitionDuration: `${duration}s`, backgroundPosition: dynamicBGPositionFG }"
      />
      <div class="logo-container">
        <img alt="logo" class="logo" src="@/assets/logo-white.svg" />
      </div>
    </div>
    <span class="loader__message d-block mt text-small fw-bold" v-if="message">{{ message }}</span>
    <span class="visually-hidden" v-else>Loading.</span>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'LoaderLogo',
  emits: ['completed'],
  props: {
    message: {
      type: String,
    },
    size: {
      type: [String, Number],
    },
    duration: {
      // seconds
      type: Number,
      required: true,
    },
  },
  computed: {
    dynamicBGPositionBG() {
      return this.transitionStarted
        ? '0px 0px'
        : `${this.sizeInternal * (this.duration / 6) * 5}px ${this.sizeInternal * 1.2109375}px`;
    },
    dynamicBGPositionFG() {
      return this.transitionStarted
        ? `${this.sizeInternal * (this.duration / 6) * 8}px 0px`
        : `0px ${this.sizeInternal * 1.1484375}px`;
    },
  },
  mounted() {
    setTimeout(() => {
      this.transitionStarted = true;
    }, 1);
  },
  created() {
    if (typeof this.size === 'string') {
      const parsedSize = parseInt(this.size);
      if (!isNaN(parsedSize)) {
        this.sizeInternal = parsedSize;
      }
    } else if (typeof this.size === 'number') {
      this.sizeInternal = this.size;
    }
  },
  data() {
    return {
      transitionStarted: false,
      sizeInternal: 128,
    };
  },
  methods: {
    filledUp() {
      this.$emit('completed');
    },
  },
});
</script>

<style lang="scss" scoped>
@import '@/design/variables/index.scss';
@import '@/design/mixins/index.scss';
@import '@/design/functions/index.scss';

.logo-wrapper {
  $loader-wave-bg: $__brand-primary;
  $loader-wave-fg: $__brand-primary-light;
  overflow: hidden;
  width: 128px;
  height: 128px;
  background-color: $white;
  border-radius: 50%;
  position: relative;

  img {
    display: block;
  }

  .logo-container {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100%;
    padding: 18%;

    .logo {
      width: 100%;
    }
  }
  .waveBg,
  .waveFg {
    background-repeat: repeat-x;
    background-size: 100%;
    background-position: 0px 0px;
    width: 100%;
    height: 114.375%;
    position: absolute;
    bottom: 0;
    transition: background-position 6s ease-out;
  }
  .waveBg {
    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 128 147'%3E%3Cpath fill='#{encodecolor($loader-wave-bg)}' d='M125.5 10.2A50.6 50.6 0 0064 12l-2.5 1.7A50.6 50.6 0 010 12v135h128V12l-2.5-1.8z' /%3E%3C/svg%3E");
    transition-duration: 7s;
  }
  .waveFg {
    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 128 147'%3E%3Cpath fill='#{encodecolor($loader-wave-fg)}' d='M2.5 10.2A50.6 50.6 0 0164 12l2.5 1.7A50.6 50.6 0 00128 12v135H0V12l2.5-1.8z' /%3E%3C/svg%3E");
  }
}
</style>
