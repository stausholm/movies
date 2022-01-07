<template>
  <div class="container">
    <h2>Sparkles</h2>
    <sparkles>wow some text</sparkles>
    <br />
    <br />
    <sparkles :colors="['#fff']" :maxSize="30" sparkleType="random">
      <img src="a" alt="" />
    </sparkles>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import Sparkles from '@/components/Sparkles.vue';

export default defineComponent({
  name: 'ExampleSparkles',
  components: {
    Sparkles,
  },
  data() {
    return {};
  },
});
</script>
