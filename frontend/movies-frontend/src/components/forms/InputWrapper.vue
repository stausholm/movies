<template>
  <div class="form-group">
    <label :for="idFormatted" :class="{ 'visually-hidden': hideLabel }">{{ label }}</label>
    <slot />
    <div
      class="input-helper"
      :id="helperIdFormatted"
      v-if="description || (hasErrors && errorMessage)"
    >
      <span
        class="text-small d-block text-danger fw-bold"
        v-if="hasErrors && errorMessage"
        role="alert"
      >
        {{ errorMessage }}
      </span>
      <span v-if="description" class="text-small d-block">{{ description }}</span>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'InputWrapper',
  props: {
    id: {
      type: [String, Number],
      required: true,
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
    hideLabel: {
      type: Boolean,
      default: false,
    },
    label: {
      type: String,
      required: true,
    },
  },
  computed: {
    idFormatted(): string {
      return 'base-input--' + this.id;
    },
    helperIdFormatted(): string | null {
      if (this.description || (this.hasErrors && this.errorMessage)) {
        return 'base-input-helper--' + this.id;
      }
      return null;
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
}
</style>
