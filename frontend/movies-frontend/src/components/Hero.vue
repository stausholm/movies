<template>
  <div class="hero">
    <div class="sticky-top">
      <base-button class="btn--rounded" @click="goBack" v-if="isMobileLayout">
        <span class="visually-hidden">Go back</span>
        <base-icon>
          <icon-arrow-left />
        </base-icon>
      </base-button>
      <span class="fw-bold" aria-hidden="true">{{ title }}</span>
      <base-button v-if="actions && actions.length === 1 && actions[0].icon" class="btn--rounded">
        <base-icon-async :name="actions[0].icon" />
      </base-button>
      <context-menu-button v-else-if="actions && actions.length" :actions="actions" />
    </div>
    <slot>
      <div class="container">
        <span class="text-pre-head">lorem ipsum</span>
        <h1>{{ title }}</h1>
      </div>
    </slot>
    <div class="sticky-content" v-if="$slots.stickyContent">
      <slot name="stickyContent"></slot>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import BaseButton from '@/components/base/BaseButton.vue';
import BaseIcon from '@/components/base/BaseIcon.vue';
import BaseIconAsync from '@/components/base/BaseIconAsync.vue';
import IconArrowLeft from '@/components/icons/IconArrowLeft.vue';
import ContextMenuButton from '@/components/ContextMenuButton.vue';
import { AppLayoutSizeWidth } from '@/store/app/types';

export default defineComponent({
  components: { BaseButton, BaseIcon, BaseIconAsync, IconArrowLeft, ContextMenuButton },
  name: 'Hero',
  props: {
    showBackButton: {
      type: Boolean,
      default: false,
    },
    actions: {
      type: Array,
      required: false,
    },
    title: {
      type: String,
      required: true,
    },
  },
  data() {
    return {};
  },
  computed: {
    isMobileLayout(): boolean {
      return this.$store.getters.layoutSizeWidth === ('mobile' as AppLayoutSizeWidth);
    },
  },
  methods: {
    goBack(): void {
      // only go back if we have a page to go back to. Otherwise go to the frontpage
      window.history.length > 1 && window.history.state.back
        ? this.$router.go(-1)
        : this.$router.push({ name: 'Home' });
    },
  },
});
</script>
