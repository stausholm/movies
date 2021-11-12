<template>
  <header class="navbar">
    <div class="container">
      <nav class="primary-nav">
        <router-link :to="{ name: 'Home' }" class="nav-item">
          <base-icon class="nav-item__icon">
            <icon-home />
          </base-icon>
          <span class="nav-item__label">Home</span>
        </router-link>

        <router-link :to="{ name: 'FindIndex' }" class="nav-item">
          <base-icon class="nav-item__icon">
            <icon-search />
          </base-icon>
          <span class="nav-item__label">Find</span>
        </router-link>

        <router-link :to="{ name: 'Library' }" class="nav-item">
          <base-icon class="nav-item__icon">
            <icon-video-library />
          </base-icon>
          <span class="nav-item__label">Library</span>
        </router-link>

        <router-link v-if="useSmallLayout" :to="{ name: 'Account' }" class="nav-item">
          <base-icon class="nav-item__icon">
            <icon-account-circle />
          </base-icon>
          <span class="nav-item__label">My Stuff</span>
        </router-link>
        <div v-else class="dropdown-wrapper" v-click-outside="hideDropdown">
          <button @click="handleAccountClick" class="nav-item">
            <base-icon class="nav-item__icon">
              <icon-account-circle />
            </base-icon>
            <span class="nav-item__label">My Stuff</span>
          </button>

          <transition name="slide-up">
            <div class="dropdown" v-if="!useSmallLayout && showAccountDropdown">
              <account-card :alt="true" />
              <router-link :to="{ name: 'Starred' }">Starred</router-link>
              <router-link :to="{ name: 'Account' }">Settings</router-link>
            </div>
          </transition>
        </div>
      </nav>
    </div>
  </header>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import BaseIcon from '@/components/base/BaseIcon.vue';
import IconHome from '@/components/icons/IconHome.vue';
import IconSearch from '@/components/icons/IconSearch.vue';
import IconVideoLibrary from '@/components/icons/IconVideoLibrary.vue';
import IconAccountCircle from '@/components/icons/IconAccountCircle.vue';
import { AppLayoutSizeWidth } from '@/store/app/types';
import AccountCard from '@/components/account/AccountCard.vue';

export default defineComponent({
  components: {
    BaseIcon,
    IconHome,
    IconSearch,
    IconVideoLibrary,
    IconAccountCircle,
    AccountCard,
  },
  data() {
    return {
      showAccountDropdown: false,
    };
  },
  computed: {
    useSmallLayout(): boolean {
      return this.$store.getters.layoutSizeWidth !== ('desktop' as AppLayoutSizeWidth);
    },
  },
  methods: {
    handleAccountClick(): void {
      this.showAccountDropdown = !this.showAccountDropdown;
    },
    hideDropdown(): void {
      this.showAccountDropdown = false;
    },
  },
});
</script>

<style lang="scss" scoped>
@import '@/design/variables/_colors.scss';
@import '@/design/mixins/_breakpoints.scss';
</style>
