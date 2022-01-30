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
import { AppMutations } from '@/store/app/mutations';

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
      overlayNumber: 1,
    };
  },
  methods: {
    closeOverlay(): void {
      this.$emit('close');
    },
    handleClose(): void {
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
    handlePopstate() {
      if (this.overlayNumber === this.$store.getters.openOverlaysCount) {
        this.handleClose();
      }
    },
  },
  created() {
    document.body.addEventListener('focus', this.maintainFocus, true);

    if (this.dismissible) {
      // Close overlay in case user presses browser back button
      window.addEventListener('popstate', this.handlePopstate);

      this.$store.commit(AppMutations.INCREMENT_OVERLAY_COUNT);
      this.overlayNumber = this.$store.getters.openOverlaysCount;
    } else {
      // NOTE: navigation is NOT reenabled on @close.
      // If navigation should be reenabled on @close, it should be handled in the component that renders the overlay
      this.$store.commit(AppMutations.DISABLE_NAVIGATION);
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
    if (this.overlayNumber === 1) {
      // no more overlays behind this one, so remove overflow:hidden on body
      document.body.classList.remove('overlay-open');
    }
    this.$store.commit(AppMutations.SUBTRACT_OVERLAY_COUNT);
    document.body.removeEventListener('focus', this.maintainFocus, true);

    // restore focus back to element that opened overlay
    if (this.previouslyFocused && this.previouslyFocused.focus) {
      this.previouslyFocused.focus();
    }

    if (this.dismissible) {
      // Close overlay in case user presses browser back button
      window.removeEventListener('popstate', this.handlePopstate);
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
