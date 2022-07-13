<template>
  <ul class="icon-list">
    <slot />
  </ul>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'IconList',
});
</script>

<style lang="scss" scoped>
.icon-list {
  padding-left: 0;
  padding-right: 0;
  margin-left: 0;
  margin-right: 0;
  list-style-type: none;
}
</style>
