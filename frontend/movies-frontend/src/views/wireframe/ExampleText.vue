<template>
  <div class="container">
    <h2>Text</h2>
    <div class="row">
      <div class="col-12 mb-2">
        <h1>{{ fontSizeDemoText }}</h1>
        <h2>{{ fontSizeDemoText }}</h2>
        <h3>{{ fontSizeDemoText }}</h3>
        <h4>{{ fontSizeDemoText }}</h4>
        <h5>{{ fontSizeDemoText }}</h5>
        <h6>{{ fontSizeDemoText }}</h6>
        <h1 class="text-normal">{{ fontSizeDemoText }}</h1>
        <p>{{ fontSizeDemoText }}</p>
        <p class="text-small">{{ fontSizeDemoText }}</p>
        <p class="text-big">{{ fontSizeDemoText }}</p>
        <p class="text-pre-head">{{ fontSizeDemoText }}</p>
        <blockquote>This is a quote</blockquote>

        <div class="p-1 theme-dark">
          <p class="text-pre-head">pre head</p>
          <h2 class="text-normal">lorem ipsum</h2>
          <p>
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Impedit incidunt quo labore
            ullam optio quas <a href="#">nulla cum itaque</a> distinctio, necessitatibus fugit
            temporibus similique a ratione suscipit nesciunt eveniet quaerat tempora?
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'ExampleText',

  data() {
    return {
      fontSizeDemoText: 'Lorem ipsum dolor sit amet',
    };
  },
});
</script>
