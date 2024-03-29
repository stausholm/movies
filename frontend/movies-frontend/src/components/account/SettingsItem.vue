<template>
  <component
    :is="tag"
    class="settings-item"
    :class="{ disabled: disabled }"
    :tabindex="disabled ? '-1' : '0'"
    :aria-label="title"
    :aria-disabled="disabled"
    :role="ariaRole"
    :aria-checked="ariaChecked"
    @keydown.space.prevent
    @keyup.space.enter="handleClick(false)"
    @click="handleClick(true)"
  >
    <div class="description pl-1">
      <span class="description__title d-block">{{ title }}</span>
      <span class="description__subtitle d-block text-small" v-if="subtitle">{{ subtitle }}</span>
    </div>
    <div class="action">
      <span class="action__label text-small" v-if="actionLabel?.toString()">{{ actionLabel }}</span>
      <slot>
        <base-icon v-if="type === 'arrow'" aria-hidden="true" class="mr">
          <icon-chevron-right />
        </base-icon>
        <div
          v-else-if="type === 'switch'"
          class="switch mr-1"
          :class="{ checked: modelValue }"
          aria-hidden="true"
        >
          <span class="slider"></span>
        </div>
      </slot>
    </div>
  </component>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';
import BaseIcon from '@/components/base/BaseIcon.vue';
import IconChevronRight from '@/components/icons/IconChevronRight.vue';

export default defineComponent({
  name: 'SettingsItem',
  components: {
    BaseIcon,
    IconChevronRight,
  },
  props: {
    disabled: {
      type: Boolean,
      default: false,
    },
    title: {
      type: String,
      required: true,
    },
    subtitle: {
      type: String,
      required: false,
    },
    actionLabel: {
      type: [String, Number],
      required: false,
    },
    type: {
      type: String as PropType<'arrow' | 'switch'>,
      default: 'arrow',
    },
    modelValue: {
      // used with switch types
      type: Boolean,
      default: false,
    },
    tag: {
      type: String,
      default: 'div',
    },
  },
  computed: {
    ariaRole(): string {
      const hasSlotContent = !!this.$slots.default;
      if (hasSlotContent || this.type === 'arrow') {
        return 'menuitem';
      } else if (this.type === 'switch') {
        return 'menuitemcheckbox';
      }

      return 'menuitem';
    },
    ariaChecked(): string | null {
      if (this.type === 'switch') {
        return this.modelValue ? 'true' : 'false';
      }

      return null; // property is left out if modelValue is null
    },
  },
  methods: {
    handleClick(isMouseClick: boolean): void {
      if (this.type === 'switch') {
        this.$emit('update:modelValue', !this.modelValue);
      }
      if (!isMouseClick) {
        // we check for isMouseClick, so we don't emit a click event on mouseclicks,
        // as that is what we listen for when importing this component, and we don't want to trigger 2 mouseclick events
        this.$emit('click');
      }
    },
  },
});
</script>

<style lang="scss" scoped>
@use 'sass:math';
@import '@/design/variables/index.scss';
@import '@/design/mixins/index.scss';

.settings-item {
  padding-top: math.div($default-spacing, 2);
  padding-bottom: math.div($default-spacing, 2);
  display: flex;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;
  user-select: none;
  transition: background-color 0.125s ease-out;
  min-height: 66px;

  .description__subtitle,
  .action {
    color: rgba(0, 0, 0, 0.54);
  }

  .action {
    margin-left: $default-spacing;
    display: flex;
    align-items: center;

    &__label {
      line-height: 1;
    }
  }

  .switch {
    position: relative;
    display: inline-block;
    width: 44px;
    height: 22px;

    .slider {
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background-color: $gray-300;
      transition: background-color 0.2s;
      border-radius: 24px;

      &::before {
        position: absolute;
        content: '';
        height: 18px;
        width: 18px;
        left: 2px;
        bottom: 2px;
        background-color: $white;
        transition: transform 0.2s;
        border-radius: 50%;
      }
    }

    &.checked {
      .slider {
        background-color: $brand-primary;
        &::before {
          transform: translateX(22px);
        }
      }
    }
  }

  // states
  @include hover() {
    background-color: $gray-200;
  }

  &:active {
    background-color: $gray-300;

    .slider {
      background-color: $gray-400;
    }
  }

  &:focus-visible {
    //outline-offset: 4px;
  }

  &.disabled {
    pointer-events: none;
    cursor: default;
    color: rgba(0, 0, 0, 0.37);

    .description__subtitle,
    .action {
      color: inherit;
    }

    .slider {
      opacity: 0.57;
    }
  }
}
</style>
