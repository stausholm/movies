<template>
  <layout>
    <div class="">
      <div class="container">
        <h1 class="visually-hidden">Account Page</h1>
        <base-spacer size="2" class="d-xs-none" />
        <account-card class="mb" :enableAvatarEditing="true" />

        <pwa-install-button class="btn btn--primary btn--responsive" v-if="showPWAInstallButton">
          <!-- Add app to homescreen -->
        </pwa-install-button>

        <h2 class="h6 mt-2">Settings</h2>
      </div>
      <ul class="settings-list" role="menu">
        <li class="settings-list__group">
          <h3 class="group__title">Account</h3>
          <ul class="group__list">
            <li>
              <settings-item
                @click="$router.push({ name: 'Starred' })"
                title="Starred"
                actionLabel="starredCount"
              />
            </li>
          </ul>
        </li>
        <settings-group-data />
        <settings-group-application />
      </ul>
    </div>
  </layout>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import AccountCard from '@/components/account/AccountCard.vue';

import Layout from '@/layouts/Main.vue';
import BaseSpacer from '@/components/base/BaseSpacer.vue';
import SettingsItem from '@/components/account/SettingsItem.vue';
import SettingsGroupData from '@/components/account/SettingsGroupData.vue';
import SettingsGroupApplication from '@/components/account/SettingsGroupApplication.vue';
import PwaInstallButton from '@/components/PwaInstallButton.vue';

export default defineComponent({
  name: 'Account',
  components: {
    AccountCard,
    Layout,
    BaseSpacer,
    SettingsItem,
    SettingsGroupData,
    SettingsGroupApplication,
    PwaInstallButton,
  },
  computed: {
    showPWAInstallButton(): boolean {
      return this.$store.getters.showPWAInstallButton;
    },
  },
  methods: {
    test() {
      alert('test');
    },
  },
});
</script>

<style lang="scss">
@use 'sass:math';
@import '@/design/variables/index.scss';
@import '@/design/mixins/index.scss';

.settings-list {
  list-style-type: none;
  padding: 0;
  margin: 0;

  &__group {
    .group__title {
      background-color: $gray-200;
      margin: 0;
      text-transform: uppercase;
      font-size: 0.875rem;
      padding: math.div($default-spacing, 2) 0;
    }
    .group__list {
      list-style-type: none;
      padding: 0;
      margin: 0;

      li {
        &:not(:last-child) {
          border-bottom: 1px solid $gray-300;
        }
      }
    }
  }
}
</style>
