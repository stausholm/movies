<template>
  <div class="container">
    <h2>Spoilers <spoiler>very secret</spoiler></h2>
    <p>
      Lorem ipsum dolor sit amet, consectetur adipiscing elit,
      <spoiler
        >sed do <code>some code inside</code> eiusmod tempor
        <a href="#inside-spoiler" tabindex="0">a link inside</a> incididunt ut</spoiler
      >
      labore et dolore magna aliqua. Ut enim ad minim veniam, quis
      <spoiler
        >nostrud <a href="#" class="link">link link lorem</a> exercitation ullamco laboris</spoiler
      >
      nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in
      <spoiler
        >reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.</spoiler
      >
      Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt
      <spoiler>mollit anim id</spoiler> est laborum.
    </p>
    <p>
      Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
      labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco
      <spoiler
        >laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in
        reprehenderit</spoiler
      >
      in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
      <spoiler
        >Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit
        anim id est laborum</spoiler
      >.
    </p>

    <spoiler class="mb-1">
      <img src="spoiler" alt="" />
    </spoiler>

    <p>
      Lorem ipsum dolor sit amet,
      <spoiler>consectetur adipiscing elit, sed do eiusmod tempor incididunt</spoiler> ut labore et
      dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
      <spoiler>exercitation ullamco laboris nisi</spoiler> ut aliquip ex ea commodo consequat. Duis
      aute irure dolor in <spoiler>reprehenderit in</spoiler> voluptate velit esse cillum dolore
      <spoiler>eu fugiat nulla pariatur</spoiler>. Excepteur sint occaecat cupidatat non proident,
      sunt in culpa qui officia deserunt <spoiler>mollit anim</spoiler> id est laborum. Lorem ipsum
      dolor sit amet, consectetur adipiscing <spoiler>elit, sed do eiusmod</spoiler> tempor
      incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
      exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
      <spoiler>Duis aute irure dolor in reprehenderit</spoiler> in voluptate velit esse cillum
      dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa
      qui <spoiler>officia deserunt mollit anim id est laborum.</spoiler>
    </p>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import Spoiler from '@/components/Spoiler.vue';

export default defineComponent({
  name: 'ExampleSpoiler',
  components: {
    Spoiler,
  },
});
</script>
