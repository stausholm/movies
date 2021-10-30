<template>
  <div class="about">
    <h1>This is an about page</h1>
    <p>{{ wow }}</p>
    <button @click="changeWow('12')">change wow</button>
    <p>
      Lorem ipsum dolor sit amet consectetur, adipisicing elit. Possimus aut quas beatae, neque odit
      sit cumque tempore, ullam temporibus mollitia, aperiam aliquam. Aliquid voluptas possimus
      quisquam optio, voluptate dignissimos fuga.
    </p>
    <button @click="showStuff = !showStuff">toggle teleport</button>
    <teleport to="#teleporttarget" v-if="showStuff">
      <p>showStuff aaa {{ showStuff }}</p>
    </teleport>
  </div>
  <p>asdasd</p>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
export default defineComponent({
  data() {
    return {
      wow: 'asdasd',
      numOrString: 25 as number | string,
      showStuff: true as boolean,
    };
  },
  methods: {
    changeWow(val: string) {
      this.wow = val;
      return val;
    },
  },
});
</script>
