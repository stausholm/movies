<template>
  <div class="container">
    <h2>Chips</h2>
    <chip v-model="test1" value="test1" type="checkbox" :showIcon="false"
      >some text showIcon false</chip
    >
    <chip v-model="test1" value="test2" type="checkbox">lorem ipsum</chip>
    <chip v-model="test1" value="test3" type="checkbox"
      >a longer text lorem ipsum dolor sit amet</chip
    >
    <chip v-model="test1" :value="test1Values[0]" type="checkbox"
      >averylongwordthatwillhavetowraploremipsumdolorsitamet</chip
    >
    <chip v-model="test1" :value="test1Values[1]" type="checkbox"></chip>
    <chip v-model="test2" value="test4" type="radio">label</chip>
    <chip v-model="test2" value="test5" type="radio">label</chip>
    <chip v-model="test3" type="checkbox">label</chip>
    <chip v-model="test4" type="radio" :value="false">radio false label</chip>
    <chip v-model="test4" type="radio" :value="true">radio true label</chip>
    <chip icon="Filmstrip" :checked="true">label</chip>
    <chip icon="Filmstrip" :showIcon="true">label</chip>
    <chip :checked="true" :disabled="true">disabled checked</chip>
    <chip :checked="false" :disabled="true">disabled unchecked</chip>
    <chip :closable="true" @close="handleClick">label</chip>
    <chip :closable="true" type="presentation" @close="handleClick">presentation chip</chip>
    <chip>
      <span class="fw-bold text-uppercase bg-primary text-white">label with html</span>
    </chip>
    <h3>Chips in chip group</h3>
    <chip-group label="Filter content by tag" :multiselectable="false">
      <chip v-model="test2" value="a chip" type="radio">a chip</chip>
      <chip v-model="test2" value="another chip" type="radio">another chip</chip>
      <chip v-model="test2" value="a third chip" type="radio">a third chip</chip>
    </chip-group>
    <chip-group label="Filter content by tags" :multiselectable="true" :scrollable="true">
      <chip v-model="test1" value="a chip" type="checkbox">a chip</chip>
      <chip v-model="test1" value="another chip" type="checkbox">another chip</chip>
      <chip v-model="test3" value="a third chip" type="checkbox"
        >a third chip with a different v-model</chip
      >
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
      test1: [],
      test2: '',
      test3: true,
      test4: true,
      test1Values: [
        { label: 'label', value: 123 },
        { label: 'label2', value: 321 },
      ],
    };
  },
  methods: {
    handleClick() {
      console.log('CLICKED');
    },
  },
});
</script>
