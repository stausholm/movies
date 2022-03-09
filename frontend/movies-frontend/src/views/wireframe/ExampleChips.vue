<template>
  <div class="container">
    <h2>Chips</h2>
    <chip icon="Filmstrip"></chip>
    <chip :closable="true"></chip>
    <chip v-model="checkboxVal"></chip>
    <chip v-model="checkboxGroup" value="test"></chip>
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
  data() {
    return {
      checkboxVal: false,
      checkboxGroup: ['test', 'test2', 'test3'],
      checkboxGroup2: [
        { label: 'label', value: 123 },
        { label: 'label2', value: 321 },
      ],
      radioGroup: ['a', 'b', 'c'],
      radioGroup2: [
        { label: 'label', value: 123 },
        { label: 'label2', value: 321 },
      ],
    };
  },
});
</script>
