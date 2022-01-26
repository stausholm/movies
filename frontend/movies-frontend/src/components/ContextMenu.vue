<template>
  <transition name="contextMenuTransition" appear @after-leave="closeMenu">
    <div class="context-menu" v-if="showInternal" @keyup.esc.stop="handleClose">
      <div :class="`context-menu__content context-menu__content--${position} rounded-small shadow`">
        <ul
          :id="listId"
          role="menu"
          :aria-labelledby="triggerId"
          tabindex="-1"
          class="p-0"
          ref="list"
        >
          <li v-for="action in actions" :key="action.label" tabindex="-1" role="none">
            <button
              class="btn context-menu__action"
              @click="handleClick(action.emit)"
              role="menuitem"
              :ref="setButtonRef"
              tabindex="-1"
              :title="action.label"
              @keyup.up="handleUp"
              @keyup.down="handleDown"
              @keyup.home="focusFirst"
              @keyup.end="focusLast"
              @keydown.down.prevent
              @keydown.up.prevent
              @keydown.home.prevent
              @keydown.end.prevent
              @keydown.tab="handleTab"
              :data-pushtip="action.label"
            >
              <base-icon-async v-if="action.icon" :name="action.icon" width="18" height="18" />
              <span class="text-truncate">{{ action.label }}</span>
            </button>
          </li>
        </ul>
      </div>
      <div class="context-menu__overlay" @click.stop="handleClose"></div>
    </div>
  </transition>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { clickRegionElement } from '@/utils/clickRegion';
import BaseIconAsync from '@/components/base/BaseIconAsync.vue';

export default defineComponent({
  components: { BaseIconAsync },
  name: 'ContextMenu',
  props: {
    actions: {
      type: Array,
      required: true,
    },
    triggerId: {
      type: String,
      required: true,
    },
    listId: {
      type: String,
      required: true,
    },
    focusLastOnMounted: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      position: clickRegionElement(document.getElementById(this.triggerId) as HTMLElement),
      showInternal: true,
      previouslyFocused: null as null | HTMLElement,
      buttonRefs: [] as HTMLButtonElement[],
    };
  },
  methods: {
    closeMenu() {
      // needed for enter and leave transitions to work with v-if rendering of this component
      this.$emit('__close');
    },
    handleClose() {
      // needed for enter and leave transitions to work with v-if rendering of this component
      this.showInternal = false;
    },
    handleClick(emitKey: string) {
      this.$emit(emitKey);
      this.handleClose();
    },
    handleUp(ev: KeyboardEvent) {
      const elIndex = this.buttonRefs.findIndex((x) => x === ev.target);
      if (elIndex === 0) {
        // wrap around to the last
        this.focusLast();
      } else {
        this.buttonRefs[elIndex - 1].focus();
      }
    },
    handleDown(ev: KeyboardEvent) {
      const elIndex = this.buttonRefs.findIndex((x) => x === ev.target);
      if (elIndex === this.buttonRefs.length - 1) {
        // wrap around to the first
        this.focusFirst();
      } else {
        this.buttonRefs[elIndex + 1].focus();
      }
    },
    handleTab() {
      // when pressing tab we should close the menu,
      // and NOT restore focus back to this.prevouslyFocused as we want to keep focus on whatever the user tabbed over to instead
      this.previouslyFocused = null;
      this.handleClose();
    },
    focusFirst() {
      this.buttonRefs[0].focus();
    },
    focusLast() {
      this.buttonRefs[this.buttonRefs.length - 1].focus();
    },
    setButtonRef(el: HTMLButtonElement) {
      if (el) {
        this.buttonRefs.push(el);
      }
    },
  },
  mounted() {
    // store reference to el that opened menu
    this.previouslyFocused = document.activeElement as HTMLElement;

    if (this.focusLastOnMounted) {
      // move focus to last menuitem
      this.focusLast();
    } else {
      // move focus to first menuitem
      this.focusFirst();
    }
  },
  beforeUnmount() {
    // restore focus back to element that opened menu
    if (this.previouslyFocused && this.previouslyFocused.focus) {
      this.previouslyFocused.focus();
    }
  },
});
</script>

<style lang="scss" scoped>
@import '@/design/variables/index.scss';
@import '@/design/mixins/index.scss';

.context-menu {
  &__content {
    @include z-index(contextmenu);
    min-width: 150px;
    max-width: 300px;
    background: $white;
    position: absolute;

    &.context-menu__content--,
    &--topright {
      // default location
      right: 0;
      top: 0;
      transform-origin: top right;
    }
    &--topleft {
      left: 0;
      top: 0;
      transform-origin: top left;
    }
    &--bottomright {
      right: 0;
      bottom: 0;
      transform-origin: bottom right;
    }
    &--bottomleft {
      left: 0;
      bottom: 0;
      transform-origin: bottom left;
    }

    ul {
      list-style-type: none;
      margin: 0;
    }
    li {
      &:not(:last-child) {
        border-bottom: 1px solid $gray-300;
      }
      &:first-child {
        .context-menu__action {
          border-top-left-radius: $border-radius-small;
          border-top-right-radius: $border-radius-small;
        }
      }
      &:last-child {
        .context-menu__action {
          border-bottom-left-radius: $border-radius-small;
          border-bottom-right-radius: $border-radius-small;
        }
      }
    }
  }
  &__action {
    padding: $default-spacing;
    border-radius: 0;
    font-weight: normal;
    width: 100%;
    justify-content: flex-start;
    text-align: left;
    overflow: hidden;
  }
  &__overlay {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.1);
    @include z-index(contextmenu, -1);
  }
}

// transitions
.contextMenuTransition-enter-from {
  .context-menu__content {
    transform: scale(0);
    opacity: 0;
  }
  .context-menu__overlay {
    opacity: 0;
  }
}
.contextMenuTransition-enter-active {
  transition-duration: 0.2s;
  .context-menu__content {
    transition: opacity 0.2s, transform 0.15s $ease-out-cubic-ish;
  }
  .context-menu__overlay {
    transition: opacity 0.2s;
  }
}
.contextMenuTransition-leave-active {
  transition-duration: 0.2s;
  .context-menu__content {
    transition: opacity 0.2s, transform 0.15s $ease-out-cubic-ish;
    transform: scale(0);
    opacity: 0;
  }
  .context-menu__overlay {
    transition: opacity 0.2s ease-out;
    opacity: 0;
  }
}
</style>
