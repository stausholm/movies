<template>
  <div class="form-group" :class="attributes.classes">
    <label :for="idFormatted" :class="{ 'visually-hidden': hideLabel }">{{ label }}</label>
    <textarea
      :id="idFormatted"
      :aria-describedby="helperIdFormatted"
      :aria-invalid="hasErrors"
      :value="modelValue"
      @input="handleInput"
      v-bind="attributes.rest"
      ref="textarea"
    ></textarea>
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

export default defineComponent({
  name: 'TextareaCustom',
  inheritAttrs: false,
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
    autoGrow: {
      type: Boolean,
      default: false,
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
  methods: {
    handleInput(): void {
      const el = this.$refs.textarea as HTMLTextAreaElement;
      const val = el.value;
      this.$emit('update:modelValue', val);

      if (this.autoGrow) {
        // Alternative pure CSS variant: https://css-tricks.com/the-cleanest-trick-for-autogrowing-textareas/
        const {
          lineHeight,
          width,
          padding,
          border,
          boxSizing,
          fontSize,
          fontFamily,
          letterSpacing,
          whiteSpace,
        } = window.getComputedStyle(el);

        const fakeEl = document.createElement('div');
        // + ' ' space character is a weird hack that seems to cause the linebreak behaviour of the textarea to be respected.
        // Without it, a scrollbar would appear when user created a newline by pressing enter
        fakeEl.textContent = val + ' ';
        fakeEl.setAttribute(
          'style',
          `
          position: absolute;
          float: left;
          line-height: ${lineHeight};
          visibility: hidden;
          font-family: ${fontFamily};
          font-size: ${fontSize};
          letter-spacing: ${letterSpacing};
          width: ${width};
          padding: ${padding};
          border: ${border};
          box-sizing: ${boxSizing};
          white-space: ${whiteSpace};
          `
        );

        document.body.appendChild(fakeEl);
        const textareaContentHeight = fakeEl.offsetHeight;
        fakeEl.remove();

        el.style.height = textareaContentHeight + 'px';
      }
    },
  },
  mounted() {
    if (this.modelValue && this.autoGrow) {
      // set size on mount
      this.handleInput();
    }
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
