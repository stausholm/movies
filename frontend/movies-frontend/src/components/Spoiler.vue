<template>
  <span
    class="spoiler"
    :title="revealed ? '' : 'Reveal Spoiler'"
    :aria-label="revealed ? null : 'Reveal Spoiler'"
    :class="{ spoiled: revealed, 'spoiler--image': isImage }"
    tabindex="0"
    role="button"
    @keyup.space.enter.stop="reveal"
    @keydown.space.enter.stop.prevent
    @click="reveal"
  >
    <span class="spoiler-mask" :aria-hidden="!revealed" ref="content">
      <slot></slot>
    </span>
  </span>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { getFocusableChildren } from '@/utils/focus-trap';

// TODO: make sure it's accessible

export default defineComponent({
  name: 'Spoiler',
  data() {
    return {
      revealed: false,
      focusableChildren: [] as HTMLElement[],
    };
  },
  computed: {
    isImage(): boolean {
      return !!(
        this.$slots.default &&
        this.$slots.default().length === 1 &&
        this.$slots.default()[0].type === 'img'
      );
    },
  },
  methods: {
    reveal(): void {
      this.revealed = true;

      this.focusableChildren.forEach((el) => {
        const hasTabindex = el.getAttribute('data-spoiler-tabindex');
        if (hasTabindex) {
          el.setAttribute('tabindex', hasTabindex);
        } else {
          el.removeAttribute('tabindex');
        }
      });
    },
  },
  mounted() {
    const contentEl = this.$refs.content as HTMLElement;
    this.focusableChildren = getFocusableChildren(contentEl);
    this.focusableChildren.forEach((el) => {
      const hasTabindex = el.getAttribute('tabindex');
      if (hasTabindex) {
        el.setAttribute('data-spoiler-tabindex', hasTabindex);
      }
      el.setAttribute('tabindex', '-1');
    });
  },
});
</script>

<style lang="scss" scoped>
@import '@/design/variables/index.scss';

.spoiler {
  position: relative;
  display: inline;
  background: $body-color;
  padding: 0.1em 0.5em;
  transition: background-color 500ms ease;
  cursor: pointer;

  &--image {
    display: inline-block;
    padding: 0;
  }

  > .spoiler-mask {
    opacity: 0;
    transition: opacity 500ms ease;
  }

  &.spoiled {
    background: $gray-200;
    cursor: unset;

    > .spoiler-mask {
      opacity: 1;
    }
  }
}
</style>
