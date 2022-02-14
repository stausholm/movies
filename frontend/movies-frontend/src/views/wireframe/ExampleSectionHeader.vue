<template>
  <div class="">
    <div class="container">
      <h2>Section Headers</h2>
    </div>

    <div class="container">
      <section-header
        title="A header with every prop on it at the same time"
        subtitle="Fresh features & content"
        :icon="icon"
        ctaLabel="See all"
        to="/library"
        class="mt-2"
      />
      <p class="mt-1">{{ text }}</p>
      <base-spacer :size="4" />

      <section-header
        title="Just updated"
        :icon="icon"
        ctaLabel="See all"
        to="/library"
        class="mt-2"
      />
      <p class="mt-1">{{ text }}</p>
      <base-spacer :size="4" />

      <section-header title="Just updated" ctaLabel="See all" to="/library" class="mt-2" />
      <p class="mt-1">{{ text }}</p>
      <base-spacer :size="4" />

      <section-header title="Just updated" to="/library" class="mt-2" />
      <p class="mt-1">{{ text }}</p>
      <base-spacer :size="4" />

      <section-header title="Just updated" class="mt-2" />
      <p class="mt-1">{{ text }}</p>
      <base-spacer :size="4" />

      <section-header
        title="Just updated"
        subtitle="Fresh features & content"
        to="/library"
        class="mt-2"
      />
      <p class="mt-1">{{ text }}</p>
      <base-spacer :size="4" />

      <section-header
        title="Just updated"
        subtitle="Fresh features & content"
        to="/library"
        ctaLabel="See all"
        class="mt-2"
      />
      <p class="mt-1">{{ text }}</p>
      <base-spacer :size="4" />
    </div>

    <zone theme="tertiary">
      <base-spacer :size="4" />
      <div class="container">
        <section-header
          title="A header with every prop on it at the same time"
          subtitle="Fresh features & content"
          :icon="icon"
          ctaLabel="See all"
          to="/library"
          class="mb"
        />
        <p class="mt-1 mb-0">A header with every prop on it at the same time. {{ text }}</p>
      </div>
      <base-spacer :size="4" />
    </zone>
    <zone theme="dark">
      <base-spacer :size="4" />
      <div class="container">
        <section-header
          title="Just updated"
          subtitle="Fresh features & content"
          :icon="icon"
          ctaLabel="See all"
          class="mb"
        />
        <p class="mt-1 mb-0">{{ text }}</p>
      </div>
      <base-spacer :size="4" />
    </zone>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import SectionHeader from '@/components/SectionHeader.vue';
import Zone from '@/components/Zone.vue';
import BaseSpacer from '@/components/base/BaseSpacer.vue';

export default defineComponent({
  name: 'ExampleSectionHeader',
  components: {
    SectionHeader,
    Zone,
    BaseSpacer,
  },
  data() {
    return {
      icon: 'Filmstrip',
      text: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Animi voluptates deserunt ex sit saepe molestias. Magnam vel sapiente ipsam ut dicta incidunt pariatur deserunt illum. Illum molestiae illo hic qui.',
    };
  },
});
</script>
