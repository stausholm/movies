<template>
  <div class="">
    <img src="../../assets/logo-badge-overflowing.svg" :alt="appName + ' logo'" class="fade-up" />
    <h1 class="text-center mt-2">Welcome to {{ appName }}!</h1>
    <p>Your goto place for browsing your movies and series.</p>

    <label for="languagepicker">Language</label>
    <select name="language" id="languagepicker" class="mb-1">
      <option value="TODO">TODO</option>
    </select>
    <div class="d-flex justify-end">
      <button class="btn btn--primary btn--responsive" @click="$emit('next')">Get started</button>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { APP_NAME } from '@/constants/SiteSettings.json';

export default defineComponent({
  name: 'OnboardingStep1',
  data() {
    return {
      appName: APP_NAME,
    };
  },
});
</script>
