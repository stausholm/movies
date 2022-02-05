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
    <textarea
      :id="idFormatted"
      :aria-describedby="helperIdFormatted"
      :aria-invalid="hasErrors"
      :value="modelValue"
      @input="handleInput"
      v-bind="attributes.rest"
      ref="textarea"
    ></textarea>
  </input-wrapper>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import InputWrapper from '@/components/forms/InputWrapper.vue';

export default defineComponent({
  name: 'TextareaExtended',
  inheritAttrs: false,
  components: {
    InputWrapper,
  },
  props: {
    ...InputWrapper.props,
    modelValue: {
      type: String,
      required: true,
    },
    autoGrow: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    ...InputWrapper.computed,
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
