<template>
  <transition :name="Tabs.transition" :css="!!Tabs.transition">
    <section
      class="tab"
      tabindex="-1"
      role="tabpanel"
      :id="contentId"
      :aria-labelledby="headerId"
      :aria-hidden="!active"
      v-show="active"
    >
      <slot />
    </section>
  </transition>
</template>

<script lang="ts">
import { defineComponent, inject } from 'vue';
import { TabsType } from '@/types/Tabs';

export default defineComponent({
  name: 'Tab',
  emits: ['active', 'unactive'],
  setup() {
    const Tabs = inject('Tabs') as TabsType;

    return {
      Tabs,
    };
  },
  props: {
    // these props are rendered in the parent Tabs component
    title: {
      type: String,
      required: true,
    },
    icon: {
      type: String,
    },
  },
  data() {
    return {
      index: -1,
      headerId: '',
      contentId: '',
    };
  },
  computed: {
    active(): boolean {
      return this.index === this.Tabs.active;
    },
  },
  created() {
    this.index = this.Tabs.count++;
    this.headerId = `__tab-h--${this.Tabs.baseId}-${this.index}`;
    this.contentId = `__tab-c--${this.Tabs.baseId}-${this.index}`;

    this.Tabs.tabs.push({
      title: this.title,
      icon: this.icon,
      headerId: this.headerId,
      contentId: this.contentId,
    });
  },
  watch: {
    active(isActive) {
      if (isActive) {
        this.$emit('active');
      } else {
        this.$emit('unactive');
      }
    },
  },
});
</script>

<style lang="scss" scoped>
.tab {
  &[class*='-leave-active'],
  &[class*='-leave-to'] {
    // make sure all vue transitions wont push the leaving Tab vertically below the entering Tab
    position: absolute;
    top: 0;
  }
}
</style>
