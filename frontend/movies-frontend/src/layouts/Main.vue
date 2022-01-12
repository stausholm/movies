<template>
  <main id="main">
    <slot />
  </main>
</template>

<style lang="scss" scoped>
@import '@/design/variables/index.scss';
@import '@/design/mixins/index.scss';

main {
  padding-top: $nav-height;
  min-height: 100vh;

  @include breakpoint-max($breakpoint-navigation-change) {
    padding-top: 0;
    padding-bottom: $nav-height;
  }
}
</style>
