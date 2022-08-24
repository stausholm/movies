<template>
  <div class="container">
    <h2>Loaders</h2>
    <h3>Loader</h3>
    <button @click="showLoader = !showLoader">toggle loader</button>
    <loader
      v-if="showLoader"
      :size="48"
      message="optional loading message"
      class="d-flex justify-center flex-column align-center"
    />
    <h3 class="mt-2">LoaderLogo</h3>
    <loader-logo :duration="3" :message="logoMessage" @completed="finishLoad" :size="256" />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import Loader from '@/components/Loader.vue';
import LoaderLogo from '@/components/LoaderLogo.vue';

export default defineComponent({
  name: 'ExampleLoader',
  components: {
    Loader,
    LoaderLogo,
  },
  data() {
    return {
      showLoader: true,
      logoMessage: 'Logo loader loading',
    };
  },
  methods: {
    finishLoad() {
      this.logoMessage = 'finished loading';
    },
  },
});
</script>
