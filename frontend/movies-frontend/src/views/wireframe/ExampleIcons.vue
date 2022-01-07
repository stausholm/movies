<template>
  <div class="container">
    <h2>Icons</h2>
    <icons />
    <h3 class="mt-1">splat is assigned to ratings below 60% positive</h3>
    <base-icon>
      <icon-tomato-splat />
    </base-icon>

    <h3 class="mt-1">fresh is assigned to ratings at and above 60% positive</h3>
    <base-icon>
      <icon-tomato-fresh />
    </base-icon>

    <h3 class="mt-1">Icons can animate between each other either as "scale" or "rotate"</h3>
    <button class="btn btn--primary" @click="showAltIcon = !showAltIcon">toggle alt icon</button>
    <button class="btn btn--primary ml" @click="changeTransitionName">change transition</button>
    <span class="ml">{{ transitionName }}</span>
    <base-icon :transition="transitionName" width="50" height="50">
      <icon-github v-if="showAltIcon" />
      <icon-i-m-d-b v-else />
    </base-icon>

    <h3 class="mt-1">Default icon if no icon is added in base-icon</h3>
    <base-icon></base-icon>

    <h3 class="mt-1">Icon async component exists</h3>
    <base-icon-async name="Filmstrip" />
    <base-icon-async name="invalidName" />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import Icons from '@/components/icons/All.vue';
import BaseIcon from '@/components/base/BaseIcon.vue';
import BaseIconAsync from '@/components/base/BaseIconAsync.vue';
import IconGithub from '@/components/icons/IconGithub.vue';
import IconIMDB from '@/components/icons/IconIMDB.vue';
import IconTomatoSplat from '@/components/icons/IconTomatoSplat.vue';
import IconTomatoFresh from '@/components/icons/IconTomatoFresh.vue';

export default defineComponent({
  name: 'ExampleIcons',
  components: {
    Icons,
    BaseIcon,
    BaseIconAsync,
    IconGithub,
    IconIMDB,
    IconTomatoSplat,
    IconTomatoFresh,
  },
  data() {
    return {
      showAltIcon: false,
      transitionName: 'scale',
    };
  },
  methods: {
    changeTransitionName(): void {
      if (this.transitionName === 'scale') {
        this.transitionName = 'rotate';
      } else {
        this.transitionName = 'scale';
      }
    },
  },
});
</script>
