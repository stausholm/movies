<template>
  <div class="container">
    <h2>Tabs</h2>
    <p>Active tab index is {{ activeTab }}</p>
    <tabs id="aa" :activeOnCreated="activeTab" v-model="activeTab" transition="router-fade-right">
      <tab
        title="tab 1 title"
        icon="Filmstrip"
        @active="handleActive(0)"
        @unactive="handleUnactive(0)"
      >
        <p>tab 1 ajsdl skdjfh</p>
        <button class="btn btn--primary">content in tab 1</button>
      </tab>
      <tab title="tab 2 title" icon="Star" @active="handleActive(1)" @unactive="handleUnactive(1)">
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
      <tab title="tab 3 title" @active="handleActive(2)" @unactive="handleUnactive(2)">
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
  data() {
    return {
      activeTab: 2,
    };
  },
  methods: {
    handleActive(tab: number) {
      console.log('tab became active', tab);
    },
    handleUnactive(tab: number) {
      console.log('tab became UNactive', tab);
    },
  },
});
</script>
