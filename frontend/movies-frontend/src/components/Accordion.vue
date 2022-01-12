<template>
  <ul
    v-if="showControls && allowMultiple"
    class="accordion-controls"
    aria-label="Accordion section controls"
  >
    <li class="mr-1">
      <button @click="expandAll" class="btn btn--link">
        Expand all <span class="visually-hidden">{{ Accordion.count }}</span>
      </button>
    </li>
    <li class="">
      <button @click="collapseAll" class="btn btn--link">
        Collapse all <span class="visually-hidden">{{ Accordion.count }}</span>
      </button>
    </li>
  </ul>
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
    showControls: {
      type: Boolean,
      default: false,
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
  methods: {
    collapseAll(): void {
      this.Accordion.active = [];
    },
    expandAll(): void {
      this.Accordion.active = [...Array(this.Accordion.count).keys()];
    },
  },
  created() {
    this.Accordion.allowMultiple = this.allowMultiple;
    this.Accordion.baseId = this.id;
    this.Accordion.headingLevel = this.headingLevel;
    if (this.allowMultiple) {
      this.Accordion.active = [];
    }
    if (!this.allowMultiple && this.showControls) {
      console.error('controls only supported with allowMultiple=true');
    }
  },
  provide() {
    return { Accordion: this.Accordion };
  },
});
</script>

<style lang="scss">
.accordion-controls {
  list-style-type: none;
  padding: 0;
  margin: 0;
  display: flex;
  justify-content: flex-end;

  .btn {
    padding-left: 0;
    padding-right: 0;
  }
}
</style>
