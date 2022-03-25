<template>
  <article
    class="card"
    :class="[
      `card--${type}`,
      {
        'card--has-header-action': $slots.headerAction,
        'card--has-image': imgUrl || imgSources,
        'card--is-loading': isLoading,
      },
    ]"
  >
    <header class="card__header">
      <component :is="headingLevel" class="mb-0 card__title">
        <!-- This span is here for better styling abilities -->
        <span :aria-hidden="!!to" class="title">{{ title }}</span>
        <router-link v-if="to" :to="to" :aria-describedby="ctaId" class="card__header-link">{{
          title
        }}</router-link>
      </component>
      <div class="card__header-action" v-if="$slots.headerAction">
        <slot name="headerAction" />
      </div>
    </header>
    <div class="card__img" v-if="imgUrl || imgSources">
      <lazy-image :src="imgUrl" :alt="imgAlt" :sources="imgSources" />
    </div>
    <div class="card__tags" v-if="tags">
      <span class="visually-hidden">Tagged: </span>
      <template v-if="Array.isArray(tags)">
        <span class="tag" v-for="tag in tags" :key="tag">{{ tag }}</span>
      </template>
      <span class="tag" v-else>{{ tags }}</span>
    </div>
    <div class="card__body">
      <slot />
    </div>
    <div class="card__cta" aria-hidden="true" v-if="ctaLabel">
      <span class="btn btn--block btn--primary" :id="ctaId">{{ ctaLabel }}</span>
    </div>
    <footer class="card__footer" v-if="$slots.footer">
      <slot name="footer" />
    </footer>
    <transition name="fade">
      <div class="card__skeleton" aria-hidden="true" v-if="isLoading"></div>
    </transition>
  </article>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';
import { slugify } from '@/utils/stringToSlug';
import LazyImage from '@/components/LazyImage.vue';

/**
 * accessibility sources:
 * https://inclusive-components.design/cards/
 * https://a11y-style-guide.com/style-guide/section-general.html#kssref-general-read-more
 * https://bbc.github.io/gel/components/promos/#link/to/content
 * https://bbc.github.io/gel/components/cards/
 */

export default defineComponent({
  components: { LazyImage },
  name: 'BaseCard',
  props: {
    title: {
      type: String,
      required: true,
    },
    ctaLabel: {
      type: String,
    },
    tags: {
      type: [String, Array] as PropType<string | string[]>,
    },
    headingLevel: {
      // define which level headings should have inside each card, so they fit correctly within the outline of the page
      type: String,
      default: 'h3',
    },
    to: {
      // routerlink :to
      type: [String, Object],
    },
    imgUrl: {
      type: String,
    },
    imgAlt: {
      type: String,
      default: '',
    },
    imgSources: {
      type: Array as PropType<(string | null)[]>,
    },
    type: {
      type: String,
      default: 'standard',
      validator(val: string) {
        return ['standard', 'tip', 'media', 'image'].includes(val);
      },
    },
    isLoading: {
      // show card as a loader/skeleton instead
      type: Boolean,
      default: false,
    },
  },
  computed: {
    ctaId(): string | null {
      return this.ctaLabel ? '__card-desc-' + slugify(this.title) : null;
    },
  },
});
</script>
