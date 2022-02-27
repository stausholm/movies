<!-- this wrapper <div> is required. otherwise this child <router-view> 
would be a direct child of the main <router-view> in app.vue 
and the route transitions from that router-view would 
for some odd reason also be applied to this child router-view -->
<template>
  <div class="child-router-view">
    <router-view v-slot="{ Component, route }">
      <transition :name="transitionName" :mode="transitionMode" @after-leave="afterLeave">
        <keep-alive v-if="keepAlive">
          <component :is="Component" :key="route.path" />
        </keep-alive>
        <component v-else :is="Component" :key="route.path" />
      </transition>
    </router-view>
  </div>
</template>

<script lang="ts">
import { AppLayoutSizeWidth } from '@/store/app/types';
import { defineComponent } from 'vue';
import { triggerScrollEvent } from '@/router/utils';

export default defineComponent({
  name: 'ChildRouterView',
  props: {
    useAlternativeTransition: {
      type: Boolean,
      default: false,
    },
    keepAlive: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      transitionName: 'router-slide-mobile-left',
      transitionMode: 'out-in',
    };
  },
  methods: {
    afterLeave() {
      triggerScrollEvent();
    },
  },
  watch: {
    $route(to, from) {
      const toDepth = to.path.split('/').length;
      const fromDepth = from.path.split('/').length;

      if (this.$store.getters.layoutSizeWidth !== ('desktop' as AppLayoutSizeWidth)) {
        if (this.useAlternativeTransition) {
          this.transitionMode = 'out-in';
          this.transitionName =
            toDepth < fromDepth ? 'router-fade-left-fast' : 'router-fade-right-fast';
        } else {
          this.transitionMode = toDepth < fromDepth ? 'out-in' : '';
          this.transitionName =
            toDepth < fromDepth ? 'router-fade-left-fast' : 'router-slide-mobile-left';
        }
      } else {
        this.transitionMode = 'out-in';
        this.transitionName = toDepth < fromDepth ? 'router-fade-left' : 'router-fade-right';
      }
    },
  },
});
</script>
