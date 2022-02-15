<template>
  <layout>
    <hero-app :showBackButton="true" :slim="true" />
    <div class="container">
      <blockquote>
        I want to make this better
        <footer>
          - You, <span class="year">{{ year }}</span>
        </footer>
      </blockquote>
      <p>
        Please, yes! Bugs? Feature requests? Other issues?
        <a :href="appFeedbackUrl" class="link" target="_blank">
          Any contribution is very welcome!
        </a>
      </p>
      <p>
        Help improve {{ appName }} by leaving your feedback on how we can improve, via the link.
      </p>
      <a
        :href="appFeedbackUrl"
        class="mt-1 mb-1 btn btn--primary btn--icon-pulse btn--responsive"
        target="_blank"
      >
        <base-icon :width="24" :height="24">
          <icon-heart />
        </base-icon>
        <span>Send feedback</span>
      </a>
    </div>
  </layout>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { APP_NAME, APP_FEEDBACK_URL } from '@/constants/SiteSettings.json';
import Layout from '@/layouts/Main.vue';
import HeroApp from '@/components/HeroApp.vue';
import BaseIcon from '@/components/base/BaseIcon.vue';
import IconHeart from '@/components/icons/IconHeart.vue';

export default defineComponent({
  name: 'Feedback',
  components: {
    Layout,
    HeroApp,
    BaseIcon,
    IconHeart,
  },
  data() {
    return {
      appName: APP_NAME,
      appFeedbackUrl: APP_FEEDBACK_URL,
      year: new Date().getFullYear(),
    };
  },
});
</script>

<style lang="scss" scoped>
.year {
  font-style: italic;
}
</style>
