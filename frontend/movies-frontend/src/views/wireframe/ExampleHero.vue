<template>
  <div class="">
    <hero-delightful bgImage="/img/icons/android-chrome-512x512.png">
      <div class="">
        <h2>A delightful hero block</h2>
        <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit.</p>
        <button class="btn">A button</button>
      </div>
    </hero-delightful>

    <hero :background="['gray', 'gradient', 'fade']">
      <h2>hero content</h2>
      <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit.</p>
      <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit.</p>
      <button class="btn">A button</button>
    </hero>
    <hero :background="['primary', 'image', 'fade']" bgImage="/img/posters/tt0085959_SX600.jpg">
      <h2>hero content</h2>
      <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit.</p>
      <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit.</p>
      <button class="btn">A button</button>
    </hero>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import HeroDelightful from '@/components/HeroDelightful.vue';
import Hero from '@/components/Hero.vue';

export default defineComponent({
  name: 'ExampleHero',
  components: {
    HeroDelightful,
    Hero,
  },
  data() {
    return {};
  },
  methods: {},
});
</script>
