<template>
  <layout>
    <div class="container">
      <h1>Privacy Policy</h1>
      <p>
        The app <b>{{ appName }}</b> does not collect any user data, or track the user in any way.
        It does not use Cookies. All user submitted data is stored on the user's device. You can
        export this data from the account settings screen. {{ appName }} is hosted on
        {{ appHostName }}, in order to be publicly accessible. {{ appHostName }} stores the IP
        addresses of site visitors for {{ appHostLogPeriod }} days. For more information, please see
        their <a :href="appHostPrivacyUrl">Privacy Policy</a> and
        <a :href="appHostGDPRUrl">GDPR Compliance statement</a>
      </p>
    </div>
  </layout>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import {
  APP_NAME,
  APP_HOST_NAME,
  APP_HOST_LOG_PERIOD,
  APP_HOST_PRIVACY_URL,
  APP_HOST_GDPR_URL,
} from '@/constants/SiteSettings.json';
import Layout from '@/layouts/Main.vue';

export default defineComponent({
  name: 'PrivacyPolicy',
  components: {
    Layout,
  },
  data() {
    return {
      appName: APP_NAME,
      appHostName: APP_HOST_NAME,
      appHostLogPeriod: APP_HOST_LOG_PERIOD,
      appHostPrivacyUrl: APP_HOST_PRIVACY_URL,
      appHostGDPRUrl: APP_HOST_GDPR_URL,
    };
  },
});
</script>
