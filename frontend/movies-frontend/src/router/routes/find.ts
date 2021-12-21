import { RouteRecordRaw } from 'vue-router';

const routes: Array<RouteRecordRaw> = [
  {
    path: '/find',
    name: 'FindIndex',
    component: () => import(/* webpackChunkName: "find" */ '@/views/find/Index.vue'),
    meta: {},
    children: [
      {
        path: '',
        name: 'Find',
        component: () => import(/* webpackChunkName: "find" */ '@/views/find/Find.vue'),
        meta: {},
      },
      {
        path: 'search-results',
        name: 'SearchResults',
        component: () => import(/* webpackChunkName: "find" */ '@/views/find/SearchResults.vue'),
        meta: {},
      },
      {
        path: 'movies',
        name: 'Movies',
        component: () => import(/* webpackChunkName: "find" */ '@/views/find/Movies.vue'),
        meta: {},
      },
      {
        path: 'movies/:imdbIDorTitleSlug',
        name: 'MovieItem',
        component: () => import(/* webpackChunkName: "find" */ '@/views/find/MovieItem.vue'),
        meta: {},
      },
      {
        path: 'series',
        name: 'Series',
        component: () => import(/* webpackChunkName: "find" */ '@/views/find/Series.vue'),
        meta: {},
      },
      {
        path: 'series/:imdbIDorTitleSlug',
        name: 'SeriesItem',
        component: () => import(/* webpackChunkName: "find" */ '@/views/find/SeriesItem.vue'),
        meta: {},
      },
      {
        path: 'series/:imdbIDorTitleSlug/:imdbIDorEpisodeNumber',
        name: 'EpisodeItem',
        component: () => import(/* webpackChunkName: "find" */ '@/views/find/EpisodeItem.vue'),
        meta: {},
      },
      {
        path: 'actors',
        name: 'Actors',
        component: () => import(/* webpackChunkName: "find" */ '@/views/find/Actors.vue'),
        meta: {},
      },
      {
        path: 'actors/:actor',
        name: 'ActorList',
        component: () => import(/* webpackChunkName: "find" */ '@/views/find/ActorList.vue'),
        meta: {},
      },
      {
        path: 'genres/:genre',
        name: 'GenreList',
        component: () => import(/* webpackChunkName: "find" */ '@/views/find/GenreList.vue'),
        meta: {},
      },
      {
        path: 'related/:imdbID',
        name: 'RelatedList',
        component: () => import(/* webpackChunkName: "find" */ '@/views/find/RelatedList.vue'),
        meta: {},
      },
    ],
  },
];

export default routes;
