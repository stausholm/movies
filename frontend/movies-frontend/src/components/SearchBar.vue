<template>
  <div class="search-bar">
    <form role="search" class="search-bar__form" @submit.prevent>
      <label :for="id" class="visually-hidden">Search</label>
      <input
        type="search"
        :id="id"
        :placeholder="placeholder"
        autocomplete="off"
        ref="searchinput"
        v-model="searchVal"
        name="q"
        @input="handleInput"
        @focus="handleFocus"
        @blur="handleBlur"
        @keydown.down.prevent="down"
        @keydown.up.prevent="up"
        @keydown.enter.prevent="enter"
        @keydown.esc.prevent="esc"
        @keyup.delete="handleDelete"
        class="js-search-input-field"
      />
      <button type="submit" @click="searchForString(searchVal)">
        <span class="visually-hidden">Search</span>
        <base-icon>
          <icon-search />
        </base-icon>
      </button>
      <transition name="button-transition">
        <button type="reset" v-if="searchVal" @click="reset" @mousedown.prevent>
          <span class="visually-hidden">Clear search</span>
          <base-icon>
            <icon-close />
          </base-icon>
        </button>
        <button type="button" v-else-if="!searchVal">
          <!-- TODO: implement -->
          <span class="visually-hidden">Search by voice</span>
          <base-icon>
            <icon-microphone />
          </base-icon>
        </button>
      </transition>
    </form>
    <aside
      class="search-bar__suggestions"
      aria-label="Search suggestions"
      :aria-hidden="!showDropdown"
      v-show="showDropdown"
      @mousedown.prevent
    >
      <div role="status" aria-live="polite">
        <span class="visually-hidden" v-if="showSuggestions">
          <span class="amount">{{ searchMatchesSliced.length }}</span>
          search suggestions of {{ totalResults }} for
          <span class="query">"{{ oldVal }}"</span>
          shown below:
        </span>
        <span class="visually-hidden" v-if="showNoResults">No matches found</span>
      </div>
      <loader v-if="showLoading" class="loader" />
      <div v-else-if="showNoResults" class="no-results">
        <p>No matches found</p>
      </div>
      <div v-else-if="showSuggestions" class="suggestions">
        <ul>
          <li
            v-for="(suggestion, index) in searchMatchesSliced"
            :key="suggestion[searchableProperty]"
            :class="{ active: index === searchHighlightIndex }"
          >
            <slot
              :suggestion="suggestion"
              :suggestionSelected="suggestionSelected"
              :active="index === searchHighlightIndex"
              :highlightmatch="highlightmatch"
              :searchableProperty="searchableProperty"
              :oldVal="oldVal"
            >
              <button @click="suggestionSelected(suggestion)" @mousedown.prevent>
                <span v-html="highlightmatch(suggestion[searchableProperty], oldVal)"></span>
              </button>
            </slot>
          </li>
        </ul>
        <button
          v-if="totalResults > searchMatchesSliced.length"
          @click="searchForString(oldVal)"
          @mousedown.prevent
        >
          Show all results
          <span class="visually-hidden">matching "{{ oldVal }}"</span>
          ({{ totalResults }})
        </button>
      </div>
      <ul v-else-if="showRecentSearches" class="recent-searches">
        <li
          v-for="(query, index) in recentSearches"
          :key="query"
          :class="{ active: index === searchHighlightIndex }"
        >
          <button @mousedown.prevent @click="useRecentQuery(query)" class="btn">
            <base-icon>
              <icon-clock />
            </base-icon>
            <span>{{ query }}</span>
          </button>
          <button @mousedown.prevent @click="removeRecentQuery(query)" class="btn">
            <span class="visually-hidden">Remove "{{ query }}" from recent searches</span>
            <base-icon>
              <icon-close />
            </base-icon>
          </button>
        </li>
      </ul>
    </aside>
    <transition name="fade">
      <div class="search-overlay" aria-hidden="true" v-if="showDropdown"></div>
    </transition>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';
import BaseIcon from '@/components/base/BaseIcon.vue';
import IconSearch from '@/components/icons/IconSearch.vue';
import IconMicrophone from '@/components/icons/IconMicrophone.vue';
import IconClose from '@/components/icons/IconClose.vue';
import IconClock from '@/components/icons/IconClock.vue';
import { LATEST_SEARCHES_STORAGE_KEY } from '@/constants/SiteSettings.json';
import Loader from '@/components/Loader.vue';

