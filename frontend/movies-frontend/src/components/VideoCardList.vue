<template>
  <div class="video-card-list">
    TODO
    <ul>
      <li v-for="video in videos" :key="video.imdbId">
        <video-card :video="video" />
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';
import Video from '@/types/Video';
import VideoCard from '@/components/VideoCard.vue';

export default defineComponent({
  name: 'VideoCardList',
  components: {
    VideoCard,
  },
  props: {
    videos: {
      type: Array as PropType<Video[]>,
      required: true,
    },
  },
});
</script>
