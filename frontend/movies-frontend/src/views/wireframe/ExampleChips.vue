<template>
  <div class="container">
    <h2>Chips</h2>
    <chip></chip>
    <chip></chip>
    <chip></chip>
    <chip></chip>
    <chip></chip>
    <chip></chip>
    <chip></chip>
    <chip></chip>
    <chip></chip>
    <chip></chip>
    <chip></chip>
    <chip></chip>
    <h3>Chips in chip group</h3>
    <chip-group>
      <chip>a chip</chip>
      <chip>a chip</chip>
      <chip>a chip</chip>
    </chip-group>
    <chip-group :scrollable="true">
      <chip>a chip</chip>
      <chip>a chip</chip>
      <chip>a chip</chip>
    </chip-group>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import Chip from '@/components/Chip.vue';
import ChipGroup from '@/components/ChipGroup.vue';

export default defineComponent({
  name: 'ExampleChips',
  components: {
    Chip,
    ChipGroup,
  },
});
</script>
