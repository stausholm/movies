<template>
  <div class="">
    <img src="TODO" alt="" class="fade-up" />
    <h1 class="text-center mt">Why?</h1>
    <ul class="">
      <!-- TODO: make pretty -->
      <li>Filter and sort based on your viewing preferences</li>
      <li>Easily save and browse your favourites</li>
      <li>Easy shortcuts to dive deeper into your content</li>
      <li>Customize the app experience to your liking</li>
    </ul>
    <div class="d-flex justify-end">
      <button class="btn btn--primary btn--responsive" @click="$emit('next')">Great!</button>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'OnboardingStep2',
});
</script>