// accessibility resources: https://bbc.github.io/gel/components/search/

export default defineComponent({
  name: 'SearchBar',
  emits: ['error', 'search', 'suggestion'],
  components: {
    BaseIcon,
    IconSearch,
    IconMicrophone,
    IconClose,
    IconClock,
    Loader,
  },
  props: {
    focusOnMount: {
      type: Boolean,
      default: false,
    },
    placeholder: {
      type: String,
      default: 'Search...',
    },
    id: {
      type: String,
      default: 'searchbar-input',
    },
    showRecents: {
      type: Boolean,
      default: true,
    },
    searchableProperty: {
      type: String,
      required: true,
    },
    totalResultsProperty: {
      // The property on the searchApi response that tells how many total results exist for the seach query.
      // If not provided, assume that the length of the searchApi response is the length of results
      type: String,
      default: '',
    },
    searchApi: {
      type: String,
    },
    resultsSync: {
      // If for some reason you only want this component to search through a list of existing results, without calling any searchApi
      // you can provide an array of all the results, and they will be handled here
      type: Array as PropType<Record<string, unknown>[]>,
    },
  },
  data() {
    return {
      searchVal: '',
      oldVal: '',
      recentSearches: [] as string[],
      maxRecentsShown: 5,
      searchHighlightIndex: -1,
      results: [] as Record<string, unknown>[],
      debounceFunc: undefined as number | undefined,
      loading: false,
      maxResultsShown: 5,
      totalResults: 0,
      showDropdown: false,
      updateSearchVal: true, // handles if searchVal should be updated, while navigating suggestions with keyboard
      typing: false, // is user actively typing
    };
  },
  computed: {
    // This is only really useful if we want to filter the shown suggestions in the frontend to only include suggestions where the searchableProperty contains the searchVal
    // searchMatches() {
    //   const valToMatch = this.updateSearchVal ? this.searchVal : this.oldVal;
    //   // if oldVal, user is navigating the list, so don't update the results to match searchVal
    //   return this.results.filter((item) => {
    //     return item[this.searchableProperty]
    //       .toUpperCase()
    //       .match(valToMatch.toUpperCase().replace(/\s+/g, '.+'));
    //   });
    // },
    searchMatchesSliced() {
      // return this.searchMatches.slice(0, this.maxResultsShown);
      return this.results.slice(0, this.maxResultsShown);
    },
    showLoading(): boolean {
      return this.loading;
    },
    showNoResults(): boolean {
      if (this.showLoading) return false;
      if (this.typing) return false;
      if (this.oldVal === '') return false;
      if (this.totalResults > 0) return false;

      return true;
    },
    showSuggestions(): boolean {
      if (this.showLoading) return false;
      if (this.showNoResults) return false;

      if (this.oldVal === '') return false;
      if (this.totalResults === 0) return false;

      return true;
    },
    showRecentSearches(): boolean {
      if (this.showSuggestions) return false;
      if (this.oldVal && !this.showLoading) return false;
      if (!this.showRecents) return false;
      if (this.recentSearches.length === 0) return false;

      return true;
    },
  },
  methods: {
    reset(): void {
      this.searchVal = '';
      this.oldVal = '';
      this.searchHighlightIndex = -1;
      this.focusInput();
      this.updateSearchVal = true;
    },
    handleInput(): void {
      // reset active highlight
      this.searchHighlightIndex = -1;

      this.updateSearchVal = true;
      this.oldVal = this.searchVal;
    },
    handleFocus(): void {
      this.showDropdown = true;
    },
    handleBlur(): void {
      this.showDropdown = false;
    },
    handleDelete(): void {
      if (this.showRecentSearches && this.searchHighlightIndex !== -1) {
        // delete key pressed while a recent search item is highlighted. Delete it
        this.removeRecentQuery(this.recentSearches[this.searchHighlightIndex]);
      }
    },
    up(): void {
      if (!this.canNavigateSuggestions()) return;

      if (this.searchHighlightIndex === 0) {
        this.searchHighlightIndex = -1; // -1 = nothing is highlighted
        this.searchVal = this.oldVal; // restore old search value
      } else if (this.searchHighlightIndex === -1) {
        this.oldVal = this.searchVal; // store searchVal
        this.searchHighlightIndex = this.showSuggestions
          ? this.searchMatchesSliced.length - 1
          : this.recentSearches.length - 1; // loop around to the last suggestion
        this.updateSearchValFromKeyboardNavigation();
      } else {
        this.searchHighlightIndex--; // move up one suggestion
        this.updateSearchValFromKeyboardNavigation();
      }

      this.updateSearchVal = false; // prevent searchVal from being changed while navigating list
    },
    down(): void {
      if (!this.canNavigateSuggestions()) return;

      const suggestionsLength = this.showSuggestions
        ? this.searchMatchesSliced.length
        : this.recentSearches.length;

      if (this.searchHighlightIndex < suggestionsLength - 1) {
        this.searchHighlightIndex++; // highlight the suggestion below
        this.updateSearchValFromKeyboardNavigation();
      } else {
        // at the bottom. Loop around to the top
        this.searchHighlightIndex = -1;
        this.searchVal = this.oldVal;
      }

      this.updateSearchVal = false; // prevent searchVal from being changed while navigating list
    },
    updateSearchValFromKeyboardNavigation(): void {
      this.searchVal = this.showSuggestions
        ? (this.searchMatchesSliced[this.searchHighlightIndex][this.searchableProperty] as string)
        : this.recentSearches[this.searchHighlightIndex];
    },
    canNavigateSuggestions(): boolean {
      if (this.showSuggestions || this.showRecentSearches) {
        return true;
      }
      return false;
    },
    esc(): void {
      this.reset();
    },
    enter(): void {
      const highlightedItem = this.showSuggestions
        ? this.searchMatchesSliced[this.searchHighlightIndex]
        : this.recentSearches[this.searchHighlightIndex];
      if (highlightedItem && this.showRecentSearches) {
        // highlighted item is a stored "previously searched for" query
        this.useRecentQuery(highlightedItem as string);
      } else if (highlightedItem && this.showSuggestions) {
        // highlighted item is a search suggestion result
        this.suggestionSelected(highlightedItem as Record<string, unknown>);
      } else if (this.oldVal) {
        // pressed enter while no item is highlighted, and user has entered a query
        this.searchForString(this.oldVal);
      }
      // don't do anything if enter is pressed with no value in the input, or no item is highlighted
    },
    focusInput(): void {
      (this.$refs.searchinput as HTMLInputElement).focus();
    },
    blurInput(): void {
      (this.$refs.searchinput as HTMLInputElement).blur();
    },
    // searching
    searchForString(val: string): void {
      if (!val) return;

      if (this.showRecents) {
        this.updateRecentQuery(val);
      }

      this.$emit('search', val);
      this.blurInput();
    },
    suggestionSelected(suggestion: Record<string, unknown>) {
      if (!suggestion) return;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const suggestionLabel = (suggestion[this.searchableProperty] as any).toString();

      if (this.showRecents) {
        this.updateRecentQuery(suggestionLabel);
      }

      this.searchVal = suggestionLabel;
      this.$emit('suggestion', suggestion);
      this.blurInput();
    },
    highlightmatch(wordsHtml: string, query: string) {
      if (!query) {
        // if searchQuery is empty, then just return the word instead of applying filter to every single letter
        // also don't try to add highlights to <td> elements with no value in them
        return wordsHtml;
      }
      const queryWords = `(${query.trim().split(' ').join('|')})`;
      const re = new RegExp(queryWords, 'ig'); // /(ht|m|l)/gi
      return wordsHtml.toString().replace(re, function (matchedTxt) {
        return `<span class="highlight">${matchedTxt}</span>`;
      });
    },
    // recent searches handling
    useRecentQuery(query: string): void {
      this.searchVal = query;
      this.handleInput();
    },
    updateRecentQuery(query: string): void {
      if (query) {
        if (this.recentSearches.includes(query)) {
          // move existing query to the first index
          this.recentSearches = [query, ...this.recentSearches.filter((x) => x !== query)];
        } else {
          // add new query as the first index
          this.recentSearches.unshift(query);
          this.recentSearches = this.recentSearches.slice(0, this.maxRecentsShown);
        }
        localStorage.setItem(LATEST_SEARCHES_STORAGE_KEY, JSON.stringify(this.recentSearches));
      }
    },
    removeRecentQuery(query: string): void {
      this.searchHighlightIndex = -1;
      this.searchVal = '';
      this.oldVal = '';
      this.recentSearches = this.recentSearches.filter((x) => x !== query);
      localStorage.setItem(LATEST_SEARCHES_STORAGE_KEY, JSON.stringify(this.recentSearches));
    },
    // get results
    fetchSuggestions(): void {
      this.typing = false;
      if (!this.oldVal) return;

      this.loading = true;

      fetch(this.searchApi + this.oldVal)
        .then((res) => res.json())
        .then((data) => {
          this.loading = false;
          this.results = data;

          if (this.totalResultsProperty) {
            // a property key has been defined, that indicates the response data contains a property with a count of total results
            this.totalResults = data[this.totalResultsProperty];
          } else {
            this.totalResults = data.length; // fallback to the length of the response
          }
        })
        .catch((err) => {
          this.loading = false;
          this.$emit('error', err);
        });
    },
  },
  watch: {
    oldVal() {
      this.results = [];
      this.totalResults = 0;
      if (this.oldVal) {
        this.typing = true;
      } else {
        this.typing = false;
      }

      if (this.searchApi) {
        clearTimeout(this.debounceFunc);
        this.debounceFunc = setTimeout(this.fetchSuggestions, 300);
      } else if (this.resultsSync) {
        this.typing = false;
        if (this.oldVal) {
          const valToMatch = this.updateSearchVal ? this.searchVal : this.oldVal;
          // if oldVal, user is navigating the list, so don't update the results to match searchVal

          // TODO: add typo tolerance
          this.results = this.resultsSync.filter((item) => {
            return (item[this.searchableProperty] as string | number)
              .toString()
              .toUpperCase()
              .match(valToMatch.toUpperCase().replace(/\s+/g, '.+'));
          });
          this.totalResults = this.results.length;
        } else {
          this.results = this.resultsSync;
          this.totalResults = this.resultsSync.length;
        }
        this.loading = false;
      }
    },
  },
  created() {
    if (!this.searchApi && !this.resultsSync) {
      console.error('[SearchBar]: Either a searchApi string or resultsSync prop must be provided');
    }
  },
  mounted() {
    if (this.focusOnMount) {
      this.focusInput();
    }
    if (this.showRecents) {
      const storedSearches = localStorage.getItem(LATEST_SEARCHES_STORAGE_KEY);
      if (storedSearches && storedSearches !== '[]') {
        this.recentSearches = JSON.parse(storedSearches) || [];
      }
    }
  },
  beforeUnmount() {
    clearTimeout(this.debounceFunc);
  },
});
</script>

