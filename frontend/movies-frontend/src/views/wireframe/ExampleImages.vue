<template>
  <div class="container">
    <h2>Images</h2>
    <p>
      Lazyloaded images using loading="lazy" with intersectionObserver fallback in unsupported
      browsers
    </p>
    <h3 class="h4">
      Image without ratio will work, but create a layoutshift once the image loads, unless the image
      height is handled with css
    </h3>
    <lazy-image src="/img/posters/tt0085959_SX600.jpg" alt="alt tekst" class="mb-2" />
    <lazy-image src="/img/posters/tt0085959_SX600.jpg" alt="alt tekst" style="height: 200px" />
    <base-spacer :size="200" />
    <h3 class="mt-2 h4">Example with src prop</h3>
    <lazy-image ratio="16:9" src="/img/posters/tt0085959_SX100.jpg" alt="alt tekst" />
    <h3 class="mt-2 h4">Example with broken image</h3>
    <lazy-image ratio="16:9" src="/img/asd" alt="alt tekst" />
    <h3 class="mt-2 h4">Example with sources prop and one broken image at a breakpoint</h3>
    <lazy-image ratio="16:9" :sources="sources" alt="alt tekst" />
    <base-spacer :size="100" />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import LazyImage from '@/components/LazyImage.vue';
import BaseSpacer from '@/components/base/BaseSpacer.vue';

export default defineComponent({
  name: 'ExampleToast',
  components: {
    LazyImage,
    BaseSpacer,
  },
  data() {
    return {
      sources: [
        '/img/posters/tt0085959_SX100.jpg',
        '/img/posters/tt0085959_SX300.jpg',
        null,
        'broken',
        null,
        '/img/posters/tt0085959_SX600.jpg',
      ],
    };
  },
  methods: {},
});
</script>
