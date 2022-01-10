<template>
  <div class="accordion__item" :class="{ 'accordion__item--active': visible }">
    <div class="accordion__header">
      <component :is="headingLevel" class="heading m-0">
        <button
          class="text-big"
          :aria-expanded="visible"
          :id="idFormatted.header"
          :aria-controls="idFormatted.content"
          @click="open"
        >
          <base-icon-async v-if="icon" :name="icon" class="icon-custom" />
          <span class="text">
            <slot name="header">{{ title }}</slot>
          </span>
          <base-icon transition="scale" class="icon-chevron">
            <icon-chevron-up v-if="visible" />
            <icon-chevron-down v-else />
          </base-icon>
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
import { defineComponent, inject } from 'vue';
import { AccordionType } from '@/types/Accordion';
import BaseIconAsync from '@/components/base/BaseIconAsync.vue';
import BaseIcon from '@/components/base/BaseIcon.vue';
import IconChevronDown from '@/components/icons/IconChevronDown.vue';
import IconChevronUp from '@/components/icons/IconChevronUp.vue';

export default defineComponent({
  components: { BaseIconAsync, BaseIcon, IconChevronDown, IconChevronUp },
  name: 'AccordionItem',
  // setup() method is needed for injection, in order to make it work with typescript
  // inject: ['Accordion'],
  setup() {
    const Accordion = inject('Accordion') as AccordionType;

    return {
      Accordion,
    };
  },
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
    icon: {
      type: String,
    },
  },
  data() {
    return {
      index: null as null | number,
      visibleInternal: false, // used for keeping track of the open state of the accordion-item, if 'allowMultiple' is set on the parent accordion component
    };
  },
  computed: {
    visible(): boolean {
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

<style lang="scss">
@use 'sass:math';
@import '@/design/variables/index.scss';
@import '@/design/mixins/index.scss';

.accordion__item {
  border-radius: $border-radius-base;
  background-color: $white;
  box-shadow: $box-shadow-sm;

  + .accordion__item {
    margin-top: math.div($default-spacing, 2);
  }
}
.accordion__header {
  button {
    display: flex;
    align-items: center;
    width: 100%;
    min-height: $min-touch-target-size;
    cursor: pointer;
    text-decoration: none;
    box-sizing: border-box;
    border: none;
    line-height: 1;
    vertical-align: middle;
    border-radius: $border-radius-base;
    font-weight: bold;
    -webkit-appearance: none;
    -webkit-tap-highlight-color: transparent;
    text-align: left;
    color: inherit;
    background-color: $gray-400;
    padding: $default-spacing;
    transition-duration: 150ms;
    transition-timing-function: ease-out;
    transition-property: color, background-color, outline-offset, border-radius;

    @include prefers-reduced-motion() {
      transition-property: color, background-color;
    }

    // states
    @include hover() {
      // color: ;
      background-color: $gray-500;
    }

    &:active {
      // color: ;
      background-color: $gray-600;
    }

    // style overwrites for header when accordion is open
    &[aria-expanded='true'] {
      border-bottom-left-radius: 0;
      border-bottom-right-radius: 0;
    }

    // when focus is triggered by keyboard navigation
    &:focus-visible {
      outline-offset: 4px;
    }
    // when focus is triggered by something that is NOT keyboard navigation
    &:focus:not(:focus-visible) {
      outline: none;
    }

    .text {
      flex: 1;
    }

    .icon {
      min-width: 24px;
      user-select: none;
      pointer-events: none;
    }
    .icon-custom {
      // icon is more visually heavy, so we make the button padding visually smaller on the icon side
      margin-left: math.div(-$default-spacing, 4);
      margin-right: math.div($default-spacing, 2);
    }
    .icon-chevron {
      // icon is more visually heavy, so we make the button padding visually smaller on the icon side
      margin-right: math.div(-$default-spacing, 4);
      margin-left: $default-spacing;
    }
  }
}
.accordion__content {
  > div {
    padding: $default-spacing;

    > *:last-child {
      margin-bottom: 0 !important;
    }
  }
}

// transitions
.accordion-enter-active,
.accordion-leave-active {
  will-change: height, opacity;
  transition: height 0.3s $ease-in-out-cubic, opacity 0.3s $ease-in-out-cubic;
  overflow: hidden;
}
.accordion-enter-from,
.accordion-leave-to {
  height: 0 !important;
  opacity: 0;
}
</style>
