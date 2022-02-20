<template>
  <div class="">
    <div class="container container--small">
      <div class="theme-tertiary p-1 rounded shadow-sm">
        <h2>HorizontalScroller</h2>
        <button class="btn btn--primary mr" @click="addItem">add item</button>
        <button class="btn btn--primary" @click="removeItem">remove item</button>
      </div>
    </div>
    <horizontal-scroller
      containerSize="small"
      @intersect="loadMore"
      intersectionMargin="100px"
      :showScrollbar="true"
      :scrollSnap="false"
    >
      <horizontal-scroller-item v-for="item in items" :key="item.id">
        <div class="card">
          <a href="#">
            <h2>{{ item.id }}</h2>
            <p>{{ item.title }}</p>
          </a>
        </div>
      </horizontal-scroller-item>
      <horizontal-scroller-item v-if="loading">
        <h2>Loading more</h2>
      </horizontal-scroller-item>
      <horizontal-scroller-item v-if="allDataLoaded">
        <h2>All items has been loaded</h2>
      </horizontal-scroller-item>
    </horizontal-scroller>

    <horizontal-scroller containerSize="small" class="mt-2">
      <horizontal-scroller-item v-for="item in 3" :key="item">
        <base-card
          :title="`Title ${item}`"
          to="/library"
          type="image"
          imgUrl="todo"
          class="card--image-1x1 card--image-hide-title"
        >
          <!-- <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Recusandae, reiciendis?</p> -->
        </base-card>
      </horizontal-scroller-item>
      <horizontal-scroller-item>
        <div class="d-flex align-center justify-center flex-column card" style="height: 100%">
          <span class="btn btn--rounded btn--primary">
            <base-icon-async name="ArrowRight" />
          </span>
          <span class="text-big fw-bold">See all</span>
        </div>
      </horizontal-scroller-item>
    </horizontal-scroller>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import HorizontalScroller from '@/components/HorizontalScroller.vue';
import HorizontalScrollerItem from '@/components/HorizontalScrollerItem.vue';
import BaseCard from '@/components/base/BaseCard.vue';
import BaseIconAsync from '@/components/base/BaseIconAsync.vue';

export default defineComponent({
  name: 'ExampleHorizontalScroller',
  components: {
    HorizontalScroller,
    HorizontalScrollerItem,
    BaseCard,
    BaseIconAsync,
  },
  data() {
    return {
      loading: false,
      allDataLoaded: false,
      items: [
        {
          albumId: 1,
          id: 1,
          title: 'accusamus beatae ad facilis cum similique qui sunt',
          url: 'https://via.placeholder.com/600/92c952',
          thumbnailUrl: 'https://via.placeholder.com/150/92c952',
        },
        {
          albumId: 1,
          id: 2,
          title: 'reprehenderit est deserunt velit ipsam',
          url: 'https://via.placeholder.com/600/771796',
          thumbnailUrl: 'https://via.placeholder.com/150/771796',
        },
        {
          albumId: 1,
          id: 3,
          title: 'officia porro iure quia iusto qui ipsa ut modi',
          url: 'https://via.placeholder.com/600/24f355',
          thumbnailUrl: 'https://via.placeholder.com/150/24f355',
        },
        {
          albumId: 1,
          id: 4,
          title: 'culpa odio esse rerum omnis laboriosam voluptate repudiandae',
          url: 'https://via.placeholder.com/600/d32776',
          thumbnailUrl: 'https://via.placeholder.com/150/d32776',
        },
        {
          albumId: 1,
          id: 5,
          title: 'natus nisi omnis corporis facere molestiae rerum in',
          url: 'https://via.placeholder.com/600/f66b97',
          thumbnailUrl: 'https://via.placeholder.com/150/f66b97',
        },
        {
          albumId: 1,
          id: 6,
          title: 'accusamus ea aliquid et amet sequi nemo',
          url: 'https://via.placeholder.com/600/56a8c2',
          thumbnailUrl: 'https://via.placeholder.com/150/56a8c2',
        },
        {
          albumId: 1,
          id: 7,
          title: 'officia delectus consequatur vero aut veniam explicabo molestias',
          url: 'https://via.placeholder.com/600/b0f7cc',
          thumbnailUrl: 'https://via.placeholder.com/150/b0f7cc',
        },
        {
          albumId: 1,
          id: 8,
          title: 'aut porro officiis laborum odit ea laudantium corporis',
          url: 'https://via.placeholder.com/600/54176f',
          thumbnailUrl: 'https://via.placeholder.com/150/54176f',
        },
        {
          albumId: 1,
          id: 9,
          title: 'qui eius qui autem sed',
          url: 'https://via.placeholder.com/600/51aa97',
          thumbnailUrl: 'https://via.placeholder.com/150/51aa97',
        },
        {
          albumId: 1,
          id: 10,
          title: 'beatae et provident et ut vel',
          url: 'https://via.placeholder.com/600/810b14',
          thumbnailUrl: 'https://via.placeholder.com/150/810b14',
        },
        {
          albumId: 1,
          id: 11,
          title: 'nihil at amet non hic quia qui',
          url: 'https://via.placeholder.com/600/1ee8a4',
          thumbnailUrl: 'https://via.placeholder.com/150/1ee8a4',
        },
        {
          albumId: 1,
          id: 12,
          title: 'mollitia soluta ut rerum eos aliquam consequatur perspiciatis maiores',
          url: 'https://via.placeholder.com/600/66b7d2',
          thumbnailUrl: 'https://via.placeholder.com/150/66b7d2',
        },
        {
          albumId: 1,
          id: 13,
          title: 'repudiandae iusto deleniti rerum',
          url: 'https://via.placeholder.com/600/197d29',
          thumbnailUrl: 'https://via.placeholder.com/150/197d29',
        },
        {
          albumId: 1,
          id: 14,
          title: 'est necessitatibus architecto ut laborum',
          url: 'https://via.placeholder.com/600/61a65',
          thumbnailUrl: 'https://via.placeholder.com/150/61a65',
        },
        {
          albumId: 1,
          id: 15,
          title: 'harum dicta similique quis dolore earum ex qui',
          url: 'https://via.placeholder.com/600/f9cee5',
          thumbnailUrl: 'https://via.placeholder.com/150/f9cee5',
        },
      ],
    };
  },
  methods: {
    addItem() {
      this.items.push({
        albumId: 1,
        id: Math.random() * Math.random(),
        title: 'yoyo' + Math.random(),
        url: 'https://via.placeholder.com/600/197d29',
        thumbnailUrl: 'https://via.placeholder.com/150/197d29',
      });
    },
    removeItem() {
      this.items.pop();
    },
    loadMore() {
      console.log('swiper intersect');
      if (this.allDataLoaded) return;

      this.loading = true;

      setTimeout(() => {
        this.loading = false;
        if (this.items.length < 25) {
          this.addItem();
          this.addItem();
          this.addItem();
        } else {
          this.allDataLoaded = true;
        }
      }, 1200);
    },
  },
});
</script>
