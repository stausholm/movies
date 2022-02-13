<template>
  <div class="container">
    <h2>Cards</h2>
    <p>Cards should be rendered in lists when shown together</p>
    <ul>
      <li>Screen readers provide shortcuts to lists and between list items</li>
      <li>Screen readers enumerate the items so users know how many are available</li>
    </ul>
    <h3>standard cards</h3>
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
          <template #headerAction>
            <button>Header action</button>
          </template>
          <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Tempore, sed!</p>
        </base-card>
      </li>
      <li class="col-12 col-sm-4 col-xs-6">
        <base-card
          title="Card title aaaasasdashdgasj"
          :tags="['some tags', 'in an', 'array', 'asdjasdhkajshdaksjhd']"
        >
          <template #footer>
            <div class="d-flex justify-between align-center">
              aaaaa
              <context-menu-button
                :actions="contextMenuActions"
                @share="handleShare"
                @test="handleTest"
                id="b"
              />
            </div>
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
      <template #headerAction>
        <button>Header action</button>
      </template>
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

    <h3 class="mt-2">Type: media</h3>
    <div class="mb-1 p-2 theme-primary rounded shadow" style="position: relative; z-index: 1">
      <h4>Works on solid backgrounds with a z-index defined</h4>
      <base-card
        class="card--media-video card--media-cover p-1"
        title="Large title in two or more lines"
        headingLevel="h2"
        type="media"
        :tags="['Section', 'New']"
        to="/library"
        :imgUrl="imgUrl"
      >
        <template #headerAction>
          <context-menu-button
            :actions="contextMenuActions"
            :horizontalIcon="true"
            @share="handleShare"
            @test="handleTest"
            id="ddddd"
            :smallButton="true"
          />
        </template>
        <p>Subtitle</p>
        <template #footer>
          <p class="mb-0 text-small">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Magni, rerum in tenetur sint
            quisquam repellat!
          </p>
        </template>
      </base-card>
    </div>
    <ul class="row row--equal-height">
      <li class="col-12 col-sm-4 col-xs-6">
        <base-card title="Short title" type="media" tags="Section" :imgUrl="imgUrl"></base-card>
      </li>
      <li class="col-12 col-sm-4 col-xs-6">
        <base-card
          class="card--media-reverse"
          title="Short title"
          type="media"
          tags="Section"
          :imgUrl="imgUrl"
        >
          <p>Large description in two or more lines as an example for the component</p>
        </base-card>
      </li>
      <li class="col-12 col-sm-4 col-xs-6">
        <base-card
          class="card--media-reverse card--media-tagged"
          title="Short title"
          type="media"
          :tags="['Section', 'new', 'wow']"
          :imgUrl="imgUrl"
        >
          <p>Large description in two or more lines as an example for the component</p>
        </base-card>
      </li>
      <li class="col-12 col-sm-4 col-xs-6">
        <base-card
          class="card--media-cover"
          title="Large title in two or more lines"
          type="media"
          tags="Section"
          :imgUrl="imgUrl"
        >
          <template #footer>
            <div class="avatar-demo">
              <div class="avatar-demo-image"></div>
              <p>Name Surname</p>
            </div>
          </template>
        </base-card>
      </li>
      <li class="col-12 col-sm-4 col-xs-6">
        <base-card
          class="card--media-cover"
          title="Large title in two or more lines"
          type="media"
          tags="Section"
          ctaLabel="Read more"
          to="/library"
          :imgUrl="imgUrl"
        >
        </base-card>
      </li>
      <li class="col-12 col-sm-4 col-xs-6">
        <base-card
          class="card--media-cover card--media-tagged"
          title="Large title in two or more lines"
          type="media"
          :tags="['Section', 'New', 'lorem ipsum', 'dolor sit']"
          :imgUrl="imgUrl"
        >
          <!-- <template #headerAction>
            <context-menu-button
              :actions="contextMenuActions"
              :horizontalIcon="true"
              @share="handleShare"
              @test="handleTest"
              id="c"
              :smallButton="true"
            />
          </template> -->
          <p>Large description in two or more lines as an example for the component</p>
        </base-card>
      </li>
      <li class="col-12 col-sm-4 col-xs-6">
        <base-card title="Large title in two or more lines" type="media" :imgUrl="imgUrl">
          <template #headerAction>
            <context-menu-button
              :actions="contextMenuActions"
              :horizontalIcon="true"
              @share="handleShare"
              @test="handleTest"
              id="cc"
              :smallButton="true"
            />
          </template>
          <p>Subtitle</p>
        </base-card>
      </li>
      <li class="col-12 col-sm-4 col-xs-6">
        <base-card
          class="card--media-video"
          title="Large title in two or more lines"
          type="media"
          to="/library"
          :imgUrl="imgUrl"
        >
          <template #headerAction>
            <context-menu-button
              :actions="contextMenuActions"
              :horizontalIcon="true"
              @share="handleShare"
              @test="handleTest"
              id="c"
              :smallButton="true"
            />
          </template>
          <p>Subtitle</p>
        </base-card>
      </li>
      <li class="col-12 col-sm-4 col-xs-6">
        <base-card
          class="card--media-video card--media-cover"
          title="Large title in two or more lines"
          type="media"
          :tags="['Section', 'New']"
          to="/library"
          :imgUrl="imgUrl"
        >
          <template #headerAction>
            <context-menu-button
              :actions="contextMenuActions"
              :horizontalIcon="true"
              @share="handleShare"
              @test="handleTest"
              id="d"
            />
          </template>
          <p>Subtitle</p>
          <template #footer>
            <p class="mb-0 text-small">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Magni, rerum in tenetur sint
              quisquam repellat!
            </p>
          </template>
        </base-card>
      </li>
      <li class="col-12 col-sm-4 col-xs-6">
        <base-card
          class="card--media-tagged"
          title="Large title in two or more lines"
          type="media"
          :tags="['Section', 'New', 'more new', 'loremipsumdolorsiteamet']"
          to="/library"
          ctaLabel="Read more"
        >
          <template #footer>
            <a href="#">footer link</a>
          </template>
          <p>Subtitle</p>
        </base-card>
      </li>
      <li class="col-12 col-sm-8">
        <base-card
          class="card--media-video card--media-cover p-1"
          title="Large title in two or more lines"
          headingLevel="h2"
          type="media"
          :tags="['Section', 'New']"
          to="/library"
          :imgUrl="imgUrl"
        >
          <template #headerAction>
            <context-menu-button
              :actions="contextMenuActions"
              :horizontalIcon="true"
              @share="handleShare"
              @test="handleTest"
              id="dd"
              :smallButton="true"
            />
          </template>
          <p>Subtitle</p>
          <template #footer>
            <p class="mb-0 text-small">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Magni, rerum in tenetur sint
              quisquam repellat!
            </p>
          </template>
        </base-card>
      </li>
    </ul>

    <div style="height: 10vh"></div>
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
      imgUrl: '/img/posters/tt0085959_SX600.jpg',
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

<style lang="scss" scoped>
.avatar-demo {
  display: flex;
  align-items: center;

  p {
    margin-bottom: 0;
  }

  &-image {
    height: 40px;
    width: 40px;
    border-radius: 50%;
    margin-right: 8px;
    background-color: gray;
  }
}
</style>
