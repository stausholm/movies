<template>
  <div class="context-menu-button d-inline-block position-relative" :class="className">
    <base-button
      class="btn--rounded context-menu-button__btn"
      :class="[buttonClass, { 'context-menu-button__btn--small': smallButton }]"
      :id="idFormatted.button"
      aria-haspopup="true"
      :aria-controls="idFormatted.list"
      :aria-expanded="menuOpened"
      @click="openMenu"
      @keyup.up="openMenu"
      @keyup.down="openMenu"
      @keyup.home="openMenu"
      @keyup.end="openMenu"
      @keydown.down.prevent
      @keydown.up.prevent
      @keydown.home.prevent
      @keydown.end.prevent
      data-pushtip="Actions"
    >
      <span class="visually-hidden">Actions</span>
      <base-icon :width="smallButton ? 18 : 24" :height="smallButton ? 18 : 24">
        <icon-more-horiz v-if="horizontalIcon" />
        <icon-more-vert v-else />
      </base-icon>
    </base-button>
    <context-menu
      v-if="menuOpened"
      :listId="idFormatted.list"
      :focusLastOnMounted="focusLast"
      :triggerId="idFormatted.button"
      :actions="actions"
      v-bind="$attrs"
      @__close="closeMenu"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import BaseButton from '@/components/base/BaseButton.vue';
import BaseIcon from '@/components/base/BaseIcon.vue';
import IconMoreVert from '@/components/icons/IconMoreVert.vue';
import IconMoreHoriz from '@/components/icons/IconMoreHoriz.vue';
import ContextMenu from '@/components/ContextMenu.vue';

// accessibility reference: https://www.w3.org/TR/wai-aria-practices/examples/menu-button/menu-button-actions.html

export default defineComponent({
  inheritAttrs: false,
  name: 'ContextMenuButton',
  components: {
    BaseButton,
    BaseIcon,
    IconMoreVert,
    IconMoreHoriz,
    ContextMenu,
  },
  props: {
    actions: {
      type: Array,
      required: true,
    },
    id: {
      type: String,
      required: true,
    },
    class: {
      // since $attrs is bound to the <context-menu /> component we want to make sure if any class is set when importing this component,
      // that classes are applied the correct place and not on <context-menu />
      type: String,
      default: '',
    },
    buttonClass: {
      type: String,
      default: '',
    },
    horizontalIcon: {
      type: Boolean,
      default: false,
    },
    smallButton: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      menuOpened: false,
      focusLast: false, // focus last menuitem. if true: focus first menuitem which is also default
    };
  },
  computed: {
    idFormatted(): { button: string; list: string } {
      return {
        button: `__ctx-menu-b--${this.id}`,
        list: `__ctx-menu-l--${this.id}`,
      };
    },
    className(): string {
      return this.class;
    },
  },
  methods: {
    openMenu(ev: Event) {
      if (ev.type === 'keyup') {
        if ((ev as KeyboardEvent).key === 'End' || (ev as KeyboardEvent).key === 'ArrowUp') {
          this.focusLast = true;
        } else {
          this.focusLast = false;
        }
      }
      this.menuOpened = true;
    },
    closeMenu() {
      this.menuOpened = false;
    },
  },
});
</script>

<style lang="scss" scoped>
@use 'sass:math';
@import '@/design/variables/index.scss';
@import '@/design/mixins/index.scss';

.context-menu-button__btn {
  &--small {
    min-width: 32px;
    min-height: 32px;
    width: 32px;
    height: 32px;
    padding: 4px;

    // it's important that the touchtarget is still big enough to be easy to hit, so we make sure it's at least always the minimum required size
    &::before {
      content: '';
      position: absolute;
      top: 50%;
      left: 50%;
      min-height: $min-touch-target-size;
      min-width: $min-touch-target-size;
      transform: translateY(-50%) translateX(-50%);
      z-index: -1;
    }
  }
}
</style>
