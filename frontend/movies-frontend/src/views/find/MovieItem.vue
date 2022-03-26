<template>
  <layout class="movie-item-page">
    <h1 v-if="loading">LOADING TODO</h1>
    <template v-else>
      <hero-app
        :title="content.imdbTitle"
        :background="['primary', 'image', 'fade']"
        :showBackButton="true"
        :tall="true"
        :actions="[
          {
            label: 'Share',
            emit: 'share',
            icon: 'Share',
          },
        ]"
        @share="handleShare"
      />

      <div class="container">
        <div class="d-flex align-center text-small">
          <tomato-meter :video="content" class="mr-1" />
          <inline-list :items="[content.releaseYear, timeFormatted.runtimeMinutes]" />
        </div>

        <div class="mt mb-2">
          <inline-list :items="content.genres" separator="," />
        </div>

        <div class="">
          <p>{{ content.plot }}</p>

          <div class="mb">
            <inline-list label="Starring" :items="content.actors" v-slot="{ item }">
              <router-link :to="{ name: 'ActorList', params: { actor: item } }">{{
                item
              }}</router-link>
            </inline-list>
          </div>

          <inline-list label="Directed by" :items="content.director" v-slot="{ item }">
            {{ item }}
          </inline-list>

          <button>
            More/less expand/collapse "plot" and "starring" and "directed by". should only be on
            mobile. Should only apply to content above 3 line-height
          </button>
        </div>

        <ul class="mt-2 row">
          <li class="col">
            <favorite-toggle :imdbID="content.imdbId" class="btn btn--block btn--icon" />
          </li>
          <li class="col">
            <a
              :href="`https://www.youtube.com/results?search_query=${content.imdbTitle}+${content.releaseYear}+trailer`"
              target="_blank"
              class="btn btn--block btn--icon"
            >
              <base-icon>
                <icon-youtube />
              </base-icon>
              Trailer
            </a>
          </li>
          <li class="col">
            <a :href="content.imdbUrl" class="btn btn--block btn--icon">
              <base-icon>
                <icon-i-m-d-b />
              </base-icon>
              <span class="visually-hidden">IMDB page</span>
              {{ content.imdbRating }}
            </a>
          </li>
        </ul>

        <h2>More like this</h2>
        <pre>{{ related }}</pre>

        <accordion id="info">
          <accordion-item title="Details">
            <h4>Runtime</h4>
            <p>{{ timeFormatted.runtimeMinutes }}</p>
            <h4>Released</h4>
            <p>{{ timeFormatted.released }}</p>
            <h4>Genre</h4>
            <p>
              <span v-for="genre in content.genres" :key="genre">{{ genre }}, </span>
            </p>
            <h4>Rated</h4>
            <p>
              {{ content.rated }}
              <a href="https://en.wikipedia.org/wiki/Motion_Picture_Association_film_rating_system">
                Read more
              </a>
            </p>
            <h4>Country</h4>
            <p>{{ content.country }}</p>
            <h4>Spoken language(s)</h4>
            <p>{{ content.languages }}</p>
            <h4>Subtitles</h4>
            <p>{{ content.subtitles }}</p>
          </accordion-item>
          <accordion-item title="Cast & Crew">
            <h4>Actors</h4>
            <ul>
              <li v-for="actor in content.actors" :key="actor">
                {{ actor }}
              </li>
            </ul>
            <h4>Director(s)</h4>
            <ul>
              <li v-for="director in content.director" :key="director">
                {{ director }}
              </li>
            </ul>
            <h4>Writer(s)</h4>
            <ul>
              <li v-for="writer in content.writer" :key="writer">
                {{ writer }}
              </li>
            </ul>
          </accordion-item>
          <accordion-item title="Additional information">
            <h4>Awards</h4>
            <p>{{ content.awards }}</p>
            <h4>Ratings</h4>
            <ul>
              <li v-for="rating in content.ratings" :key="rating.source">
                {{ rating.value }}: {{ rating.source }}
              </li>
            </ul>
            <h4>Box office earnings</h4>
            <p>{{ content.boxOffice }}</p>
            <h4>DVD Release</h4>
            <p>{{ timeFormatted.DVD }}</p>
            <h4>Production</h4>
            <p>{{ content.production }}</p>
            <h4>Website</h4>
            <p>{{ content.website }}</p>
          </accordion-item>
        </accordion>
      </div>
      <pre>{{ content }}</pre>
    </template>
  </layout>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import Layout from '@/layouts/Main.vue';
import { contentService } from '@/services/contentService';
import { getErrorPageRouteObj } from '@/router/utils';
import Movie from '@/types/Movie';
import Series from '@/types/Series';
import HeroApp from '@/components/HeroApp.vue';
import BaseIcon from '@/components/base/BaseIcon.vue';
import IconIMDB from '@/components/icons/IconIMDB.vue';
import IconYoutube from '@/components/icons/IconYoutube.vue';
import Accordion from '@/components/Accordion.vue';
import AccordionItem from '@/components/AccordionItem.vue';
import FavoriteToggle from '@/components/FavoriteToggle.vue';
import TomatoMeter from '@/components/TomatoMeter.vue';
import { formatMinutes, localizeDate } from '@/utils/FormatDateAndTime';
import InlineList from '@/components/InlineList.vue';

export default defineComponent({
  name: 'MovieItem',
  components: {
    Layout,
    HeroApp,
    BaseIcon,
    IconIMDB,
    IconYoutube,
    Accordion,
    AccordionItem,
    FavoriteToggle,
    TomatoMeter,
    InlineList,
  },
  data() {
    return {
      loading: true,
      content: {} as Movie,
      related: [] as (Series | Movie)[],
    };
  },
  computed: {
    timeFormatted(): Record<string, string> {
      if (this.loading) {
        return {};
      }

      return {
        released: localizeDate(this.content.released, 'da'),
        DVD: localizeDate(this.content.DVD, 'da'),
        runtimeMinutes: formatMinutes(this.content.runtimeMinutes),
      };
    },
  },
  methods: {
    handleShare() {
      console.log('share');
    },
    getContent() {
      this.loading = true;
      const imdbIDorTitleSlug = this.$route.params.imdbIDorTitleSlug as string;
      contentService
        .getMoviePageContent(imdbIDorTitleSlug)
        .then((data) => {
          this.content = data.content;
          this.related = data.related;
          this.loading = false;
        })
        .catch((err) => {
          if (err.response && err.response.status == 404) {
            this.$router.replace(getErrorPageRouteObj(this.$route, 'notFound', 'movie'));
          } else {
            this.$router.replace(getErrorPageRouteObj(this.$route, 'networkIssue'));
          }
        });
    },
  },
  created() {
    this.getContent();
  },
});
</script>
