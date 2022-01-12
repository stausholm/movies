import 'vue-router';

declare module 'vue-router' {
  interface RouteMeta {
    metaTags?: { name?: string; property?: string; content?: string; [key: string]: string }[];
    title?: string;
    announcer?: { message?: string; skip?: boolean };
  }
}
