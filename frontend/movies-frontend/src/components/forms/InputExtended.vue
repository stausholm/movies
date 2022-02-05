<template>
  <input-wrapper
    :class="attributes.classes"
    :id="id"
    :description="description"
    :hasErrors="hasErrors"
    :errorMessage="errorMessage"
    :hideLabel="hideLabel"
    :label="label"
  >
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
          novalidate
        />
      </div>
      <span class="suffix fw-bold ml user-select-none" v-if="suffix">{{ suffix }}</span>
    </div>
  </input-wrapper>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import BaseIconAsync from '@/components/base/BaseIconAsync.vue';
import InputWrapper from '@/components/forms/InputWrapper.vue';

export default defineComponent({
  components: { BaseIconAsync, InputWrapper },
  inheritAttrs: false,
  name: 'InputExtended',
  props: {
    ...InputWrapper.props,
    modelValue: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      default: 'text',
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
    ...InputWrapper.computed,
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
</style>
