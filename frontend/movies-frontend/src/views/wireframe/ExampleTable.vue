<template>
  <div class="container">
    <h2>Tables</h2>
    <table-custom :search="true" :paginated="true" :data="gridData" :columns="gridColumns" />

    <table-custom
      :sortable="false"
      class="mt-2 mb-2"
      theme="stripes"
      :data="gridData"
      :columns="gridColumns"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import TableCustom from '@/components/TableCustom.vue';

export default defineComponent({
  name: 'ExampleTable',
  components: {
    TableCustom,
  },
  data() {
    return {
      gridData: [
        {
          name: 'American alligator',
          // location: 'Southeast United States',
          letter: 'a',
          number: '11',
          test: 10,
        },
        {
          name: 'Chinese alligator',
          location: 'Eastern China',
          letter: 'b',
          number: '2',
          test: 0,
          test2: true,
          test3: [1, 2, 3],
          test4: { a: 1 },
          test5: '<a href="#">html in a string</a>',
        },
        {
          name: 'Spectacled caiman',
          location: 'Central & South America',
          letter: 'c',
          number: '',
        },
        {
          name: 'Broad-snouted caiman',
          location: 'South America',
          letter: 'd',
          number: '4',
        },
        { name: 'Jacaré caiman', location: 'South America', letter: 'A' },
        {
          name: 'Black caiman',
          location: 'South America',
          letter: 'f',
          number: '6',
        },
        {
          name: 'BLbck caiman',
          location: 'South America',
          letter: 'f',
          number: '7',
        },
        {
          name: 'American alligator',
          location: 'Southeast United States',
          letter: 'a',
          number: '1',
        },
        {
          name: 'Chinese alligator',
          location: 'Eastern China',
          letter: 'b',
          number: '2',
        },
        {
          name: 'Spectacled caiman',
          location: 'Central & South America',
          letter: 'c',
          number: '',
        },
        {
          name: 'Broad-snouted caiman',
          location: 'South America',
          letter: 'd',
          number: '4',
        },
        { name: 'Jacaré caiman', location: 'South America', letter: 'A' },
        {
          name: 'Black caiman',
          location: 'South America',
          letter: 'f',
          number: '6',
        },
        {
          name: 'BLbck caiman',
          location: 'South America',
          letter: 'f',
          number: '7',
        },
        {
          name: 'American alligator',
          location: 'Southeast United States',
          letter: 'a',
          number: '1',
        },
        {
          name: 'Chinese alligator',
          location: 'Eastern China',
          letter: 'b',
          number: '2',
        },
        {
          name: 'Spectacled caiman',
          location: 'Central & South America',
          letter: 'c',
          number: '',
        },
        {
          name: 'Broad-snouted caiman',
          location: 'South America',
          letter: 'd',
          number: '4',
        },
        { name: 'Jacaré caiman', location: 'South America', letter: 'A' },
        {
          name: 'Black caiman',
          location: 'South America',
          letter: 'f',
          number: '6',
        },
        {
          name: 'BLbck caiman',
          location: 'South America',
          letter: 'f',
          number: '7',
        },
        {
          name: 'American alligator',
          location: 'Southeast United States',
          letter: 'a',
          number: '1',
        },
        {
          name: 'Chinese alligator',
          location: 'Eastern China',
          letter: 'b',
          number: '2',
        },
        {
          name: 'Spectacled caiman',
          location: 'Central & South America',
          letter: 'c',
          number: '',
        },
        {
          name: 'Broad-snouted caiman',
          location: 'South America',
          letter: 'd',
          number: '4',
        },
        { name: 'Jacaré caiman', location: 'South America', letter: 'A' },
        {
          name: 'Black caiman',
          location: 'South America',
          letter: 'f',
          number: '6',
        },
        {
          name: 'BLbck caiman',
          location: 'South America',
          letter: 'f',
          number: '7',
        },
        {
          name: 'American alligator',
          location: 'Southeast United States',
          letter: 'a',
          number: '1',
        },
        {
          name: 'Chinese alligator',
          location: 'Eastern China',
          letter: 'b',
          number: '2',
        },
        {
          name: 'Spectacled caiman',
          location: 'Central & South America',
          letter: 'c',
          number: '',
        },
        {
          name: 'Broad-snouted caiman',
          location: 'South America',
          letter: 'd',
          number: '4',
        },
        { name: 'Jacaré caiman', location: 'South America', letter: 'A' },
        {
          name: 'Black caiman',
          location: 'South America',
          letter: 'f',
          number: '6',
        },
        {
          name: 'BLbck caiman',
          location: 'South America',
          letter: 'f',
          number: '7',
        },
        {
          name: 'American alligator',
          location: 'Southeast United States',
          letter: 'a',
          number: '1',
        },
        {
          name: 'Chinese alligator',
          location: 'Eastern China',
          letter: 'b',
          number: '2',
        },
        {
          name: 'Spectacled caiman',
          location: 'Central & South America',
          letter: 'c',
          number: '',
        },
        {
          name: 'Broad-snouted caiman',
          location: 'South America',
          letter: 'd',
          number: '4',
        },
        { name: 'Jacaré caiman', location: 'South America', letter: 'A' },
        {
          name: 'Black caiman',
          location: 'South America',
          letter: 'f',
          number: '6',
        },
        {
          name: 'BLbck caiman',
          location: 'South America',
          letter: 'f',
          number: '7',
        },
        {
          name: 'American alligator',
          location: 'Southeast United States',
          letter: 'a',
          number: '1',
        },
        {
          name: 'Chinese alligator',
          location: 'Eastern China',
          letter: 'b',
          number: '2',
        },
        {
          name: 'Spectacled caiman',
          location: 'Central & South America',
          letter: 'c',
          number: '',
        },
        {
          name: 'Broad-snouted caiman',
          location: 'South America',
          letter: 'd',
          number: '4',
        },
        { name: 'Jacaré caiman', location: 'South America', letter: 'A' },
        {
          name: 'Black caiman',
          location: 'South America',
          letter: 'f',
          number: '6',
        },
        {
          name: 'BLbck caiman',
          location: 'South America',
          letter: 'f',
          number: '7',
        },
        {
          name: 'American alligator',
          location: 'Southeast United States',
          letter: 'a',
          number: '1',
        },
        {
          name: 'Chinese alligator',
          location: 'Eastern China',
          letter: 'b',
          number: '2',
        },
        {
          name: 'Spectacled caiman',
          location: 'Central & South America',
          letter: 'c',
          number: '',
        },
        {
          name: 'Broad-snouted caiman',
          location: 'South America',
          letter: 'd',
          number: '4',
        },
        { name: 'Jacaré caiman', location: 'South America', letter: 'A' },
        {
          name: 'Black caiman',
          location: 'South America',
          letter: 'f',
          number: '6',
        },
        {
          name: 'BLbck caiman',
          location: 'South America',
          letter: 'f',
          number: '7',
        },
        {
          name: 'American alligator',
          location: 'Southeast United States',
          letter: 'a',
          number: '1',
        },
        {
          name: 'Chinese alligator',
          location: 'Eastern China',
          letter: 'b',
          number: '2',
        },
        {
          name: 'Spectacled caiman',
          location: 'Central & South America',
          letter: 'c',
          number: '',
        },
        {
          name: 'Broad-snouted caiman',
          location: 'South America',
          letter: 'd',
          number: '4',
        },
        { name: 'Jacaré caiman', location: 'South America', letter: 'A' },
        {
          name: 'Black caiman',
          location: 'South America',
          letter: 'f',
          number: '6',
        },
        {
          name: 'BLbck caiman',
          location: 'South America',
          letter: 'f',
          number: '7',
        },
      ],
      gridColumns: [
        { label: 'Name', property: 'name' },
        { label: 'Location', property: 'location' },
        { label: 'Letter label aaaaaaaaaaa', property: 'letter' },
        { label: 'Number', property: 'number' },
        { label: 'test', property: 'test' },
        { label: 'test2', property: 'test2' },
        { label: 'test3', property: 'test3' },
        { label: 'test4', property: 'test4' },
        { label: 'test5', property: 'test5' },
      ],
    };
  },
});
</script>
