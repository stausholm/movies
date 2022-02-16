<template>
  <div class="container">
    <h2>Buttons</h2>
    <base-button class="" @click="alert">button</base-button>
    <base-button class="btn--primary" @click="alert">button primary</base-button>
    <base-button class="btn--primary btn--rounded" @click="alert">button rounded</base-button>
    <base-button class="btn--uppercase" @click="alert">button uppercase</base-button>
    <base-button class="btn--sm" @click="alert">button sm</base-button>
    <base-button class="btn--lg" @click="alert">button lg</base-button>
    <base-button class="" @click="alert">
      button with a lot of text which is bad but oh well if that's how it's gonna be, so be it
    </base-button>
    <base-button class="" @click="alert">
      <base-icon></base-icon>
    </base-button>
    <base-button class="" @click="alert">
      <base-icon></base-icon>
      <span>icon with text</span>
    </base-button>
    <base-button class="" @click="alert">
      <span>icon with text left</span>
      <base-icon></base-icon>
    </base-button>
    <base-button class="btn--primary btn--icon-pulse btn--block" @click="alert">
      <span>icon with text left</span>
      <base-icon></base-icon>
    </base-button>
    <base-button class="btn--icon text-small" @click="alert">
      <base-icon></base-icon>
      <span>icon btn</span>
    </base-button>
    <base-button class="btn--text" @click="alert">button text</base-button>
    <base-button class="btn--outline btn--primary" @click="alert">
      button outline primary
    </base-button>
    <base-button class="btn--danger btn--outline" @click="alert">
      button danger outline
    </base-button>
    <base-button class="btn--danger" @click="alert">button danger</base-button>
    <base-button class="btn--link" @click="alert">button link</base-button>
    <base-button class="btn--link" disabled @click="alert">button disabled</base-button>
    <base-button class="btn" disabled @click="alert">button disabled</base-button>
    <base-button tag="span" class="btn--link" @click="alert">button span tag</base-button>
    <base-button class="btn--outline btn--text">outline text</base-button>
    <base-button class="btn--outline btn--warning">outline</base-button>
    <base-button class="btn--warning">warning</base-button>
    <base-button class="btn--text-primary">text-primary</base-button>

    <h2 class="mt-2">Quick read button</h2>
    <quick-read-button @click="quickReadClick"></quick-read-button>
    <quick-read-button
      :includeText="false"
      imageSrc="/img/posters/tt0085959_SX600.jpg"
      class="mt-2"
      @click="quickReadClick"
    ></quick-read-button>
    <quick-read-button @click="quickReadClick">
      <p class="mt-2 text-center h3">Some custom content</p>
    </quick-read-button>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import BaseButton from '@/components/base/BaseButton.vue';
import BaseIcon from '@/components/base/BaseIcon.vue';
import QuickReadButton from '@/components/QuickReadButton.vue';

export default defineComponent({
  name: 'ExampleButtons',
  components: {
    BaseButton,
    BaseIcon,
    QuickReadButton,
  },
  data() {
    return {};
  },
  methods: {
    alert() {
      alert('test');
    },
    quickReadClick(ev: Event) {
      console.log('clicked', ev);
    },
  },
});
</script>
