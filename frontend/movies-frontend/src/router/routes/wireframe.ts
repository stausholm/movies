import { RouteRecordRaw } from 'vue-router';

const routes: Array<RouteRecordRaw> = [
  {
    path: '/wireframe',
    name: 'WireframeIndex',
    component: () => import(/* webpackChunkName: "wireframe" */ '@/views/wireframe/Index.vue'),
    meta: {
      metaTags: [
        {
          name: 'description',
          content: 'The wireframe page of the app',
        },
        {
          property: 'og:description',
          content: 'the wireframe page of the app opengraph',
        },
        {
          test: 'testval',
          'data-test': 'asd',
        },
      ],
      title: 'Wireframe',
      announcer: {
        message: 'Announced wireframe title',
        skip: false,
      },
    },
    children: [
      {
        path: '',
        name: 'Wireframe',
        component: () =>
          import(/* webpackChunkName: "wireframe" */ '@/views/wireframe/Wireframe.vue'),
        meta: {},
      },
      {
        path: 'notes',
        name: 'ExampleNotes',
        component: () =>
          import(/* webpackChunkName: "wireframe" */ '@/views/wireframe/ExampleNotes.vue'),
        meta: {},
      },
      {
        path: 'inputs',
        name: 'ExampleInputs',
        component: () =>
          import(/* webpackChunkName: "wireframe" */ '@/views/wireframe/ExampleInputs.vue'),
        meta: {},
      },
      {
        path: 'blocklinks',
        name: 'ExampleBlockLinks',
        component: () =>
          import(/* webpackChunkName: "wireframe" */ '@/views/wireframe/ExampleBlockLinks.vue'),
        meta: {},
      },
      {
        path: 'sparkles',
        name: 'ExampleSparkles',
        component: () =>
          import(/* webpackChunkName: "wireframe" */ '@/views/wireframe/ExampleSparkles.vue'),
        meta: {},
      },
      {
        path: 'text',
        name: 'ExampleText',
        component: () =>
          import(/* webpackChunkName: "wireframe" */ '@/views/wireframe/ExampleText.vue'),
        meta: {},
      },
      {
        path: 'toast',
        name: 'ExampleToast',
        component: () =>
          import(/* webpackChunkName: "wireframe" */ '@/views/wireframe/ExampleToast.vue'),
        meta: {},
      },
      {
        path: 'buttons',
        name: 'ExampleButtons',
        component: () =>
          import(/* webpackChunkName: "wireframe" */ '@/views/wireframe/ExampleButtons.vue'),
        meta: {},
      },
      {
        path: 'modal',
        name: 'ExampleModal',
        component: () =>
          import(/* webpackChunkName: "wireframe" */ '@/views/wireframe/ExampleModal.vue'),
        meta: {},
      },
      {
        path: 'icons',
        name: 'ExampleIcons',
        component: () =>
          import(/* webpackChunkName: "wireframe" */ '@/views/wireframe/ExampleIcons.vue'),
        meta: {},
      },
      {
        path: 'divider',
        name: 'ExampleDivider',
        component: () =>
          import(/* webpackChunkName: "wireframe" */ '@/views/wireframe/ExampleDivider.vue'),
        meta: {},
      },
      {
        path: 'accordion',
        name: 'ExampleAccordion',
        component: () =>
          import(/* webpackChunkName: "wireframe" */ '@/views/wireframe/ExampleAccordion.vue'),
        meta: {},
      },
      {
        path: 'contextmenu',
        name: 'ExampleContextMenu',
        component: () =>
          import(/* webpackChunkName: "wireframe" */ '@/views/wireframe/ExampleContextMenu.vue'),
        meta: {},
      },
      {
        path: 'spoiler',
        name: 'ExampleSpoiler',
        component: () =>
          import(/* webpackChunkName: "wireframe" */ '@/views/wireframe/ExampleSpoiler.vue'),
        meta: {},
      },
      {
        path: 'card',
        name: 'ExampleCard',
        component: () =>
          import(/* webpackChunkName: "wireframe" */ '@/views/wireframe/ExampleCard.vue'),
        meta: {},
      },
      {
        path: 'hero',
        name: 'ExampleHero',
        component: () =>
          import(/* webpackChunkName: "wireframe" */ '@/views/wireframe/ExampleHero.vue'),
        meta: {},
      },
    ],
  },
];

export default routes;
