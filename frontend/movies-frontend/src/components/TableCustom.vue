<template>
  <div class="table-component">
    <div class="table-controls mb" v-if="search">
      <label for="" class="visually-hidden">Search the table below</label>
      <input
        type="search"
        name="query"
        v-model="searchQuery"
        @input="movePages(0)"
        placeholder="Search..."
        autocomplete="off"
      />
    </div>
    <p class="table-pagination-showing-count mb mt ml" v-if="paginated">
      {{ countMessage }}
    </p>
    <div
      class="table-responsive table-wrapper"
      :class="{ overflowing: overflowingHorizontally.overflowing }"
      :tabindex="overflowingHorizontally.tabindex"
      :role="overflowingHorizontally.group"
      :aria-label="overflowingHorizontally.ariaLabel"
      ref="tablewrapper"
    >
      <table class="table" :class="[theme, { 'table--sortable': sortable }]">
        <thead class="table-header">
          <tr v-if="sortable">
            <th
              v-for="key in columns"
              :key="key.property"
              scope="col"
              role="columnheader"
              :aria-sort="sortKey === key.property ? sortDirection : 'none'"
            >
              {{ key.label }}
              <button @click="sortBy(key.property)" class="table-sort-btn btn--absolute-sized">
                <span class="visually-hidden"
                  >Sort by {{ key.label }} in
                  {{
                    sortKey !== key.property ||
                    (sortKey === key.property && sortDirection !== 'ascending')
                      ? 'ascending'
                      : 'descending'
                  }}
                  order</span
                >
                <svg class="icon" viewBox="0 0 100 200" width="10" height="20">
                  <polyline
                    v-if="
                      sortKey !== key.property ||
                      (sortKey === key.property && sortDirection !== 'descending')
                    "
                    points="20 50, 50 20, 80 50"
                  ></polyline>
                  <line x1="50" y1="20" x2="50" y2="180"></line>
                  <polyline
                    v-if="
                      sortKey !== key.property ||
                      (sortKey === key.property && sortDirection !== 'ascending')
                    "
                    points="20 150, 50 180, 80 150"
                  ></polyline>
                </svg>
              </button>
            </th>
          </tr>
          <tr v-else>
            <th v-for="key in columns" :key="key.property" scope="col">
              {{ key.label }}
            </th>
          </tr>
        </thead>
        <tbody class="table-body">
          <tr v-for="(entry, i) in dataPerPage" :key="'row' + i">
            <td
              v-html="
                highlightmatch(
                  Object.prototype.hasOwnProperty.call(entry, key.property) &&
                    entry[key.property].toString()
                    ? entry[key.property]
                    : $options.emptyValue,
                  searchQuery
                )
              "
              v-for="(key, j) in columns"
              :key="'data' + j + i"
            ></td>
          </tr>
        </tbody>
      </table>
    </div>
    <div class="table-no-data" v-if="search && filteredData.length === 0">
      No data that matches your search!
    </div>
    <div class="table-pagination mt" v-if="paginated">
      <div class="d-flex align-center justify-between">
        <div class="table-pagination__pagesize d-flex align-center mr-1">
          <span class="d-none d-sm-block mr" aria-hidden="true">Show</span>
          <label for="" class="visually-hidden">Show {{ rowsPerPage }} rows per page</label>
          <select name="" id="" v-model="rowsPerPage" @input="movePages(0)">
            <option v-for="pageSize in pageSizeMenu" :value="pageSize" :key="'size' + pageSize">
              {{ pageSize }}
            </option>
          </select>
          <span class="d-none d-sm-block ml" aria-hidden="true">rows per page</span>
          <span class="ml d-sm-none" aria-hidden="true">pr. page</span>
        </div>
        <div
          class="table-pagination__pageswitcher d-flex align-center justify-between"
          v-if="filteredData.length > rowsPerPage"
        >
          <p class="mb-0 d-none d-sm-block mr">
            Page {{ startRow / rowsPerPage + 1 }} of
            {{ Math.ceil(filteredData.length / rowsPerPage) }}
          </p>

          <div>
            <button class="btn mr" @click="movePages(-1)" :aria-disabled="startRow === 0">
              <span class="visually-hidden">Previous page</span>
              <base-icon>
                <icon-chevron-left />
              </base-icon>
            </button>
            <button
              class="btn"
              @click="movePages(1)"
              :aria-disabled="
                startRow / rowsPerPage + 1 === Math.ceil(filteredData.length / rowsPerPage)
              "
            >
              <span class="visually-hidden">Next page</span>
              <base-icon>
                <icon-chevron-right />
              </base-icon>
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';
import BaseIcon from '@/components/base/BaseIcon.vue';
import IconChevronRight from '@/components/icons/IconChevronRight.vue';
import IconChevronLeft from '@/components/icons/IconChevronLeft.vue';

