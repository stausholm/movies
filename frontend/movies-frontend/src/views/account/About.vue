<template>
  <div class="">
    <h1>About</h1>
    <p>
      <b>{{ appName }}</b> is all about Lorem ipsum dolor sit amet consectetur adipisicing elit.
      Eius enim asperiores omnis nemo laborum cupiditate sunt ducimus, vero dignissimos porro. Id
      dolore, molestias facilis perferendis rem ipsam incidunt. A, error?
    </p>
    <p>
      <b>{{ appName }}</b> is a <i>progressive web application</i> built with <b>Vue.js</b>
    </p>
    <p>
      The codebase is open source and available on
      <a :href="appCodeUrl">GitHub</a>
    </p>
    <nav>
      <router-link to="/account/about/credits">Credits</router-link>
      <router-link to="/licenses">Licenses</router-link>
      <router-link to="/privacy-policy">Privacy Policy</router-link>
      <router-link to="/tos">Terms of Service</router-link>
    </nav>
    <p class="text-small">{{ appVersion }}</p>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'About',
  data() {
    return {
      appName: 'TODO',
      appVersion: 'TODO',
      appCodeUrl: 'TODO',
    };
  },
});
</script>
