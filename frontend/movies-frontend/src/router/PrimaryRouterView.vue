<template>
  <router-view v-slot="{ Component }">
    <transition :name="transitionName" mode="out-in" @after-leave="afterLeave">
      <component :is="Component" />
    </transition>
  </router-view>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { triggerScrollEvent } from '@/router/index';

export default defineComponent({
  data() {
    return {
      transitionName: 'route-primary',
    };
  },
  methods: {
    afterLeave(): void {
      triggerScrollEvent();
    },
  },
});
</script>
