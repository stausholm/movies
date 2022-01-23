<template>
  <div class="container">
    <h2>Tabs</h2>
    <tabs id="aa" :activeOnCreated="2" transition="router-fade-right">
      <tab title="tab 1 title" icon="Filmstrip">
        <p>tab 1 ajsdl skdjfh</p>
        <button class="btn btn--primary">content in tab 1</button>
      </tab>
      <tab title="tab 2 title" icon="Star">
        <p>tab 2 Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quisquam, enim.</p>
        <button class="btn btn--primary">content in tab 2</button>
        <p>tab 2 Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quisquam, enim.</p>
        <p>tab 2 Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quisquam, enim.</p>
        <p>tab 2 Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quisquam, enim.</p>
        <p>tab 2 Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quisquam, enim.</p>
        <p>tab 2 Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quisquam, enim.</p>
        <p>tab 2 Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quisquam, enim.</p>
        <p>tab 2 Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quisquam, enim.</p>
        <p>tab 2 Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quisquam, enim.</p>
      </tab>
      <tab title="tab 3 title">
        <p>tab 3 ajsdl skdjfh</p>
        <button class="btn btn--primary">content in tab 3</button>
      </tab>
    </tabs>

    <h2 class="mt-2">Tabs hideTitle</h2>
    <tabs id="bb" :hideTitles="true" transition="fade">
      <tab title="tab 1 title" icon="Filmstrip">
        <p>tab 1 ajsdl skdjfh</p>
        <h3>kjh sdkfj skdfjh</h3>
        <button class="btn btn--primary">content in tab 1</button>
      </tab>
      <tab title="tab 2 title" icon="Star">
        <button class="btn btn--primary">content in tab 2</button>
        <p>tab 2 ajsdl skdjfh</p>
        <button class="btn btn--primary">content in tab 2</button>
        <button class="btn btn--primary">content in tab 2</button>
      </tab>
      <tab title="tab 3 title" icon="TomatoSplat">
        <p>tab 3 ajsdl skdjfh</p>
        <button class="btn btn--primary">content in tab 3</button>
      </tab>
    </tabs>
    <button class="mt-2 btn btn--primary">Content below tabs</button>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import Tabs from '@/components/Tabs.vue';
import Tab from '@/components/Tab.vue';

export default defineComponent({
  name: 'ExampleTabs',
  components: {
    Tabs,
    Tab,
  },
});
</script>
