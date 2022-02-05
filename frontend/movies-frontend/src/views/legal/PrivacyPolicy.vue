<template>
  <layout>
    <hero-app :showBackButton="true" :slim="true" />
    <div class="container">
      <hr />
      <p class="text-small">Last updated: {{ updateDateTimeLocalized }}</p>
      <p>
        The app <b>{{ appName }}</b> does not collect any user data, or track the user in any way.
        It does not use Cookies. All user submitted data is stored on the user's device. You can
        export this data from the account settings screen. {{ appName }} is hosted on
        {{ appHostName }}, in order to be publicly accessible. {{ appHostName }} stores the IP
        addresses of site visitors for an undisclosed period of time. For more information, please
        see their
        <a :href="appHostPrivacyUrl" target="_blank" rel="noopener noreferrer">Privacy Policy</a>
        and
        <a :href="appHostGDPRUrl" target="_blank" rel="noopener noreferrer">
          GDPR Compliance statement
        </a>
      </p>
    </div>
  </layout>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import {
  APP_NAME,
  APP_HOST_NAME,
  APP_HOST_PRIVACY_URL,
  APP_HOST_GDPR_URL,
  APP_PRIVACY_POLICY_LAST_UPDATED,
} from '@/constants/SiteSettings.json';
import Layout from '@/layouts/Main.vue';
import HeroApp from '@/components/HeroApp.vue';

export default defineComponent({
  name: 'PrivacyPolicy',
  components: {
    Layout,
    HeroApp,
  },
  data() {
    return {
      appName: APP_NAME,
      appHostName: APP_HOST_NAME,
      appHostPrivacyUrl: APP_HOST_PRIVACY_URL,
      appHostGDPRUrl: APP_HOST_GDPR_URL,
      appPolicyUpdateDateTime: APP_PRIVACY_POLICY_LAST_UPDATED,
    };
  },
  computed: {
    updateDateTimeLocalized(): string {
      return this.appPolicyUpdateDateTime; // TODO
    },
  },
});
</script>
