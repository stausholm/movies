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

    <h2 class="mt-2">Searchbar with changing searchApi (simple filters)</h2>
    <search-bar
      :searchableProperty="variableSearchableProperty"
      :searchApi="variableApiEndpoint"
      @error="handleSearchError"
      @search="handleSearchString"
      @suggestion="handleSuggestion"
    >
      <template #filters>
        <button
          @click="changeEndpoint('comments')"
          :style="{ backgroundColor: activeFilter === 'comments' ? 'green' : null }"
        >
          comments
        </button>
        <button
          @click="changeEndpoint('posts')"
          :style="{ backgroundColor: activeFilter === 'posts' ? 'green' : null }"
        >
          posts
        </button>
        <button
          @click="changeEndpoint('users')"
          :style="{ backgroundColor: activeFilter === 'users' ? 'green' : null }"
        >
          users
        </button>
      </template>
    </search-bar>

    <h2 class="mt-2">Recorder</h2>
    <recorder-button
      @query="handleVoiceQuery"
      @partialQuery="handlePartialVoiceQuery"
      @permissionDenied="handleVoicePermissionDenied"
      @unsupported="handleVoiceNotSupported"
      @unsupportedCreated="handleVoiceNotSupportedCreated"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import SearchBar from '@/components/SearchBar.vue';
import { checkOffline } from '@/utils/networkConnection';
import RecorderButton from '@/components/RecorderButton.vue';

export default defineComponent({
  name: 'ExampleSearch',
  components: {
    SearchBar,
    RecorderButton,
  },
  data() {
    return {
      variableApiEndpoint: 'https://jsonplaceholder.typicode.com/comments?q=',
      variableSearchableProperty: 'name',
      activeFilter: 'comments',
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
          title: 'Cherries',
          taste: 'yum',
        },
        {
          title: 'Lemon',
          taste: 'sour',
        },
        {
          title: 'Pear',
          taste: 'sweet',
        },
        {
          title: 'Pineapple',
          taste: 'sweet',
        },
        {
          title: 'Tomato',
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
      this.$router.push({ name: 'SearchResults', query: { q: query } });
    },
    handleSuggestion(suggestion: Record<string, unknown>): void {
      console.log('clicked suggestion', suggestion);
    },
    changeEndpoint(type: string): void {
      if (type === 'posts') {
        this.variableApiEndpoint = 'https://jsonplaceholder.typicode.com/posts?q=';
        this.variableSearchableProperty = 'title';
        this.activeFilter = 'posts';
      }
      if (type === 'comments') {
        this.variableApiEndpoint = 'https://jsonplaceholder.typicode.com/comments?q=';
        this.variableSearchableProperty = 'name';
        this.activeFilter = 'comments';
      }
      if (type === 'users') {
        this.variableApiEndpoint = 'https://jsonplaceholder.typicode.com/users?q=';
        this.variableSearchableProperty = 'website';
        this.activeFilter = 'users';
      }
    },
    handleVoiceQuery(query: string) {
      console.log('QUERY', query);
    },
    handlePartialVoiceQuery(query: string) {
      console.log('PARTIAL QUERY', query);
    },
    handleVoicePermissionDenied() {
      console.log('VOICE DENIED');
    },
    handleVoiceNotSupported() {
      console.log('VOICE NOT SUPPORTED');
    },
    handleVoiceNotSupportedCreated() {
      console.log('VOICE NOT SUPPORTED CREATED HOOK');
    },
  },
});
</script>