<style lang="scss">
@use 'sass:math';
@import '@/design/variables/index.scss';
@import '@/design/mixins/index.scss';

.search-bar {
  min-width: 260px;
  position: relative;
  @include z-index(searchbar);

  &__form {
    position: relative;

    input {
      padding-left: $min-touch-target-size;
      padding-right: $min-touch-target-size;
    }

    button {
      position: absolute;
      top: 0;
      bottom: 0;
      border: 0;
      padding: 0;
      width: $min-touch-target-size;
      height: $min-touch-target-size;
      border-radius: 50%;
      line-height: 0;
      background-color: transparent;

      .icon {
        transition: color 0.125s ease-out, transform 0.125s ease-out;
      }

      @include hover() {
        .icon {
          color: $brand-primary;
          transform: scale(0.85);
        }
      }
    }

    button[type='submit'] {
      left: 0;
    }
    button[type='button'] {
      right: 0;
    }
    button[type='reset'] {
      right: 0;
    }
  }
  &__suggestions {
    background-color: $white;

    .highlight {
      font-weight: bold;
    }
    .active {
      background-color: red;
    }

    ul {
      list-style-type: none;
      margin: 0;
      padding: 0;

      li {
        &:not(:last-child) {
          border-bottom: 1px solid $gray-300;
        }
      }
    }

    .loader {
    }
    .no-results {
    }
    // TODO: reuse design from contextMenu component
    .suggestions {
    }
    .recent-searches {
    }
  }

  .search-overlay {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(0, 0, 0, 0.05);
    z-index: -1;
  }
}

.button-transition-enter-from,
.button-transition-leave-to {
  opacity: 0;
  transform: scale(0.7);
}
.button-transition-enter-active {
  transition: opacity 0.2s ease-out, transform 0.2s ease-out;
}
.button-transition-leave-active {
  transition: opacity 0.2s ease-out, transform 0.1s ease-out;
}
</style>
