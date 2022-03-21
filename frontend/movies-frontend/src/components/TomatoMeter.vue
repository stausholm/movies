<template>
  <div v-if="tomatoRating" class="tomato-meter">
    <base-icon>
      <icon-tomato-splat v-if="showSplat" />
      <icon-tomato-fresh v-else />
    </base-icon>
    <span class="tomato-meter__label">
      {{ tomatoRating.value }}
    </span>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';
import Video from '@/types/Video';
import BaseIcon from '@/components/base/BaseIcon.vue';
import IconTomatoFresh from '@/components/icons/IconTomatoFresh.vue';
import IconTomatoSplat from '@/components/icons/IconTomatoSplat.vue';

export default defineComponent({
  components: {
    BaseIcon,
    IconTomatoFresh,
    IconTomatoSplat,
  },
  name: 'TomatoMeter',
  props: {
    video: {
      type: Object as PropType<Video>,
      required: true,
    },
  },
  computed: {
    tomatoRating() {
      return this.video.ratings.find((x) => x.source === 'Rotten Tomatoes');
    },
    showSplat() {
      return parseInt(this.tomatoRating?.value) < 60;
    },
  },
});
</script>

<style lang="scss" scoped>
@use 'sass:math';
@import '@/design/variables/index.scss';
@import '@/design/mixins/index.scss';

.tomato-meter {
  display: flex;
  align-items: center;

  &__label {
    margin-left: math.div($default-spacing, 4);
    line-height: 1;
  }
}
</style>
