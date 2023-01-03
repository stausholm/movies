<template>
  <layout>
    <hero-app :showBackButton="true" :slim="true" />
    <div class="container">
      <p>
        The following permissions are optional. You can use {{ appName }} without them, but some
        functions may be limited.
      </p>
      <icon-list>
        <icon-list-item icon="Microphone">
          <span class="fw-bold">Microphone:</span> Used to provide audio recording features for
          voice search on supported devices.
        </icon-list-item>
      </icon-list>

      <base-note class="mt-2" :hideIcon="true" type="info" title="Reset permissions">
        <p>
          If you've previously denied certain permissions but wish to change them, you can do so in
          your browser's permission manager. This is usually found under your browser's settingspage
          and/or via the padlock icon in your browser's URL bar.
        </p>
      </base-note>
    </div>
  </layout>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import Layout from '@/layouts/Main.vue';
import { APP_NAME } from '@/constants/SiteSettings.json';
import HeroApp from '@/components/HeroApp.vue';
import BaseNote from '@/components/base/BaseNote.vue';
import IconList from '@/components/IconList.vue';
import IconListItem from '@/components/IconListItem.vue';

export default defineComponent({
  name: 'Permissions',
  components: {
    Layout,
    HeroApp,
    BaseNote,
    IconList,
    IconListItem,
  },
  data() {
    return {
      appName: APP_NAME,
    };
  },
});
</script>
