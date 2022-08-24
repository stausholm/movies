<template>
  <div class="container">
    <h2>Notes</h2>
    <button class="btn btn--primary mb-1" @click="borders = !borders">Toggle borders</button>
    <br />
    <button @click="testNote = !testNote">testNote: {{ testNote }}</button>
    <button @click="testNote = 10">testNote 10</button>
    <button @click="testNote = testNote + 1">testNote++</button>
    <button @click="testNote = testNote - 1">testNote--</button>

    <base-note
      class="mb-2"
      :bordered="borders"
      dismissable
      hideIcon
      v-model:visible="testNote"
      v-if="testNote"
      transition="fade"
      title="aasd asdasjhg asjdhg"
    >
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorem quas rem exercitationem
        eius vero! Distinctio, iure quo? Magnam minus earum illo tempora aliquam ea, ad tempore
        debitis repellendus, et suscipit!
      </p>
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Adipisci iure expedita provident
        aut hic cum ad molestias cumque maxime. Adipisci dolore dolorum iusto facilis ab aliquid
        cumque amet quis velit?
      </p>
    </base-note>
    <base-note class="mb-2" :bordered="borders" title="custom icon" icon="Filmstrip">
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Et, voluptatum adipisci minima
      exercitationem voluptas odit aperiam totam expedita
    </base-note>
    <base-note class="mb-2" :bordered="borders" title="No icon" :hideIcon="true">
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Et, voluptatum adipisci minima
      exercitationem voluptas odit aperiam totam expedita
    </base-note>
    <base-note class="mb-2" :bordered="borders" type="info" title="down the rabbit hole">
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Adipisci iure expedita provident
        aut hic cum ad molestias cumque maxime. Adipisci dolore dolorum iusto facilis ab aliquid
        cumque amet quis velit?
      </p>
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorem quas rem exercitationem
        eius vero! Distinctio, iure quo? <code>Magnam minus earum</code> illo tempora aliquam ea, ad
        tempore debitis repellendus, et suscipit!
      </p>
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Libero ex deleniti
        <a href="#" class="link">asperiores beatae expedita</a> alias numquam quod doloremque
        corporis velit voluptatibus facilis obcaecati quo atque, quisquam maxime reiciendis cumque
        magni.Fugit dignissimos odit nemo rerum molestias fuga quae magni nam beatae. Iusto eius
        nemo dolor neque rem molestias. Libero, ex animi! Necessitatibus, architecto quisquam vel
        deleniti repudiandae dolorum consequatur dignissimos?
      </p>
      <template #expanded>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Tenetur consectetur debitis et
          eaque eos, aliquam amet minima repudiandae nemo autem facilis explicabo obcaecati quas
          fugit. Quo, nihil. Hic, blanditiis ad.
        </p>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Tenetur consectetur debitis et
          eaque eos, aliquam amet minima repudiandae nemo autem facilis explicabo obcaecati quas
          fugit. Quo, nihil. Hic, blanditiis ad.
        </p>
      </template>
    </base-note>
    <base-note class="mb-2" :bordered="borders" type="warning" title="down the rabbit hole">
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Adipisci iure expedita provident
        aut hic cum ad molestias cumque maxime. Adipisci dolore dolorum iusto facilis ab aliquid
        cumque amet quis velit?
      </p>
      <code class="mb-1">asdasdh asjdgh adgh </code>
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorem quas rem exercitationem
        eius vero! Distinctio, iure quo? <code>Magnam minus earum</code> illo tempora aliquam ea, ad
        tempore debitis repellendus, et suscipit!
      </p>
      <p>Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
      <label for="">Label</label>
      <input type="text" placeholder="text input" class="mb" />
      <button class="btn btn--primary btn--responsive mb-1">button</button>
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Libero ex deleniti
        <a href="#" class="link">asperiores beatae expedita</a> alias numquam quod doloremque
        corporis velit voluptatibus facilis obcaecati quo atque, quisquam maxime reiciendis cumque
        magni.Fugit dignissimos odit nemo rerum molestias fuga quae magni nam beatae. Iusto eius
        nemo dolor neque rem molestias. Libero, ex animi! Necessitatibus, architecto quisquam vel
        deleniti repudiandae dolorum consequatur dignissimos?
      </p>
    </base-note>
    <base-note class="mb-2" :bordered="borders" type="success" title="down the rabbit hole">
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Adipisci iure expedita provident
        aut hic cum ad molestias cumque maxime. Adipisci dolore dolorum iusto facilis ab aliquid
        cumque amet quis velit?
      </p>
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorem quas rem exercitationem
        eius vero! Distinctio, iure quo? <code>Magnam minus earum</code> illo tempora aliquam ea, ad
        tempore debitis repellendus, et suscipit!
      </p>
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Libero ex deleniti
        <a href="#" class="link">asperiores beatae expedita</a> alias numquam quod doloremque
        corporis velit voluptatibus facilis obcaecati quo atque, quisquam maxime reiciendis cumque
        magni.Fugit dignissimos odit nemo rerum molestias fuga quae magni nam beatae. Iusto eius
        nemo dolor neque rem molestias. Libero, ex animi! Necessitatibus, architecto quisquam vel
        deleniti repudiandae dolorum consequatur dignissimos?
      </p>
    </base-note>
    <base-note class="mb-2" :bordered="borders" type="error" title="down the rabbit hole">
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Adipisci iure expedita provident
        aut hic cum ad molestias cumque maxime. Adipisci dolore dolorum iusto facilis ab aliquid
        cumque amet quis velit?
      </p>
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorem quas rem exercitationem
        eius vero! Distinctio, iure quo? <code>Magnam minus earum</code> illo tempora aliquam ea, ad
        tempore debitis repellendus, et suscipit!
      </p>
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Libero ex deleniti
        <a href="#" class="link">asperiores beatae expedita</a> alias numquam quod doloremque
        corporis velit voluptatibus facilis obcaecati quo atque, quisquam maxime reiciendis cumque
        magni.Fugit dignissimos odit nemo rerum molestias fuga quae magni nam beatae. Iusto eius
        nemo dolor neque rem molestias. Libero, ex animi! Necessitatibus, architecto quisquam vel
        deleniti repudiandae dolorum consequatur dignissimos?
      </p>
    </base-note>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import BaseNote from '@/components/base/BaseNote.vue';

export default defineComponent({
  name: 'ExampleNotes',
  components: {
    BaseNote,
  },
  data() {
    return {
      testNote: false as boolean | number,
      borders: false,
    };
  },
});
</script>
