<template>
  <teleport to="#modal">
    <transition name="modal" appear @after-leave="closeModal">
      <div class="modal-container" v-if="openInternal">
        <div class="overlay" @click="handleClose"></div>
        <div
          class="modal container p-0"
          role="dialog"
          aria-labelledby="modaltitle"
          aria-modal="true"
          @keyup.esc.stop="handleEsc"
          @keydown.tab.stop="handleTab"
          ref="modal"
        >
          <header class="modal__header p-1" v-if="title || showCloseButton">
            <strong
              v-if="title"
              id="modaltitle"
              class="h4 mb-0 mr modal__title"
              ref="modaltitle"
              tabindex="-1"
              >{{ title }}</strong
            >
            <button v-if="showCloseButton" @click="handleClose" class="btn--absolute-sized">
              Close
            </button>
          </header>
          <p v-else-if="!title" id="modaltitle" class="visually-hidden">Modal</p>
          <div class="modal__body" ref="modalbody" tabindex="-1">
            <slot :close="handleClose"></slot>
          </div>
          <div class="modal__footer" :class="{ 'actions-stack-mobile': stackActions }">
            <button @click="handleClose" class="cancel btn btn--text" ref="modalcancel">
              {{ cancelLabelFormatted }}
            </button>
            <button
              v-if="confirmLabel"
              @click="handleConfirm"
              class="confirm btn"
              :class="{
                'btn--primary': !confirmIsDestructive,
                'btn--danger': confirmIsDestructive,
              }"
            >
              {{ confirmLabel }}
            </button>
          </div>
        </div>
      </div>
    </transition>
  </teleport>
</template>

<script lang="ts">
// sources: https://www.w3.org/TR/wai-aria-practices/examples/dialog-modal/dialog.html#
// sources: https://www.smashingmagazine.com/2021/07/accessible-dialog-from-scratch/

// TODO: convert all accessibility code into a wrapper component that can be imported into this component, PwaInstallOverlay, actionSheet, etc

import { defineComponent } from 'vue';
import { trapTabKey, getFocusableChildren } from '@/utils/focus-trap';

export default defineComponent({
  name: 'Modal',
  emits: ['close', 'confirm'],
  props: {
    cancelLabel: {
      type: String,
    },
    confirmLabel: {
      type: String,
    },
    confirmIsDestructive: {
      type: Boolean,
      default: false,
    },
    stackActions: {
      type: Boolean,
      default: false,
    },
    title: {
      type: String,
    },
    showCloseButton: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      openInternal: true, // used to control transitions
      previouslyFocused: null as null | HTMLElement,
      closeEventIsPopstate: false,
    };
  },
  computed: {
    cancelLabelFormatted(): string {
      return this.cancelLabel || 'Cancel';
    },
  },
  methods: {
    closeModal(): void {
      this.$emit('close');
    },
    handleClose(e?: Event): void {
      if (e && e.type === 'popstate') {
        this.closeEventIsPopstate = true;
      } else {
        this.closeEventIsPopstate = false;
      }
      this.openInternal = false;
    },
    handleConfirm(): void {
      this.$emit('confirm');
      this.openInternal = false;
    },
    handleEsc(): void {
      this.handleClose();
    },
    handleTab(e: KeyboardEvent): void {
      trapTabKey(this.$refs.modal as HTMLElement, e);
    },
    maintainFocus(e: Event): void {
      const isInModal = (e.target as Element).closest('[aria-modal="true"]');
      if (!isInModal) this.moveFocusIn();
    },
    moveFocusIn(): void {
      /**
       * if a child has autofocus property, focus the first of those
       * else focus the title if it exists
       * otherwise focus the first focusable element in the body.
       * if there's nothing focusable in the body, focus the close button in the footer
       */
      const target =
        (this.$refs.modal as HTMLElement).querySelector('[autofocus]') ||
        this.$refs.modaltitle ||
        getFocusableChildren(this.$refs.modalbody as HTMLElement)[0] ||
        this.$refs.modalcancel;

      if (target) (target as HTMLElement).focus();
    },
  },
  created() {
    document.body.addEventListener('focus', this.maintainFocus, true);

    // Close modal in case user presses browser back button
    // TODO: move modal popstate logic into vuex modalOpen boolean, and global vuerouter beforeEach check using next(false)
    window.addEventListener('popstate', this.handleClose);
    this.$router.push({ ...this.$route, query: { ...this.$route.query, modal: 1 } });
  },
  mounted() {
    document.body.classList.add('modal-open');
    // store reference to el that opened modal
    this.previouslyFocused = document.activeElement as HTMLElement;
    //move focus into modal
    this.moveFocusIn();
  },
  beforeUnmount() {
    document.body.classList.remove('modal-open');
    document.body.removeEventListener('focus', this.maintainFocus, true);

    // restore focus back to element that opened modal
    if (this.previouslyFocused && this.previouslyFocused.focus) {
      this.previouslyFocused.focus();
    }

    // if user closes modal by clicking on the overlay behind, or the close button inside the modal,
    // we make sure to manually remove the extra route we pushed in this.created() to handle popstate navigation
    if (!this.closeEventIsPopstate) {
      this.$router.go(-1);
    }
    // Close modal in case user presses browser back button
    window.removeEventListener('popstate', this.handleClose);
  },
});
</script>

