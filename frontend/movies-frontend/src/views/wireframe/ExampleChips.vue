<template>
  <div class="container">
    <h2>Chips</h2>
    <h3>checkbox array</h3>
    <p>
      Lorem ipsum, dolor sit amet consectetur adipisicing elit. Ab, cum? Et, ad! Sit placeat eos in
      hic quasi impedit, sunt quos, aperiam soluta debitis voluptates cumque alias odio labore. Id!
    </p>
    <chip-group label="test 1" type="checkbox">
      <chip v-model="test1" value="test1" :showIcon="false">some text showIcon false</chip>
      <chip v-model="test1" value="test2">lorem ipsum</chip>
      <chip v-model="test1" value="test3">a longer text lorem ipsum dolor sit amet</chip>
      <chip v-model="test1" :value="test1Values[0]"
        >averylongwordthatwillhavetowraploremipsumdolorsitamet</chip
      >
      <chip v-model="test1" :value="test1Values[1]"></chip>
    </chip-group>

    <h3 class="mt-2">radio and radio with boolean</h3>
    <p>
      Lorem ipsum, dolor sit amet consectetur adipisicing elit. Ab, cum? Et, ad! Sit placeat eos in
      hic quasi impedit, sunt quos, aperiam soluta debitis voluptates cumque alias odio labore. Id!
    </p>

    <chip-group label="test 2" type="radio">
      <chip v-model="test2" value="test4">label</chip>
      <chip v-model="test2" value="test5">label</chip>
      <chip v-model="test2" value="test4" :disabled="true">disabled label</chip>
      <chip v-model="test2" value="test5" :disabled="true">disabled label</chip>
    </chip-group>

    <chip-group label="test 4" type="radio">
      <chip v-model="test4" :value="false">radio false label</chip>
      <chip v-model="test4" :value="true">radio true label</chip>
    </chip-group>

    <h3 class="mt-2">type: presentation</h3>

    <chip-group label="presentation test" type="presentation">
      <chip icon="Filmstrip" :checked="true">label</chip>
      <chip icon="Filmstrip" :showIcon="true">label</chip>
      <chip :checked="true" :disabled="true">disabled checked</chip>
      <chip :checked="false" :disabled="true">disabled unchecked</chip>
      <chip>
        <span class="fw-bold text-uppercase bg-primary text-white">label with html</span>
      </chip>
      <chip :closable="true" @close="handleClick">presentation chip</chip>
    </chip-group>

    <h3 class="mt-2">type: button</h3>

    <chip-group label="button test" type="button">
      <chip :closable="true" @close="handleClick">button chip label</chip>
    </chip-group>

    <h3 class="mt-2">more chips</h3>

    <chip-group label="Filter content by tag" type="radio">
      <chip v-model="test2" value="a chip">a chip</chip>
      <chip v-model="test2" value="another chip">another chip</chip>
      <chip v-model="test2" value="a third chip">a third chip</chip>
    </chip-group>

    <chip-group label="Filter content by tags" type="checkbox" :scrollable="true">
      <chip v-model="test1" value="a chip">a chip</chip>
      <chip v-model="test1" value="another chip">another chip</chip>
      <chip v-model="test1" value="another chip 2"
        >These chips are in a :scrollable="true" chip-group that has a horizontal scrollbar on very
        long lists of chips</chip
      >
      <chip v-model="test3">a chip with a boolean v-model</chip>
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
