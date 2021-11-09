<template>
  <div class="">
    <h1>Feedback</h1>
    <h2>I want to make this better</h2>
    <p>
      Please, yes! Bugs? Feature requests? Other issues?
      <a :href="appFeedbackUrl">Any contribution is very welcome!</a>
      Help improve {{ appName }} by leaving your feedback on how we can improve, via the link above.
    </p>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { APP_NAME, APP_FEEDBACK_URL } from '@/constants/SiteSettings.json';

export default defineComponent({
  name: 'Feedback',
  data() {
    return {
      appName: APP_NAME,
      appFeedbackUrl: APP_FEEDBACK_URL,
    };
  },
});
</script>
