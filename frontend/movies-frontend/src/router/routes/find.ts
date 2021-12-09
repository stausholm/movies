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
        component: () => import(/* webpackChunkName: "find" */ '@/views/find/SearchResults.vue'),
        meta: {},
      },
      {
        path: 'movies',
        component: () => import(/* webpackChunkName: "find" */ '@/views/find/Movies.vue'),
        meta: {},
      },
      {
        path: 'movies/:imdbIDorTitleSlug',
        component: () => import(/* webpackChunkName: "find" */ '@/views/find/MovieItem.vue'),
        meta: {},
      },
      {
        path: 'series',
        component: () => import(/* webpackChunkName: "find" */ '@/views/find/Series.vue'),
        meta: {},
      },
      {
        path: 'series/:imdbIDorTitleSlug',
        component: () => import(/* webpackChunkName: "find" */ '@/views/find/SeriesItem.vue'),
        meta: {},
      },
      {
        path: 'series/:imdbIDorTitleSlug/:imdbIDorEpisodeNumber',
        component: () => import(/* webpackChunkName: "find" */ '@/views/find/EpisodeItem.vue'),
        meta: {},
      },
      {
        path: 'actors',
        component: () => import(/* webpackChunkName: "find" */ '@/views/find/Actors.vue'),
        meta: {},
      },
      {
        path: 'actors/:actor',
        component: () => import(/* webpackChunkName: "find" */ '@/views/find/ActorList.vue'),
        meta: {},
      },
      {
        path: 'genres/:genre',
        component: () => import(/* webpackChunkName: "find" */ '@/views/find/GenreList.vue'),
        meta: {},
      },
      {
        path: 'related/:imdbID',
        component: () => import(/* webpackChunkName: "find" */ '@/views/find/RelatedList.vue'),
        meta: {},
      },
    ],
  },
];

export default routes;
