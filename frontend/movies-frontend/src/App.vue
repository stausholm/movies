<template>
  <div id="nav">
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
export default defineComponent({
  computed: {
    helloMessage() {
      return this.$store.state.helloMessage;
    },
    username: {
      get(): string {
        return this.$store.getters.getUsername;
      },
      set(value: string): void {
        this.$store.commit(UserMutations.SET_USERNAME, value);
      },
    },
  },
  mounted() {
    this.$store.dispatch('loadAPIResult');
    setTimeout(() => {
      this.username = 'changed hehehehe';
    }, 3000);
  },
});
</script>
