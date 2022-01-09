<template>
  <div class="context-menu-button d-inline-block position-relative" :class="className">
    <base-button
      class="btn--rounded"
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
    >
      <span class="visually-hidden">Actions</span>
      <base-icon>
        <icon-more-vert />
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
import ContextMenu from '@/components/ContextMenu.vue';

export default defineComponent({
  inheritAttrs: false,
  name: 'ContextMenuButton',
  components: {
    BaseButton,
    BaseIcon,
    IconMoreVert,
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
