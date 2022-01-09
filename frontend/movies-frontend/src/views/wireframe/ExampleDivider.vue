<template>
  <div class="container">
    <h2>Dividers</h2>
    <h3 class="mt-2 h4">Divider</h3>
    <divider />

    <h3 class="mt-2 h4">Divider hairline</h3>
    <divider hairline />

    <h3 class="mt-2 h4">Divider dashed</h3>
    <divider dashed />

    <h3 class="mt-2 h4">Divider padded</h3>
    <divider padded />

    <h3 class="mt-2 h4">Divider content + padded + dashed</h3>
    <divider dashed padded label="lorem ipsum dolor" />

    <h3 class="mt-2 h4">Divider content</h3>
    <divider label="lorem ipsum dolor" />

    <h3 class="mt-2 h4">Divider content right</h3>
    <divider label="lorem ipsum dolor" labelPosition="right" />

    <h3 class="mt-2 h4">Divider content left</h3>
    <divider label="lorem ipsum dolor" labelPosition="left" />

    <h3 class="mt-2 h4">Divider content long</h3>
    <divider
      label="Lorem ipsum dolor sit amet consectetur adipisicing elit. Ex tempore exercitationem quo nulla beatae perspiciatis accusantium. Facilis nemo eius iusto maxime iste voluptas, odio alias ipsam velit voluptatem minima reiciendis!"
    />

    <h3 class="mt-2 h4">Divider content right</h3>
    <divider
      label="Lorem ipsum dolor sit amet consectetur adipisicing elit. Ex tempore exercitationem quo nulla beatae perspiciatis accusantium. Facilis nemo eius iusto maxime iste voluptas, odio alias ipsam velit voluptatem minima reiciendis!"
      labelPosition="right"
    />

    <h3 class="mt-2 h4">Divider content left</h3>
    <divider
      label="Lorem ipsum dolor sit amet consectetur adipisicing elit. Ex tempore exercitationem quo nulla beatae perspiciatis accusantium. Facilis nemo eius iusto maxime iste voluptas, odio alias ipsam velit voluptatem minima reiciendis!"
      labelPosition="left"
    />

    <h3 class="mt-2 h4">Divider custom styles</h3>
    <divider style="color: blue; border-color: blue" label="lorem ipsum dolor" />

    <h3>Sample usage</h3>
    <div class="bg-white p-1 shadow rounded mb-2" style="max-width: 300px">
      <router-link to="/register" class="btn btn--primary flex-column">
        <strong>Save your content</strong>
        <img src="/img/icons/android-chrome-512x512.png" alt="" />
        <strong>Sign up</strong>
      </router-link>
      <divider label="or" />
      <router-link to="/login" class="btn btn--primary btn--block" style="opacity: 0.75"
        >Login</router-link
      >
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import Divider from '@/components/Divider.vue';

export default defineComponent({
  name: 'ExampleDivider',
  components: {
    Divider,
  },
  data() {
    return {};
  },
  methods: {},
});
</script>
