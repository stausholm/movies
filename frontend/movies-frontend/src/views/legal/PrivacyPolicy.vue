<template>
  <div class="">
    <h1>PrivacyPolicy</h1>
    <p>
      The app <b>{{ appName }}</b> does not collect any user data, or track the user in any way. It
      does not use Cookies. All user submitted data is stored on the user's device. You can export
      this data from the account settings screen. {{ appName }} is hosted on {{ appHostName }}, in
      order to be publicly accessible. {{ appHostName }} stores the IP addresses of site visitors
      for {{ appHostLogPeriod }} days. For more information, please see their
      <a :href="appHostPrivacyUrl">Privacy Policy</a> and
      <a :href="appHostGDPRUrl">GDPR Compliance statement</a>
    </p>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'PrivacyPolicy',
  data() {
    return {
      appName: 'TODO',
      appHostName: 'TODO',
      appHostLogPeriod: 'TODO',
      appHostPrivacyUrl: 'TODO',
      appHostGDPRUrl: 'TODO',
    };
  },
});
</script>
