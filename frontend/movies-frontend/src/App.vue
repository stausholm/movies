<template>
  <navbar />
  <div id="teleporttarget"></div>
  <router-view />
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { ContentActions } from '@/store/content/actions';
import Navbar from '@/components/Navbar.vue';
export default defineComponent({
  components: {
    Navbar,
  },
  created() {
    this.$store.dispatch(ContentActions.LOAD_VIDEOS);
  },
});
</script>