<style lang="scss">
@use 'sass:math';
@import '@/design/variables/index.scss';
@import '@/design/mixins/index.scss';

body.modal-open {
  overflow: hidden;
}

.modal-container {
  $modal-bg: $white;

  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  padding: math.div($default-spacing, 2);
  display: flex;
  align-items: flex-end;
  @include z-index(modal);

  @include breakpoint(sm) {
    align-items: center;
  }

  .overlay {
    position: absolute;
    top: 0;
    left: 0;
    background-color: $overlay-bg;
    width: 100%;
    height: 100%;
    z-index: -1;
  }

  .modal {
    position: relative;
    background-color: $modal-bg;
    border-radius: $border-radius-base;
    overflow: hidden;
    max-height: 100vh; // TODO: 100vh !== 100vh https://cloudfour.com/thinks/a-bashful-button-worth-8-million/
    width: 100%;
    box-shadow: $box-shadow-sm;

    @include breakpoint(sm) {
      max-width: $breakpoint-sm - $default-spacing * 4;
    }

    &__header {
      display: flex;
      align-items: center;
      justify-content: space-between;

      button {
        color: $link-color;
        margin-left: auto;

        &:hover {
          color: $link-hover-color;
        }
      }
    }

    &__title {
      outline: 0;
    }

    &__body {
      padding: $default-spacing;
      max-height: 50vh; // TODO detract modal header and modal footer heights
      overflow-y: auto;
      -webkit-overflow-scrolling: touch;
      outline: 0;

      @include breakpoint(sm) {
        &::-webkit-scrollbar {
          background-color: transparent;
          width: 16px;
        }

        &::-webkit-scrollbar-thumb {
          border-radius: 99px;
          background-color: $gray-500;
          border: 5px solid $modal-bg;

          &:hover {
            background-color: $gray-600;
          }
        }
      }
    }

    &__footer {
      display: flex;
      padding: math.div($default-spacing, 2);

      button {
        flex: 1;
      }

      // overflow shadow
      position: relative;
      &::before {
        content: '';
        position: absolute;
        bottom: 100%;
        left: 0;
        right: 0;
        display: block;
        height: $default-spacing;
        background: linear-gradient(to top, $modal-bg, transparent);
      }

      .confirm {
        margin-left: math.div($default-spacing, 2);
      }

      &.actions-stack-mobile {
        @include breakpoint-max(sm) {
          flex-direction: column-reverse;

          .confirm {
            margin-bottom: math.div($default-spacing, 2);
            margin-left: 0;
          }
        }
      }

      @include breakpoint(sm) {
        justify-content: flex-end;
        padding: $default-spacing;

        button {
          flex: 0 0 auto;
        }
      }
    }
  }
}

// transitions
.modal-enter-from {
  opacity: 0;

  .modal {
    opacity: 0;
    transform: translateY(40%) scale(0.9);
  }
}
.modal-enter-active {
  transition: opacity 0.2s ease-in;

  .modal {
    transition: opacity 0.2s $ease-out-cubic, transform 0.2s $ease-out-cubic;
  }
}
.modal-leave-active {
  transition: opacity 0.15s $ease-out-cubic;
  opacity: 0;

  .modal {
    transition: opacity 0.15s $ease-out-cubic, transform 0.15s $ease-out-cubic;
    opacity: 0;
    transform: translateY(20%);
  }
}

@include breakpoint(sm) {
  .modal-enter-from .modal {
    transform: scale(0.95);
  }
  .modal-enter-active .modal {
    transform-origin: center center;
  }
  .modal-leave-active .modal {
    transform: scale(0.95);
  }
}
</style>
