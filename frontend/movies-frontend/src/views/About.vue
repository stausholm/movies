<template>
  <div class="about">
    <h1>This is an about page</h1>
    <p>{{ wow }}</p>
    <p>
      Lorem ipsum dolor sit amet consectetur, adipisicing elit. Possimus aut quas beatae, neque odit
      sit cumque tempore, ullam temporibus mollitia, aperiam aliquam. Aliquid voluptas possimus
      quisquam optio, voluptate dignissimos fuga.
    </p>
  </div>
  <p>asdasd</p>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
export default defineComponent({
  data() {
    return {
      wow: 'asdasd',
    };
  },
});
</script>
