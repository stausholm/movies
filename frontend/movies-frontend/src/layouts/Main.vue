<template>
  <main id="main">
    <slot />
  </main>
</template>

<style lang="scss">
@import '@/design/variables/index.scss';
@import '@/design/mixins/index.scss';

main {
  padding-top: $nav-height;
  min-height: 100vh;

  @include breakpoint-max($breakpoint-navigation-change) {
    padding-top: 0;
    padding-bottom: $nav-height;
  }

  .sticky-top {
    // app hero is supposed to lay behind the nav, so we pull it up behind it like so
    margin-top: -$nav-height;
  }
  @include breakpoint($breakpoint-navigation-change) {
    .app-hero {
      // app hero is supposed to lay behind the nav, so we pull it up behind it like so
      margin-top: -$nav-height;
    }
  }
}
</style>
