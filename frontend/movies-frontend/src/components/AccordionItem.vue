<template>
  <div class="accordion__item" :class="{ 'accordion__item--active': visible }">
    <div class="accordion__header">
      <component :is="headingLevel">
        <button
          @click="open"
          :aria-expanded="visible"
          :id="idFormatted.header"
          :aria-controls="idFormatted.content"
        >
          <slot name="header">{{ title }}</slot>
        </button>
      </component>
    </div>

    <transition
      name="accordion"
      @enter="start"
      @after-enter="end"
      @before-leave="start"
      @after-leave="end"
    >
      <div
        class="accordion__content"
        v-show="visible"
        :id="idFormatted.content"
        role="region"
        :aria-labelledby="idFormatted.header"
        :aria-hidden="!visible"
      >
        <div>
          <!-- This slot will handle all the content that is passed to the accordion -->
          <slot></slot>
        </div>
      </div>
    </transition>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

// TODO: handle downarrow, uparrow, home, and End buttons

export default defineComponent({
  name: 'AccordionItem',
  inject: ['Accordion'],
  props: {
    expandOnCreated: {
      // open this accordion-item once it's created
      type: Boolean,
      default: false,
    },
    title: {
      type: String,
      default: '',
    },
  },
  data() {
    return {
      index: null,
      visibleInternal: false, // used for keeping track of the open state of the accordion-item, if 'allowMultiple' is set on the parent accordion component
    };
  },
  computed: {
    visible() {
      if (this.Accordion.allowMultiple) {
        return this.visibleInternal;
      }
      return this.index === this.Accordion.active;
    },
    headingLevel() {
      return this.Accordion.headingLevel;
    },
    idFormatted(): { header: string; content: string } {
      return {
        header: `__acc-h--${this.Accordion.baseId}-${this.index}`,
        content: `__acc-c--${this.Accordion.baseId}-${this.index}`,
      };
    },
  },
  methods: {
    open() {
      this.visibleInternal = !this.visibleInternal;

      if (this.visible || this.Accordion.allowMultiple) {
        this.Accordion.active = null;
      } else {
        this.Accordion.active = this.index;
      }
    },
    start(el: HTMLElement) {
      // animation
      el.style.height = `${el.scrollHeight}px`;
    },
    end(el: HTMLElement) {
      // animation
      el.style.height = '';
    },
  },
  created() {
    this.index = this.Accordion.count++;
    if (this.expandOnCreated) {
      this.open();
    }
  },
});
</script>
