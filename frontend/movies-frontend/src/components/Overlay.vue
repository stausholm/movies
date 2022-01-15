<template>
  <teleport to="#overlay">
    <transition name="fade" appear @after-leave="closeOverlay">
      <div class="overlay" v-bind="$attrs" v-if="openInternal">
        <div
          class="overlay-content"
          role="dialog"
          aria-labelledby="overlayLabel"
          aria-modal="true"
          @keyup.esc.stop="handleEsc"
          @keydown.tab.stop="handleTab"
          ref="overlay"
        >
          <span class="visually-hidden" id="overlayLabel" ref="overlayTitle" tabindex="-1">{{
            label
          }}</span>
          <div class="container container--xxs">
            <!-- make the handleClose method available to slot content by using slot props -->
            <slot :close="handleClose" />
          </div>
        </div>
      </div>
    </transition>
  </teleport>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { trapTabKey, getFocusableChildren } from '@/utils/focus-trap';

export default defineComponent({
  name: 'Overlay',
  inheritAttrs: false,
  emits: ['close'],
  props: {
    label: {
      type: String,
      required: true,
    },
    dismissible: {
      // if false, don't close on popstate and esc key
      type: Boolean,
      default: true,
    },
  },
  data() {
    return {
      openInternal: true, // used to control transitions
      previouslyFocused: null as null | HTMLElement,
      closeEventIsPopstate: false,
    };
  },
  methods: {
    closeOverlay(): void {
      this.$emit('close');
    },
    handleClose(e?: Event): void {
      console.log('handleClose');
      if (e && e.type === 'popstate') {
        this.closeEventIsPopstate = true;
      } else {
        this.closeEventIsPopstate = false;
      }
      this.openInternal = false;
    },
    handleEsc(): void {
      if (this.dismissible) {
        this.handleClose();
      }
    },
    handleTab(e: KeyboardEvent): void {
      trapTabKey(this.$refs.overlay as HTMLElement, e);
    },
    maintainFocus(e: Event): void {
      const isInOverlay = (e.target as Element).closest('[aria-modal="true"]');
      if (!isInOverlay) this.moveFocusIn();
    },
    moveFocusIn(): void {
      /**
       * if a child has autofocus property, focus the first of those
       * else focus the title if it exists
       * otherwise focus the first focusable element in the overlay.
       */
      const target =
        (this.$refs.overlay as HTMLElement).querySelector('[autofocus]') ||
        this.$refs.overlayTitle ||
        getFocusableChildren(this.$refs.overlay as HTMLElement)[0];

      if (target) (target as HTMLElement).focus();
    },
  },
  created() {
    document.body.addEventListener('focus', this.maintainFocus, true);

    if (this.dismissible) {
      // Close overlay in case user presses browser back button
      window.addEventListener('popstate', this.handleClose);
      this.$router.push({ ...this.$route, query: { ...this.$route.query, overlay: 1 } });
    }
  },
  mounted() {
    document.body.classList.add('overlay-open');
    // store reference to el that opened overlay
    this.previouslyFocused = document.activeElement as HTMLElement;
    //move focus into overlay
    this.moveFocusIn();
  },
  beforeUnmount() {
    document.body.classList.remove('overlay-open');
    document.body.removeEventListener('focus', this.maintainFocus, true);

    // restore focus back to element that opened overlay
    if (this.previouslyFocused && this.previouslyFocused.focus) {
      this.previouslyFocused.focus();
    }

    if (this.dismissible) {
      // if user closes overlay by clicking escape key,
      // we make sure to manually remove the extra route we pushed in this.created() to handle popstate navigation
      if (!this.closeEventIsPopstate) {
        this.$router.go(-1);
      }
      // Close overlay in case user presses browser back button
      window.removeEventListener('popstate', this.handleClose);
    }
  },
});
</script>

<style lang="scss">
@use 'sass:math';
@import '@/design/variables/index.scss';
@import '@/design/mixins/index.scss';

body.overlay-open {
  overflow: hidden;
}

.overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  @include z-index(overlay);
  background-color: rgba($white, 0.95);
  color: $text-color-dark;
  cursor: default;
  overflow-y: auto;
  overflow-x: hidden;
  -webkit-overflow-scrolling: touch;

  &-content {
    padding-top: $default-spacing * 4;
    padding-bottom: $default-spacing * 2;
  }
}
</style>
