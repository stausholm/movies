<template>
  <div class="container">
    <h2>Cards</h2>
    <p>Cards should be rendered in lists when shown together</p>
    <ul>
      <li>Screen readers provide shortcuts to lists and between list items</li>
      <li>Screen readers enumerate the items so users know how many are available</li>
    </ul>
    <h3>Default cards</h3>
    <ul class="row row--equal-height">
      <li class="col-12 col-sm-4 col-xs-6">
        <base-card title="Card title aaaasasdashdgasssdfsdfsdfsdfj">
          <p>aaaaaakhasd kjashd kjashd ad</p>
        </base-card>
      </li>
      <li class="col-12 col-sm-4 col-xs-6">
        <base-card
          title="Card title aaaasasdashdgasj"
          imgUrl="https://media.giphy.com/media/JIX9t2j0ZTN9S/giphy.gif"
          to="/library"
        >
          <p>aaaaaakhasd kjashd kjashd ad</p>
        </base-card>
      </li>
      <li class="col-12 col-sm-4 col-xs-6">
        <base-card
          title="Card title aaaasasdashdgasj"
          ctaLabel="Read more"
          tags="this is tags, neat"
          to="/"
        >
          <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Tempore, sed!</p>
        </base-card>
      </li>
      <li class="col-12 col-sm-4 col-xs-6">
        <base-card
          title="Card title aaaasasdashdgasj"
          :tags="['some tags', 'in an', 'array', 'asdjasdhkajshdaksjhd']"
        >
          <template #footer>
            aaaaa
            <context-menu-button
              :actions="contextMenuActions"
              @share="handleShare"
              @test="handleTest"
              id="b"
            />
          </template>
        </base-card>
      </li>
      <li class="col-12 col-sm-4 col-xs-6">
        <base-card title="Card title aaaasasdashdgasj" :to="{ name: 'Library' }">
          aaaaa
          <template #footer>
            card footer lorem
            <a href="#card-footer">footer link</a>
          </template>
        </base-card>
      </li>
    </ul>

    <h3 class="mt-2">Type: tip</h3>
    <base-card
      class="mb-2"
      :title="`Customize what you see in ${appName}`"
      headingLevel="h2"
      tags="Did you know?"
      type="tip"
      imgUrl="asd"
    >
      <p>Add or remove favourites, adjust app colors, animations, images & more</p>
      <template #footer>
        <router-link class="btn btn--text-primary" :to="{ name: 'Account' }">
          Go to Settings
        </router-link>
        <button class="btn btn--text">Got it</button>
      </template>
    </base-card>

    <base-card class="mb-2" title="Quick Access" type="tip" tags="Did you know?">
      <p>Use Quick Access to get around {{ appName }} quickly. Just press:</p>
      <!-- Button will open quick access menu -->
      <button class="btn btn--primary btn--uppercase">CTRL + K</button>
    </base-card>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import BaseCard from '@/components/base/BaseCard.vue';
import ContextMenuButton from '@/components/ContextMenuButton.vue';
import { APP_NAME } from '@/constants/SiteSettings.json';

export default defineComponent({
  name: 'ExampleCard',
  components: {
    BaseCard,
    ContextMenuButton,
  },
  data() {
    return {
      appName: APP_NAME,
      contextMenuActions: [
        {
          label: 'Share',
          emit: 'share',
          icon: 'Share',
        },
        {
          label: 'Test',
          emit: 'test',
          icon: 'Filmstrip',
        },
        {
          label: "a label that's a little longer longwordisverylongwithoutspacestesttesttesttest",
          emit: 'test',
        },
      ],
    };
  },
  methods: {
    handleShare() {
      console.log('SHARING CLICKED');
    },
    handleTest() {
      console.log('TEST CLICKED');
    },
  },
});
</script>
