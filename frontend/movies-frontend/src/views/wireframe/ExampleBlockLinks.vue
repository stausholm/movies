<template>
  <div class="container">
    <h2>block links</h2>
    <nav class="block-link-wrapper">
      <block-link to="https://google.com" type="external">google.com</block-link>
      <block-link to="https://i.kym-cdn.com/photos/images/newsfeed/000/823/349/06f.gif" type="file"
        >yeee</block-link
      >
      <block-link to="/nope.zip" type="file">Some external archive</block-link>
      <block-link to="/someunknownfileextension" type="file">another file</block-link>
    </nav>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import BlockLink from '@/components/BlockLink.vue';

export default defineComponent({
  name: 'ExampleBlockLinks',
  components: {
    BlockLink,
  },
  data() {
    return {};
  },
});
</script>