// accessibility resources: https://inclusive-components.design/data-tables/

// TODO: support different data syntax like on https://inclusive-components.design/data-tables/

export default defineComponent({
  name: 'TableCustom',
  components: {
    BaseIcon,
    IconChevronRight,
    IconChevronLeft,
  },
  emptyValue: "<span class='no-val' aria-hidden='true'></span>",
  props: {
    data: {
      type: Array as PropType<Record<string, unknown>[]>,
      required: true,
    },
    columns: {
      type: Array as PropType<string[]>,
      required: true,
    },
    paginated: {
      type: Boolean,
      default: false,
    },
    search: {
      type: Boolean,
      default: false,
    },
    sortable: {
      type: Boolean,
      default: true,
    },
    theme: {
      type: String as PropType<'' | 'stripes'>,
      default: '',
    },
  },
  data() {
    return {
      searchQuery: '',
      sortKey: '',
      sortDirection: '' as 'ascending' | 'descending',
      startRow: 0,
      rowsPerPage: 10,
      pageSizeMenu: [10, 20, 50, 100],
      overflowingHorizontally: {
        overflowing: false,
        tabindex: null as null | 0,
        role: null as null | 'group',
        ariaLabel: null as null | string,
      },
    };
  },
  computed: {
    filteredData() {
      let data = this.data;
      let filterKey = this.searchQuery && this.searchQuery.toLowerCase();

      // text search filtering
      if (filterKey) {
        // search input has value, so filter based on this.searchQuery
        data = data.filter(function (row) {
          return Object.keys(row).some(function (key) {
            return String(row[key]).toLowerCase().indexOf(filterKey) > -1;
          });
        });
      }

      // table header sorting
      // ascending = lowest value top
      let sortKey = this.sortKey;
      let order = this.sortDirection === 'ascending' ? 1 : -1;
      if (sortKey) {
        data = data.slice().sort(function (a, b) {
          const aVal =
            // TODO: sorting everything as strings means numbers wont get sorted properly. e.g. '11' comes before '2'
            // you can call .toString() on everything supplied in this.data, so we don't care about the typecast to any
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            Object.prototype.hasOwnProperty.call(a, sortKey) && (a[sortKey] as any).toString()
              ? // eslint-disable-next-line @typescript-eslint/no-explicit-any
                (a[sortKey] as any).toString().toLowerCase()
              : '';
          const bVal =
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            Object.prototype.hasOwnProperty.call(b, sortKey) && (b[sortKey] as any).toString()
              ? // eslint-disable-next-line @typescript-eslint/no-explicit-any
                (b[sortKey] as any).toString().toLowerCase()
              : '';
          return (aVal === bVal ? 0 : aVal > bVal ? 1 : -1) * order;
        });
      }

      return data;
    },
    dataPerPage() {
      if (!this.paginated) return this.filteredData;

      return this.filteredData.filter(
        (item, index) => index >= this.startRow && index < this.startRow + this.rowsPerPage
      );
    },
    countMessage() {
      let startRow = this.startRow + 1;
      let endRow = startRow + this.dataPerPage.length - 1;
      let total = this.filteredData.length;
      return total === 0 ? '' : `Showing ${startRow} - ${endRow} of ${total}`;
    },
  },
  methods: {
    checkHorizontalOverflow(): void {
      const container = this.$refs.tablewrapper as HTMLElement | undefined;
      if (container) {
        const { scrollWidth, clientWidth } = container;
        const overflowing = scrollWidth > clientWidth;

        if (overflowing) {
          this.overflowingHorizontally = {
            overflowing: true,
            tabindex: 0,
            role: 'group',
            ariaLabel: 'Table (Scroll to see more)',
          };
        } else {
          this.overflowingHorizontally = {
            overflowing: false,
            tabindex: null,
            role: null,
            ariaLabel: null,
          };
        }
      }
    },
    highlightmatch(wordsHtml: string, query: string) {
      if (!query || wordsHtml === this.$options.emptyValue) {
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
    sortBy(key: string) {
      if (this.sortKey === key) {
        // clicked on the already active sortkey. Revert the sortDirection
        this.sortDirection = this.sortDirection === 'ascending' ? 'descending' : 'ascending';
      } else {
        this.sortKey = key;
        this.sortDirection = 'ascending';
      }
    },
    movePages(amount: number) {
      if (amount === 0) {
        // method called by pageSize select menu, reset back to first page
        return (this.startRow = 0);
      }
      let newStartRow = this.startRow + amount * this.rowsPerPage;

      if (newStartRow >= 0 && newStartRow < this.filteredData.length) {
        this.startRow = newStartRow;
      }
    },
  },
  mounted() {
    // TODO: resize listener / mutationobserver for checking horizontal overflow
    this.checkHorizontalOverflow();
  },
});
</script>

<style lang="scss">
@use 'sass:math';
@import '@/design/variables/index.scss';
@import '@/design/mixins/index.scss';

.table-responsive {
  overflow-x: auto;
  -webkit-overflow-scrolling: touch;
  // css horizontal scroll gradient
  // https://www.smashingmagazine.com/2019/01/table-design-patterns-web/#style-the-scroll
  $data-list-color: $white;
  background: linear-gradient(to right, $data-list-color 30%, rgba($data-list-color, 0)),
    linear-gradient(to right, rgba($data-list-color, 0), $data-list-color 70%) 0 100%,
    radial-gradient(
      farthest-side at 0% 50%,
      rgba(invert($data-list-color, 100), 0.2),
      rgba(invert($data-list-color, 100), 0)
    ),
    radial-gradient(
        farthest-side at 100% 50%,
        rgba(invert($data-list-color, 100), 0.2),
        rgba(invert($data-list-color, 100), 0)
      )
      0 100%;
  background-repeat: no-repeat;
  background-size: 40px 100%, 40px 100%, 14px 100%, 14px 100%;
  background-position: 0 0, 100%, 0 0, 100%;
  background-attachment: local, local, scroll, scroll;
}

.table-wrapper {
  background-color: $white;
  border-radius: $border-radius-base;
  box-shadow: $box-shadow-sm;
  border: 1px solid $gray-300;
}

.table {
  tbody,
  td,
  tfoot,
  th,
  thead,
  tr {
    border-color: inherit;
    border-style: solid;
    border-width: 0;
  }

  // caption-side: bottom;
  border-collapse: collapse;
  width: 100%;
  vertical-align: top;
  //border-top: 1px solid $gray-300;
  white-space: nowrap;
  // table-layout: fixed; // Could be nice to prevent columnwidth jumps when sorting=true and paginated=true, but won't work with white-space:nowrap;
  // min-width: 600px;

  > thead {
    vertical-align: bottom;
  }

  thead {
    th {
      border-top: 0;
      border-bottom: 0;
      font-weight: bold;
      border-bottom-color: currentColor;
    }
  }

  > tbody {
    vertical-align: inherit;
  }

  tr {
    border-color: $gray-300;
  }
  td,
  th {
    border-top: 1px solid $gray-300;
    padding: $default-spacing * 0.75;
    border-bottom-width: 0px;
    background-color: transparent;
  }

  &.stripes {
    > tbody > tr:nth-of-type(odd) {
      background-color: rgba($black, 0.035);
    }
  }

  &--sortable {
    thead {
      th {
        padding-top: math.div($default-spacing, 2);
        padding-bottom: math.div($default-spacing, 2);
      }
    }
  }

  // search specific
  .highlight {
    font-weight: bold;
  }
  .no-val {
    color: $gray-400;
    &::before {
      content: '-';
    }
  }
}

.table-pagination {
  &__pagesize {
    select {
      width: auto;
    }
  }
}

.table-sort-btn {
  border: 0;
  padding: math.div($default-spacing, 4);
  margin-left: math.div($default-spacing, 4);
  border-radius: $border-radius-small;
  transition: background-color 0.125s ease-out;
  color: currentColor;

  @include hover() {
    background-color: $gray-300;
  }

  .icon {
    stroke: currentColor;
    stroke-width: 20;
    stroke-linecap: round;
    stroke-linejoin: round;
    fill: none;
  }
}

.table-no-data {
  margin-top: math.div($default-spacing, 2);
  padding: $default-spacing;
  background-color: $gray-100;
  border-radius: $border-radius-base;
  box-shadow: $box-shadow-sm;
  border: 1px solid $gray-300;
}
</style>
