<template>
  <div class="container">
    <h2>Accessibility</h2>
    <h3>SkipSection</h3>
    <p>Skip large sections in the content by tabbing past the section</p>
    <skip-section name="example section">
      <div class="bg-primary p-1">
        <button class="btn mr">A button</button>
        <button class="btn mr">A button</button>
        <button class="btn mr">A button</button>
        <button class="btn mr">A button</button>
        <button class="btn mr">A button</button>
        <button class="btn mr">A button</button>
        <button class="btn mr">A button</button>
      </div>
    </skip-section>
    <button class="btn btn--primary mt-1">Content below SkipSection</button>

    <h2 class="mt-2">Announcer</h2>
    <p>Text added to an aria-live component, added at the bottom of App.vue</p>
    <button class="btn btn--primary mr" @click="announce">Announce text 1</button>
    <button class="btn btn--primary" @click="announce2">Announce text 2</button>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import SkipSection from '@/components/SkipSection.vue';
import { AppMutations } from '@/store/app/mutations';

export default defineComponent({
  name: 'ExampleAccessibility',
  components: {
    SkipSection,
  },
  methods: {
    announce(): void {
      this.$store.commit(AppMutations.SET_ANNOUNCE_MESSAGE, 'This is text number one. Lorem ipsum');
    },
    announce2(): void {
      this.$store.commit(AppMutations.SET_ANNOUNCE_MESSAGE, 'Text 2 is different');
    },
  },
});
</script>
