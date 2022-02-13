<template>
  <article class="card" :class="[`card--${type}`]">
    <header class="card__header">
      <component :is="headingLevel" class="mb-0">
        <!-- This span is here for better styling abilities -->
        <span :aria-hidden="!!to">{{ title }}</span>
        <router-link v-if="to" :to="to" :aria-describedby="ctaId">{{ title }}</router-link>
      </component>
    </header>
    <div class="card__img" v-if="imgUrl">
      <img :src="imgUrl" :alt="imgAlt" />
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
  </article>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';
import { slugify } from '@/utils/stringToSlug';

/**
 * accessibility sources:
 * https://inclusive-components.design/cards/
 * https://a11y-style-guide.com/style-guide/section-general.html#kssref-general-read-more
 * https://bbc.github.io/gel/components/promos/#link/to/content
 * https://bbc.github.io/gel/components/cards/
 */

export default defineComponent({
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
    type: {
      type: String,
      default: 'standard',
      validator(val: string) {
        return ['standard', 'tip'].includes(val);
      },
    },
  },
  computed: {
    ctaId(): string | null {
      return this.ctaLabel ? '__card-desc-' + slugify(this.title) : null;
    },
  },
});
</script>
