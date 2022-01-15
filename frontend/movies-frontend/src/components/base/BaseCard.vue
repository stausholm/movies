<template>
  <article class="card">
    <header class="card__header">
      <component :is="headingLevel">
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
    <span
      class="card__cta btn btn--block btn--primary"
      aria-hidden="true"
      v-if="ctaLabel"
      :id="ctaId"
      >{{ ctaLabel }}</span
    >
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
  },
  computed: {
    ctaId(): string | null {
      return this.ctaLabel ? '__card-desc-' + slugify(this.title) : null;
    },
  },
});
</script>

<style lang="scss">
@import '@/design/variables/index.scss';
@import '@/design/mixins/index.scss';

.card {
  display: flex;
  flex-direction: column;
  background-color: $white;
  border-radius: $border-radius-base;
  box-shadow: $box-shadow-sm;
  position: relative;

  &:hover {
    box-shadow: $box-shadow;
  }
  // &:focus-within {
  //   box-shadow: 0 0 0 5px black;
  // }

  &__header {
    a {
      // The link is located around the header instead of around the entire card, so that this text forms the accessible label for the card.
      // If the link wrapped the entire card, screen readers would read all text inside the card as the link label.
      // styling the link makes the entire card clickable, to get the best of both worlds.
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      z-index: 1;
      color: transparent;
      font-size: 0px;
      line-height: 0;
      border-radius: $border-radius-base;

      &:hover {
        color: transparent;
      }

      &:focus-visible {
        outline-offset: 4px;
      }
    }

    // &:focus-within ~ .card__cta {
    //   background-color: red;
    // }
  }

  &__img {
    // place the image visually above the header, but keep it semantically below the header
    // so that it's clear to screenreaders that the image belongs to the section defined by the header
    order: -1;

    height: 6.5rem;
    clip-path: polygon(0 0, 100% 0, 100% 100%, 0 calc(100% - 1rem));

    img {
      width: 100%;
      border-radius: $border-radius-base;

      height: 100%;
      object-fit: cover;
    }
  }

  &__body {
    // if cards are presented in a row and has variable content height, but the cards are all the same height, make sure that the footer is always pushed to the bottom
    flex-grow: 1;

    p {
      // make the max linelength around 60 characters for better readability
      max-width: 60ch;
    }

    > *:last-child {
      margin-bottom: 0;
    }
  }

  &__cta {
    margin-top: $default-spacing;
  }

  &__footer {
    margin-top: $default-spacing;
  }

  &__body,
  &__footer {
    button,
    a {
      // make sure any potential links / actions in the footer are clickable, by layering them above the header link's ::after
      position: relative;
      z-index: 1;
      min-height: $min-touch-target-size;
    }
  }
}
</style>
