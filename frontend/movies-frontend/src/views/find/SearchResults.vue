<template>
  <layout>
    <div class="container container--xxs">
      <base-spacer size="4" />
      <h1 class="visually-hidden">Search results page</h1>
      <input type="search" v-model="searchVal" />
    </div>

    <div class="container">
      <div class="mt-2 d-flex justify-center" v-if="loading">
        <loader message="Loading searchresults" class="d-flex flex-column align-center" />
      </div>
      <div v-else-if="results.length > 0">
        <div class="results-header d-flex mt-1 justify-between align-center">
          <p class="mb-0">
            {{ results.length }} results for <strong class="text-primary">"{{ searchVal }}"</strong>
          </p>
          <div class="sorting">
            <select v-model="currentSort">
              <option value="sort1">Sorting 1</option>
              <option value="sort2">Sorting 2 lorem ipsum</option>
              <option value="sort3">Sort 3</option>
            </select>
          </div>
        </div>
        <div class="">
          <h2>filters go here</h2>
        </div>
        <div class="search__results-highlighted" v-if="searchVal">
          <section-header class="mt-1 mb" :title="`Popular results for &quot;${searchVal}&quot;`" />

          <horizontal-scroller>
            <horizontal-scroller-item
              v-for="(result, index) in highlightedResults"
              :key="index"
              class="col-4"
            >
              <div class="card p-1">
                <p>{{ result.title }}</p>
              </div>
            </horizontal-scroller-item>
          </horizontal-scroller>

          <!-- If there's popular results AND normal results, we want to show this section header, to clearly label popular and normal -->
          <section-header class="mt-1 mb" title="Results" />
        </div>
        <div class="search__results">
          <div class="row row--equal-height">
            <div class="col-12 col-sm-4" v-for="(result, index) in results" :key="index">
              <article class="card p-1">
                <p>{{ result.name }}</p>
              </article>
            </div>
          </div>
        </div>
        <p>
          Can't find what you're looking for? Try adjusting your search, or explore the extensive
          list of
          <!-- TODO: hash doesn't scroll to it -->
          <router-link :to="{ name: 'Find', hash: '#genrelist' }" class="link">
            Genres
          </router-link>
        </p>
      </div>
      <div v-else-if="!typing && searchVal">
        <div class="row row--equal-height">
          <div class="col-12 col-sm-9">
            <div>
              <h2 class="h3 mt-2">
                Sorry, we couldn't find any results matching
                <span class="text-primary">"{{ searchVal }}"</span>
              </h2>

              <p>Try adjusting your search using these suggestions:</p>
              <ul>
                <li>Make sure that all words are spelled correctly.</li>
                <li>Try different keywords.</li>
                <li>Try more general keywords.</li>
                <li>Try fewer keywords.</li>
              </ul>
              <p>
                You can also explore the extensive list of
                <router-link :to="{ name: 'Find', hash: '#genrelist' }" class="link">
                  Genres
                </router-link>
              </p>
            </div>
          </div>
          <div class="col-12 col-sm-3">
            <div class="container container--xxs mt-2 mb-2 d-flex align-center justify-center">
              <img src="@/assets/no-results.svg" alt="" width="200" />
            </div>
          </div>
        </div>
      </div>
      <div v-else-if="!typing">
        <h2 class="h3 mt-2 text-center">
          Begin typing and your search results will appear right here before you 🎉
        </h2>
      </div>
    </div>
  </layout>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import Layout from '@/layouts/Main.vue';
import Loader from '@/components/Loader.vue';
import SectionHeader from '@/components/SectionHeader.vue';
import HorizontalScroller from '@/components/HorizontalScroller.vue';
import HorizontalScrollerItem from '@/components/HorizontalScrollerItem.vue';
import BaseSpacer from '@/components/base/BaseSpacer.vue';

export default defineComponent({
  name: 'SearchResults',
  components: {
    Layout,
    Loader,
    BaseSpacer,
    SectionHeader,
    HorizontalScroller,
    HorizontalScrollerItem,
  },
  data() {
    return {
      loading: true,
      results: [] as Record<string, unknown>[],
      searchVal: '',
      currentSort: 'sort1',
      debounceFunc: undefined as number | undefined,
      typing: false,
    };
  },
  computed: {
    highlightedResults() {
      return [
        { title: 'popular item 1' },
        { title: 'popular item 2' },
        { title: 'popular item 3' },
        { title: 'popular item 4' },
        { title: 'popular item 5' },
        { title: 'popular item 6' },
      ];
      // return this.results
      //   .filter((item) => {
      //     return item.imdbRating > 90;
      //   })
      //   .slice(0, 6);
    },
  },
  methods: {
    fetchResults(): void {
      this.typing = false;
      this.$router.replace({ ...this.$route, query: { ...this.$route.query, q: this.searchVal } });
      if (!this.searchVal) return;

      this.loading = true;

      fetch('https://jsonplaceholder.typicode.com/comments?q=' + this.searchVal)
        .then((res) => res.json())
        .then((data) => {
          this.loading = false;
          this.results = data;
        })
        .catch((err) => {
          this.loading = false;
          alert(err);
        });
    },
  },
  created() {
    if (this.$route.query.q) {
      this.searchVal = this.$route.query.q as string;
    } else {
      this.loading = false;
    }
  },
  watch: {
    searchVal() {
      if (this.searchVal) {
        this.typing = true;
      } else {
        this.typing = false;
        this.results = [];
      }

      clearTimeout(this.debounceFunc);
      this.debounceFunc = setTimeout(this.fetchResults, 300);
    },
  },
});
</script>
