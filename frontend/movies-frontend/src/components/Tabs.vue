<template>
  <div class="tabs" :id="id">
    <ul class="tabs__headers" role="tablist">
      <li role="presentation" v-for="(tab, index) in Tabs.tabs" :key="tab.title">
        <component :is="headingLevel" class="m-0 heading">
          <button
            class="tab-header text-small fw-bold"
            role="tab"
            :id="tab.headerId"
            :aria-controls="tab.contentId"
            :aria-selected="Tabs.active === index"
            :tabindex="Tabs.active === index ? 0 : -1"
            :aria-setsize="Tabs.count"
            :aria-posinset="index + 1"
            :data-pushtip="hideTitles ? tab.title : null"
            :ref="setButtonRef"
            @click="openTab(index, tab.contentId)"
            @keydown.left.prevent
            @keydown.right.prevent
            @keydown.home.prevent
            @keydown.end.prevent
            @keyup.left="handleLeft"
            @keyup.right="handleRight"
            @keyup.home="focusFirst"
            @keyup.end="focusLast"
          >
            <base-icon-async
              v-if="tab.icon"
              :name="tab.icon"
              :width="hideTitles ? 24 : 18"
              :height="hideTitles ? 24 : 18"
            />
            <span :class="hideTitles ? 'visually-hidden title' : 'title'">{{ tab.title }}</span>
          </button>
        </component>
      </li>
    </ul>
    <div class="tabs__panels">
      <slot />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { TabsType } from '@/types/Tabs';
import BaseIconAsync from '@/components/base/BaseIconAsync.vue';

// accessibility references:
// https://bbc.github.io/gel/components/tabs/
// https://www.w3.org/TR/wai-aria-practices/examples/tabs/tabs-2/tabs.html
// https://inclusive-components.design/tabbed-interfaces/

export default defineComponent({
  name: 'Tabs',
  components: {
    BaseIconAsync,
  },
  props: {
    id: {
      // id will be used to generate unique ids for all tab headers and content
      type: String,
      required: true,
    },
    headingLevel: {
      // define which level headings should have inside tab headers, so they fit correctly within the outline of the page
      type: String,
      default: 'h3',
    },
    hideTitles: {
      // Used if tab headers should only visually show an icon
      type: Boolean,
      default: false,
    },
    activeOnCreated: {
      // define which tab should be the one open onCreated.
      type: Number,
      default: 0,
    },
    transition: {
      // optional transition to use when transition between tabpanels
      type: String,
      default: '',
    },
  },
  data() {
    return {
      Tabs: {
        count: 0, // amount of Tab components in this Tabs component
        active: null, // the Tab component index that is currently active
        baseId: '',
        tabs: [],
        transition: '',
      } as TabsType,
      buttonRefs: [] as HTMLButtonElement[],
    };
  },
  methods: {
    openTab(index: number, contentId: string): void {
      this.Tabs.active = index;
      // move focus into the now activated tab
      this.$nextTick(() => {
        this.$el.querySelector('#' + contentId).focus();
      });
    },
    setButtonRef(el: HTMLButtonElement) {
      if (el) {
        this.buttonRefs.push(el);
      }
    },
    handleLeft(ev: KeyboardEvent) {
      const elIndex = this.buttonRefs.findIndex((x) => x === ev.target);
      if (elIndex === 0) {
        // wrap around to the last
        this.focusLast();
      } else {
        this.buttonRefs[elIndex - 1].focus();
      }
    },
    handleRight(ev: KeyboardEvent) {
      const elIndex = this.buttonRefs.findIndex((x) => x === ev.target);
      if (elIndex === this.buttonRefs.length - 1) {
        // wrap around to the first
        this.focusFirst();
      } else {
        this.buttonRefs[elIndex + 1].focus();
      }
    },
    focusFirst() {
      this.buttonRefs[0].focus();
    },
    focusLast() {
      this.buttonRefs[this.buttonRefs.length - 1].focus();
    },
  },
  created() {
    this.Tabs.baseId = this.id;
    this.Tabs.active = this.activeOnCreated;
    this.Tabs.transition = this.transition;
  },
  provide() {
    return { Tabs: this.Tabs };
  },
});
</script>

<style lang="scss" scoped>
@use 'sass:math';
@import '@/design/variables/index.scss';
@import '@/design/mixins/index.scss';

.tabs {
  &__headers {
    margin: 0;
    padding: 0;
    list-style-type: none;
    display: flex;

    li {
      flex: 1;
      width: 100%;
    }

    .heading {
      text-align: center;
      display: flex;
      justify-content: center;
      align-items: center;
      margin: 0;
      padding: 0;
    }
  }

  &__panels {
    position: relative;
  }
}

.tab-header {
  border: 0;
  border-top: $border-width-base solid transparent;
  border-bottom: $border-width-base solid transparent;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: $min-touch-target-size;
  padding: math.div($default-spacing, 2);
  margin: 0;
  background-color: $white;
  color: inherit;
  transition: background-color 0.2s ease-out, color 0.2s ease-out, border-color 0.2s ease-out;
  user-select: none;

  .icon + .title {
    margin-left: math.div($default-spacing, 2);
  }

  &[aria-selected='true'] {
    border-bottom-color: $brand-primary;
    color: $brand-primary;
  }

  @include hover() {
    background-color: $gray-200;
  }

  &:active {
    background-color: $gray-300;
  }
}
</style>
