<template>
  <div class="container">
    <h2>Search bar</h2>
    <search-bar
      searchableProperty="name"
      searchApi="https://jsonplaceholder.typicode.com/comments?q="
      @error="handleSearchError"
      @search="handleSearchString"
      @suggestion="handleSuggestion"
    />

    <h2 class="mt-2">Search bar with showRecents disabled</h2>
    <search-bar
      searchableProperty="name"
      searchApi="https://jsonplaceholder.typicode.com/comments?q="
      :showRecents="false"
      @error="handleSearchError"
      @search="handleSearchString"
      @suggestion="handleSuggestion"
    />

    <h2 class="mt-2">Search bar with custom rendering of results</h2>
    <search-bar
      searchableProperty="name"
      searchApi="https://jsonplaceholder.typicode.com/comments?q="
      @error="handleSearchError"
      @search="handleSearchString"
      @suggestion="handleSuggestion"
      v-slot="{ suggestion, highlightmatch, oldVal, searchableProperty, suggestionSelected }"
    >
      <div class="custom-result-item">
        <p>{{ suggestion.name }}</p>
        <p>{{ suggestion.email }}</p>
        <p>
          Match:
          <span v-html="highlightmatch(suggestion[searchableProperty], oldVal)"></span>
        </p>
        <button @click="suggestionSelected(suggestion)">Click me</button>
      </div>
    </search-bar>

    <h2 class="mt-2">Searchbar with broken searchApi endpoint</h2>
    <search-bar
      id="search-input-2"
      searchableProperty="name"
      searchApi="https://asdasdasdasdasdasdasdasdasd?q="
      @error="handleSearchError"
      @search="handleSearchString"
      @suggestion="handleSuggestion"
    />

    <h2 class="mt-2">Searchbar with SyncResults</h2>
    <search-bar
      id="search-input-3"
      searchableProperty="title"
      :resultsSync="syncResults"
      @error="handleSearchError"
      @search="handleSearchString"
      @suggestion="handleSuggestion"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import SearchBar from '@/components/SearchBar.vue';
import { checkOffline } from '@/utils/networkConnection';

export default defineComponent({
  name: 'ExampleSearch',
  components: {
    SearchBar,
  },
  data() {
    return {
      syncResults: [
        {
          title: 'Apple',
          taste: 'sweet',
        },
        {
          title: 'Banana',
          taste: 'sweet',
        },
        {
          title: 'Blueberry',
          taste: 'bad',
        },
        {
          title: 'Kiwi',
          taste: 'yum',
        },
        {
          title: 'Pear',
          taste: 'sweet',
        },
        {
          title: 'Pineapple',
          taste: 'sour',
        },
        {
          title: 'Water melon',
          taste: 'sweet',
        },
        {
          title: 'How to pineapple',
          taste: 'paper',
        },
      ],
    };
  },
  methods: {
    handleSearchError(err: unknown): void {
      console.log('AN ERROR IN SEARCH', err);

      // if we're not offline, something is wrong with the searchApi
      checkOffline();
    },
    handleSearchString(query: string): void {
      console.log('searched for string', query);

      // a normal usecase for this is when the user does not click on a permalink suggestion but submits the searchform with whatever their searchquery is.
      // in that case we would want to reroute the user to a searchresults page
      // this.$router.push({ name: 'SearchResults', query: { q: query } });
    },
    handleSuggestion(suggestion: Record<string, unknown>): void {
      console.log('clicked suggestion', suggestion);
    },
  },
});
</script>
