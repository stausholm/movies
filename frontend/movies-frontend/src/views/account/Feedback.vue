<template>
  <layout>
    <hero-app :showBackButton="true" :slim="true" />
    <div class="container">
      <h2>I want to make this better</h2>
      <p>
        Please, yes! Bugs? Feature requests? Other issues?
        <a :href="appFeedbackUrl" class="link" target="_blank">Any contribution is very welcome!</a>
        Help improve {{ appName }} by leaving your feedback on how we can improve, via the link
        above.
      </p>
    </div>
  </layout>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { APP_NAME, APP_FEEDBACK_URL } from '@/constants/SiteSettings.json';
import Layout from '@/layouts/Main.vue';
import HeroApp from '@/components/HeroApp.vue';

export default defineComponent({
  name: 'Feedback',
  components: {
    Layout,
    HeroApp,
  },
  data() {
    return {
      appName: APP_NAME,
      appFeedbackUrl: APP_FEEDBACK_URL,
    };
  },
});
</script>
