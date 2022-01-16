<template>
  <layout>
    <hero-app
      title="Library lorem ipsum dolor sit amet asdkjahsdaksjdhaksjd kdjfhskdfj "
      :actions="contextMenuActions"
      @share="handleShare"
      :showBackButton="true"
      class="hero-class-test"
    >
      <!-- <h1>aaaaaaaaa</h1> -->
      <template v-slot:stickyContent>
        <div class="container">
          <p>sticky content</p>
        </div>
      </template>
    </hero-app>
    <div class="container d-flex justify-between">
      <base-button>
        <base-icon>
          <icon-sort />
        </base-icon>
        <span>Alphabetical</span>
      </base-button>
      <base-button @click="changeDisplayMode">
        <span class="visually-hidden">Change grid/list display mode</span>
        <base-icon transition="scale">
          <icon-grid-view v-if="displayMode === 'grid'" />
          <icon-list-view v-else-if="displayMode === 'list'" />
        </base-icon>
      </base-button>
    </div>

    <div style="height: 150vh"></div>
  </layout>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import Layout from '@/layouts/Main.vue';
import HeroApp from '@/components/HeroApp.vue';
import BaseButton from '@/components/base/BaseButton.vue';
import BaseIcon from '@/components/base/BaseIcon.vue';
import IconSort from '@/components/icons/IconSort.vue';
import IconGridView from '@/components/icons/IconGridView.vue';
import IconListView from '@/components/icons/IconListView.vue';

export default defineComponent({
  name: 'Library',
  components: {
    Layout,
    HeroApp,
    BaseButton,
    BaseIcon,
    IconSort,
    IconGridView,
    IconListView,
  },
  data() {
    return {
      displayMode: 'grid',
      contextMenuActions: [
        {
          label: 'Share',
          emit: 'share',
          icon: 'Share',
        },
        {
          label: 'Share',
          emit: 'share',
          icon: 'Share',
        },
      ],
    };
  },
  methods: {
    changeDisplayMode(): void {
      if (this.displayMode === 'grid') {
        this.displayMode = 'list';
      } else {
        this.displayMode = 'grid';
      }
    },
    handleShare() {
      console.log('SHARING CLICKED');
    },
  },
});
</script>
