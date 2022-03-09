<template>
  <span class="chip" role="presentation" :class="{ 'chip--checked': checked }">
    <span class="chip__inner">
      <button
        class="chip__button"
        role="option"
        aria-label="Filter by TODO"
        type="button"
        tabindex="0"
        aria-selected="todo"
        aria-disabled="todo"
        @click="handleClick"
      >
        <span class="chip__graphic">
          <span class="chip__checkmark">
            <base-icon-async v-if="icon" :name="icon" :width="18" :height="18" />
            <base-icon v-else :width="18" :height="18">
              <icon-check />
            </base-icon>
          </span>
        </span>
        <span class="chip__text">lorem ipsum dolor sit amet</span>
        <span class="chip__graphic chip__graphic--close" v-if="closable">
          <span class="chip__close">
            <base-icon :width="18" :height="18">
              <icon-close />
            </base-icon>
          </span>
        </span>
      </button>
      <!-- <button class="chip__button">
        <span class="chip__text">extra button</span>
      </button> -->
    </span>
  </span>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import BaseIcon from '@/components/base/BaseIcon.vue';
import BaseIconAsync from '@/components/base/BaseIconAsync.vue';
import IconCheck from '@/components/icons/IconCheck.vue';
import IconClose from '@/components/icons/IconClose.vue';

/**
 * TODO:
 * make it work as a simple non-interactve chip with option to add custom icon where there is currently a checkmark
 * radio button (no icon, only bg, color, and border change)
 * removable chip with close button
 * checkbox (use checkmark icon)
 * filter (multiple buttons in a single chip)
 *
 * should work with v-model
 *
 * should emit close and click events
 */

export default defineComponent({
  name: 'Chip',
  components: {
    BaseIcon,
    BaseIconAsync,
    IconCheck,
    IconClose,
  },
  emits: ['close', 'update:modelValue'],
  props: {
    type: {
      type: String,
      // validator(val: string) {
      //   return ['presentation', 'radio', 'checkbox', 'filter'].includes(val);
      // },
    },
    icon: {
      type: String,
    },
    closable: {
      type: Boolean,
      default: false,
    },
    modelValue: {
      type: Boolean,
    },
  },
  data() {
    return {
      checked: false,
    };
  },
  methods: {
    handleClick(): void {
      if (this.closable) {
        this.$emit('close');
      }
      if (this.modelValue !== undefined) {
        this.$emit('update:modelValue', !this.modelValue);
      }
      this.checked = !this.checked;
    },
  },
});
</script>

<style lang="scss" scoped>
@use 'sass:math';
@import '@/design/variables/index.scss';
@import '@/design/mixins/index.scss';

.chip {
  height: 32px;
  display: inline-flex;
  align-items: center;
  border-radius: 20px;
  margin-left: 8px;
  margin-right: 0;
  margin-top: 4px;
  margin-bottom: 4px;
  position: relative;

  &__inner {
    width: 100%;
    height: 100%;
    overflow: visible;
    display: inline-flex;
    align-items: center;
  }

  &__button {
    padding-left: 0;
    padding-right: 16px;
    overflow: visible;
    align-items: center;
    background: none;
    border: none;
    box-sizing: content-box;
    box-sizing: border-box;
    cursor: pointer;
    display: inline-flex;
    justify-content: center;
    //outline: none;
    text-decoration: none;
    height: 100%;
    color: inherit;
    min-width: 32px;

    &::before {
      box-sizing: border-box;
      content: '';
      height: 100%;
      left: 0;
      position: absolute;
      pointer-events: none;
      top: 0;
      width: 100%;
      z-index: 1;
      border-style: solid;
      border-color: #dadce0;
      border-width: 1px;
      border-radius: 20px;
    }

    // + .chip__button {
    //   position: relative;
    //   &::before {
    //     //border-color: transparent;
    //   }
    //   &::after {
    //     content: '';
    //     position: absolute;
    //     left: -12px;
    //     top: 8px;
    //     bottom: 8px;
    //     width: 1px;
    //     background-color: currentColor;
    //   }
    // }
  }

  &__graphic {
    width: 0;
    height: 18px;
    padding-left: 8px;
    padding-right: 8px;
    align-items: center;
    display: inline-flex;
    justify-content: center;
    overflow: hidden;
    pointer-events: none;
    position: relative;
    flex: 1 0 auto;
    box-sizing: content-box;
    transition: width 100ms 0ms cubic-bezier(0.4, 0, 0.2, 1);

    &--close {
      width: 18px;
      margin-right: -12px;
    }
  }

  &__close {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);

    svg {
      display: block;
    }
  }

  &__checkmark {
    // height: 20px;
    // width: 20px;
    transition: opacity 50ms 0ms linear, transform 100ms 0ms cubic-bezier(0.4, 0, 0.2, 1);
    transform: translate(-75%, -50%);
    position: absolute;
    opacity: 0;
    top: 50%;
    left: 50%;

    svg {
      display: block;
    }
  }
  &--checked {
    .chip__graphic {
      width: 18px;
    }
    .chip__checkmark {
      transform: translate(-50%, -50%);
      opacity: 1;
    }
    background-color: #e8f0fe;
    color: $brand-primary;
  }

  &__text {
    white-space: nowrap;
    user-select: none;
    text-overflow: ellipsis;
    overflow: hidden;
    font-size: 0.875rem;
    letter-spacing: 0.0178571429em;
    font-weight: 500;
    overflow: visible;
    text-align: left;
  }
}
</style>
