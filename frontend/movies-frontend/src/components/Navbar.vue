<template>
  <div id="nav">
    <router-link to="/">Home</router-link>
    |
    <router-link to="/search">Search</router-link> |
    <router-link to="/library">Library</router-link> |
    <router-link to="/account">My stuff</router-link>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({});
</script>