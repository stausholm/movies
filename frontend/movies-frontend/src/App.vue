<template>
  <div id="nav">
    {{ isReducedMotion }}
    <router-link to="/">Home</router-link>
    |
    <router-link to="/search">Search</router-link> |
    <router-link to="/library">Library</router-link> |
    <router-link to="/account">My stuff</router-link>
  </div>
  <div id="teleporttarget"></div>
  <router-view />
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { UserMutations } from '@/store/user/mutations';
import { ContentActions } from '@/store/content/actions';
import { AppSettingPayload } from '@/store/user/types';
export default defineComponent({
  computed: {
    helloMessage() {
      return this.$store.state.helloMessage;
    },
    isReducedMotion: {
      get(): boolean {
        return this.$store.getters.getAppSettings.preferReducedMotion;
      },
      set(value: boolean): void {
        this.$store.commit(UserMutations.SET_APPSETTING, {
          key: 'preferReducedMotion',
          val: value,
        } as AppSettingPayload);
      },
    },
  },
  mounted() {
    setTimeout(() => {
      this.isReducedMotion = true;
    }, 3000);
  },
  created() {
    this.$store.dispatch(ContentActions.LOAD_VIDEOS);
  },
});
</script>
