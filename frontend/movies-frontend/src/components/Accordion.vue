<template>
  <div class="accordion" :id="id">
    <slot></slot>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { AccordionType } from '@/types/Accordion';

// accessibility reference: https://www.w3.org/TR/wai-aria-practices-1.1/examples/accordion/accordion.html

export default defineComponent({
  name: 'Accordion',
  props: {
    allowMultiple: {
      // whether or not multiple accordions should be allowed open at the same time
      type: Boolean,
      default: false,
    },
    id: {
      // id will be used to generate unique ids for all accordion headers and content
      type: String,
      required: true,
    },
    headingLevel: {
      // define which level headings should have inside accordion headers, so they fir correctly within the outline of the page
      type: String,
      default: 'h3',
    },
  },
  data() {
    return {
      Accordion: {
        count: 0, // amount of accordion-items in this accordion
        active: null, // the accordion-item index that is currently active
        allowMultiple: false,
        baseId: '',
        headingLevel: '',
      } as AccordionType,
    };
  },
  created() {
    this.Accordion.allowMultiple = this.allowMultiple;
    this.Accordion.baseId = this.id;
    this.Accordion.headingLevel = this.headingLevel;
  },
  provide() {
    return { Accordion: this.Accordion };
  },
});
</script>
