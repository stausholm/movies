<template>
  <div class="container">
    <h2>Accordion</h2>
    <h3>Allow multiple open</h3>
    <accordion :allowMultiple="true" id="aa">
      <accordion-item title="title lorem">
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
      </accordion-item>
      <accordion-item title="title lorem">
        <p>qwetur sdkhfg jk hkfdjhg kdjfhg .</p>
      </accordion-item>
      <accordion-item title="title lorem">
        <p>qwetur sdkhfg jk hkfdjhg kdjfhg .</p>
      </accordion-item>
      <accordion-item title="title lorem">
        <p>qwetur sdkhfg jk hkfdjhg kdjfhg .</p>
      </accordion-item>
    </accordion>
    <h3>Don't allow multiple open</h3>
    <accordion :allowMultiple="false" id="bb">
      <accordion-item title="title lorem">
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
      </accordion-item>
      <accordion-item title="title lorem">
        <p>qwetur sdkhfg jk hkfdjhg kdjfhg .</p>
      </accordion-item>
    </accordion>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import Accordion from '@/components/Accordion.vue';
import AccordionItem from '@/components/AccordionItem.vue';

export default defineComponent({
  name: 'ExampleAccordion',
  components: {
    Accordion,
    AccordionItem,
  },
});
</script>
