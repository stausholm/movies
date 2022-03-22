<template>
  <div class="container">
    <h2>Resize watcher</h2>
    <p>Resize the browser window to see it</p>
    <resize-watcher v-slot="{ width, height }" @resize="handleResize">
      <div
        class="resize-example border rounded text-center p-1"
        :class="{
          lg: width > 500,
          md: width >= 300 && width <= 500,
          sm: width < 300,
        }"
      >
        <img src="image" alt="" class="ml-1 mr-1 mb-1" />
        <p class="mb-0">This content is {{ width }}px wide and {{ height }}px tall.</p>
      </div>
    </resize-watcher>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import ResizeWatcher from '@/components/ResizeWatcher.vue';

export default defineComponent({
  name: 'ExampleResizeWatcher',
  components: { ResizeWatcher },
  data() {
    return {};
  },
  methods: {
    handleResize(args: unknown) {
      //console.log(args);
    },
  },
});
</script>

<style lang="scss" scoped>
.resize-example {
  display: flex;
}
.resize-example img {
  border-radius: 50%;
}
.resize-example.sm {
  justify-content: center;
  flex-direction: column;
  background-color: #e91e63;
}
.resize-example.md {
  font-size: 1.5rem;
  flex-direction: column;
  justify-content: center;
  background-color: #3f51b5;
}
.resize-example.lg {
  align-items: center;
  font-size: 2rem;
  background-color: #009688;

  img {
    width: 100px;
    margin-bottom: 0;
  }
}
</style>
