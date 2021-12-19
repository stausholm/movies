<template>
  <li class="settings-list__group">
    <h3 class="group__title pl-1 pr-1">{{ name }}</h3>
    <ul class="group__list">
      <slot />
    </ul>
  </li>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'SettingsGroup',
  props: {
    name: {
      type: String,
      required: true,
    },
  },
});
</script>
