<template>
  <layout>
    <hero-app :showBackButton="true" :slim="true" />
    <div class="container">
      <ul>
        <li>Pressing the search icon twice will focus the search input</li>
        <li>pressing ctrl+k will open a quick access menu</li>
        <li>Adjust saturation of images in conjunction with dark themes</li>
        <li>Use swipe gestures to perform actions on mobile</li>
        <li>Switch between different list display modes</li>
        <li>
          Developer mode can be toggled by clicking the version number found on the About page
        </li>
      </ul>
      <p class="text-small mt">
        * Photos shown may not have been taken using the depicted products. Actual products and
        screens may vary from what you see on your device.
      </p>
    </div>
  </layout>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import Layout from '@/layouts/Main.vue';
import HeroApp from '@/components/HeroApp.vue';

export default defineComponent({
  name: 'Tips',
  components: {
    Layout,
    HeroApp,
  },
});
</script>
