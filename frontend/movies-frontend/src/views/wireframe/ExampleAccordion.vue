<template>
  <div class="container">
    <h2>Accordion</h2>
    also supports opening by url hash. Try #__acc-h--aa-0
    <h3>Allow multiple open</h3>
    <accordion :allowMultiple="true" id="aa" :showControls="true">
      <accordion-item title="title lorem" icon="Filmstrip">
        <p>
          Lorem ipsum dolor <code>lorem ipsum code</code> sit amet
          <a href="#">lorem ipsum link</a> consectetur
          <a href="#" class="link">lorem ipsum link with link class</a> adipisicing elit.
        </p>
        <label for="">Label</label>
        <input type="text" placeholder="text input" class="mb" />
        <button class="btn btn--primary btn--responsive">button</button>
        <base-note title="note title">
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Corporis nostrum accusantium
          non, animi hic maxime maiores tenetur harum natus odio. Distinctio numquam sit natus
          voluptatum modi, dolore fugit! Minima, vel!
        </base-note>
      </accordion-item>
      <accordion-item title="title lorem" :expandOnCreated="true">
        <p>qwetur sdkhfg jk hkfdjhg kdjfhg .</p>
      </accordion-item>
      <accordion-item title="title lorem">
        <p>qwetur sdkhfg jk hkfdjhg kdjfhg .</p>
      </accordion-item>
      <accordion-item title="">
        <p>qwetur sdkhfg jk hkfdjhg kdjfhg .</p>
      </accordion-item>
      <accordion-item title="" icon="Youtube">
        <template #header>
          <span class="d-flex flex-column">
            <span class="fw-bold text-big">Title lorem ipsum dolor</span>
            <span class="text-small">Subtitle lorem ipsum</span>
          </span>
        </template>
        <p>qwetur sdkhfg jk hkfdjhg kdjfhg .</p>
      </accordion-item>
      <accordion-item
        title="title lorem a title that is very long lorem ipsum dolor sit amet lorem ipsum dolor"
        icon="TomatoSplat"
      >
        <p>qwetur sdkhfg jk hkfdjhg kdjfhg .</p>
      </accordion-item>
    </accordion>
    <h3 class="mt-2">Don't allow multiple open</h3>
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
import BaseNote from '@/components/base/BaseNote.vue';

export default defineComponent({
  name: 'ExampleAccordion',
  components: {
    Accordion,
    AccordionItem,
    BaseNote,
  },
});
</script>
