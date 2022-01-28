<template>
  <div class="form-group" :class="attributes.classes">
    <label :for="idFormatted" :class="{ 'visually-hidden': hideLabel }">{{ label }}</label>
    <div class="prefix-suffix-wrapper">
      <span class="prefix fw-bold mr user-select-none" v-if="prefix">{{ prefix }}</span>
      <div class="input-wrapper" :class="{ 'has-icon': icon }">
        <base-icon-async v-if="icon" :name="icon" :class="{ error: hasErrors }" />
        <input
          :type="type"
          :id="idFormatted"
          :aria-describedby="helperIdFormatted"
          :aria-invalid="hasErrors"
          :value="modelValue"
          :onInput="(event) => $emit('update:modelValue', event.target.value)"
          v-bind="attributes.rest"
        />
      </div>
      <span class="suffix fw-bold ml user-select-none" v-if="suffix">{{ suffix }}</span>
    </div>
    <span class="text-small d-block text-danger fw-bold" v-if="hasErrors && errorMessage">{{
      errorMessage
    }}</span>
    <span :id="helperIdFormatted" v-if="description" class="text-small d-block">{{
      description
    }}</span>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import BaseIconAsync from '@/components/base/BaseIconAsync.vue';

export default defineComponent({
  components: { BaseIconAsync },
  inheritAttrs: false,
  name: 'BaseInput',
  props: {
    modelValue: {
      type: String,
      required: true,
    },
    hideLabel: {
      type: Boolean,
      default: false,
    },
    label: {
      type: String,
      required: true,
    },
    id: {
      type: [String, Number],
      required: true,
    },
    type: {
      type: String,
      default: 'text',
    },
    description: {
      type: String,
      default: null,
    },
    hasErrors: {
      type: Boolean,
      default: null,
    },
    errorMessage: {
      type: String,
      default: null,
    },
    prefix: {
      type: String,
      default: null,
    },
    suffix: {
      type: String,
      default: null,
    },
    icon: {
      type: String,
      default: null,
    },
  },
  computed: {
    idFormatted(): string {
      return 'base-input--' + this.id;
    },
    helperIdFormatted(): string | null {
      if (this.description) {
        return 'base-input-helper--' + this.id;
      }
      return null;
    },
    attributes() {
      return { classes: this.$attrs.class, rest: { ...this.$attrs, class: '' } };
    },
  },
});
</script>

<style lang="scss" scoped>
@use 'sass:math';
@import '@/design/variables/index.scss';
@import '@/design/mixins/index.scss';

.form-group {
  .text-small:first-of-type {
    margin-top: math.div($default-spacing, 4);
  }

  .prefix-suffix-wrapper {
    display: flex;
    align-items: center;

    .prefix,
    .suffix {
      white-space: nowrap;
      color: $gray-500; // same as placeholder
    }
  }

  .input-wrapper {
    width: 100%;
    position: relative;

    .icon {
      position: absolute;
      pointer-events: none;
      top: 50%;
      transform: translateY(-50%);
      left: math.div($default-spacing, 2) + 2;

      &.error {
        color: $brand-danger;
      }
    }

    &.has-icon {
      input {
        padding-left: (math.div($default-spacing, 2) + $border-width-forms * 2) + 24px +
          math.div($default-spacing, 2);
      }
    }
  }
}
</style>
