<template>
  <span
    class="chip"
    role="presentation"
    :class="{
      'chip--checked': isChecked,
      'chip--icon-on': showIcon === true,
      'chip--icon-off': showIcon === false,
    }"
  >
    <span class="chip__inner">
      <component :is="tag" class="chip__button" @click="handleClick" v-bind="computedAttributes">
        <span class="chip__graphic">
          <span class="chip__checkmark">
            <base-icon-async v-if="icon" :name="icon" :width="18" :height="18" />
            <base-icon v-else :width="18" :height="18">
              <icon-check />
            </base-icon>
          </span>
        </span>
        <span class="chip__text">
          <slot></slot>
        </span>
        <span class="chip__graphic chip__graphic--close" v-if="closable">
          <span class="visually-hidden">Click to close</span>
          <span class="chip__close">
            <base-icon :width="18" :height="18">
              <icon-close />
            </base-icon>
          </span>
        </span>
      </component>
    </span>
  </span>
</template>

<script lang="ts">
import { defineComponent, inject } from 'vue';
import BaseIcon from '@/components/base/BaseIcon.vue';
import BaseIconAsync from '@/components/base/BaseIconAsync.vue';
import IconCheck from '@/components/icons/IconCheck.vue';
import IconClose from '@/components/icons/IconClose.vue';
import { chipType } from '@/types/Chips';

export default defineComponent({
  name: 'Chip',
  // setup() method is needed for injection, in order to make it work with typescript
  // inject: ['ChipType'],
  setup() {
    const ChipType = inject('ChipType') as chipType;

    return {
      ChipType,
    };
  },
  components: {
    BaseIcon,
    BaseIconAsync,
    IconCheck,
    IconClose,
  },
  emits: ['close', 'update:modelValue'],
  props: {
    disabled: {
      type: Boolean,
      default: false,
    },
    showIcon: {
      // if left undefined, default logic will be used (show icon when isChecked). if true/false always show/hide the icon
      type: Boolean,
      default: undefined,
    },
    icon: {
      type: String,
    },
    checked: {
      //this prop is in case you want to use the component without v-model
      type: Boolean,
      default: undefined,
    },
    closable: {
      type: Boolean,
      default: false,
    },
    modelValue: {
      type: [String, Boolean, Array],
      default: undefined,
    },
    value: {
      default: undefined,
    },
  },
  methods: {
    handleClick(): void {
      if (this.isPresentation || this.disabled) {
        return;
      }
      if (this.closable) {
        this.$emit('close');
      }
      if (this.modelValue !== undefined) {
        if (this.ChipType === 'radio') {
          if (this.isChecked) {
            // user deselected the radiochip
            this.$emit('update:modelValue', null); // radio
          } else {
            this.$emit('update:modelValue', this.value); // radio
          }
        } else if (this.ChipType === 'checkbox') {
          if (this.isCheckboxList) {
            const modelValue = this.modelValue as unknown[];
            if (this.isChecked) {
              //remove value from :modelValue array
              const filtered = modelValue.filter((x) => x !== this.value);
              this.$emit('update:modelValue', filtered); //checkbox array
            } else {
              // add value to the end of :modelValue array
              this.$emit('update:modelValue', [...modelValue, this.value]); //checkbox array
            }
          } else {
            this.$emit('update:modelValue', !this.modelValue); //checkbox boolean
          }
        }
      }
    },
  },
  computed: {
    isPresentation(): boolean {
      return this.ChipType === 'presentation';
    },
    tag(): string {
      return this.isPresentation ? 'span' : 'button';
    },
    computedAttributes() {
      if (this.isPresentation) {
        return {
          role: 'presentation',
        };
      }

      return {
        role: this.ChipType === 'button' ? 'button' : 'option',
        type: 'button',
        tabindex: '0',
        'aria-selected': this.isChecked,
        'aria-disabled': this.disabled,
      };
    },
    isChecked(): boolean {
      if (typeof this.checked === 'boolean') {
        return this.checked;
      }
      if (this.modelValue === undefined) {
        return false;
      }
      if (this.isCheckboxList) {
        return (this.modelValue as unknown[]).includes(this.value);
      }
      if (!this.isCheckboxList && this.ChipType === 'checkbox') {
        // boolean checkbox v-model where we don't want to have to pass down a :value prop
        return !!this.modelValue;
      }
      // default assume radio
      return this.modelValue === this.value;
    },
    isCheckboxList(): boolean {
      return Array.isArray(this.modelValue);
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
  max-width: 100%;

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
    border-radius: 20px;

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
    background-color: #e8f0fe;
    color: $brand-primary;
  }
  &--checked:not(.chip--icon-off),
  &--icon-on {
    .chip__graphic {
      width: 18px;
    }
    .chip__checkmark {
      transform: translate(-50%, -50%);
      opacity: 1;
    }
  }

  &__text {
    white-space: nowrap;
    user-select: none;
    text-overflow: ellipsis;
    overflow: hidden;
    font-size: 0.875rem;
    letter-spacing: 0.0178571429em;
    font-weight: 500;
    text-align: left;
  }

  // TODO: hover, active, focus-visible, and disabled styles
  // TODO: clean up css
}
</style>
