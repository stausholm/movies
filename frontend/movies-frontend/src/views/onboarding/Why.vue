<template>
  <div class="">
    <img src="../../assets/question-graphic.svg" alt="" class="fade-up" />
    <h1 class="text-center mt">Why?</h1>
    <icon-list class="mt-2 mb-2">
      <icon-list-item>Filter and sort based on your viewing preferences</icon-list-item>
      <icon-list-item>Easily save and browse your favourites</icon-list-item>
      <icon-list-item>Easy shortcuts to dive deeper into your content</icon-list-item>
      <icon-list-item>Customize the app experience to your liking</icon-list-item>
    </icon-list>
    <div class="d-flex justify-end">
      <button class="btn btn--primary btn--responsive" @click="$emit('next')">Great!</button>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import IconList from '@/components/IconList.vue';
import IconListItem from '@/components/IconListItem.vue';

export default defineComponent({
  name: 'OnboardingStep2',
  components: {
    IconList,
    IconListItem,
  },
});
</script>
