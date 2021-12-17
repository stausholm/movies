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
        <li class="settings-list__group">
          <h3 class="group__title">Application</h3>
          <ul class="group__list">
            <li>
              <settings-item
                @click="test"
                title="Theme"
                actionLabel="currentTheme"
                aria-haspopup="true"
              />
              <!-- MODAL
              <theme-switcher />
              buttons: Cancel
               -->
            </li>
            <li>
              <settings-item
                @click="test"
                title="Image saturation"
                subtitle="Adjust the vibrance of colors in images"
                actionLabel="Off"
                aria-haspopup="true"
              />
              <!-- MODAL
              text: Adjusting the saturation of images can make them easier on the eye. This can work great in combination with darkmode enabled
              2 images
              slider input
              buttons: cancel / save
               -->
            </li>
            <li>
              <settings-item
                @click="test"
                title="Prefer reduced motion"
                subtitle="Disable/enable app animations and transitions"
                type="switch"
                :value="isReducedMotion"
              />
              <!-- TODO: make settings-item work with v-model -->
              <input type="checkbox" v-model="isReducedMotion" />
            </li>
            <li>
              <settings-item @click="test" title="Change language" actionLabel="currentLanguage" />
            </li>
            <li>
              <settings-item
                @click="test"
                title="Start product tour"
                subtitle="Short tour of the app"
              />
            </li>
            <li>
              <sparkles :animate="!isReducedMotion">
                <settings-item
                  @click="$router.push({ name: 'Changelog' })"
                  title="Changelog"
                  subtitle="See what's new"
                />
              </sparkles>
            </li>
            <li>
              <settings-item @click="$router.push({ name: 'Feedback' })" title="Send Feedback" />
            </li>
            <li>
              <settings-item @click="$router.push({ name: 'About' })" title="About" />
            </li>
            <li>
              <settings-item
                @click="$router.push({ name: 'ButtonPage' })"
                title="?"
                subtitle="?? ????"
              />
            </li>
          </ul>
        </li>
      </ul>
    </div>
  </layout>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import AccountCard from '@/components/account/AccountCard.vue';
import ThemeSwitcher from '@/components/account/ThemeSwitcher.vue';
import { AppSettingPayload } from '@/store/user/types';
import { UserMutations } from '@/store/user/mutations';
import Layout from '@/layouts/Main.vue';
import BaseSpacer from '@/components/base/BaseSpacer.vue';
import SettingsItem from '@/components/account/SettingsItem.vue';
import SettingsGroupData from '@/components/account/SettingsGroupData.vue';
import Sparkles from '@/components/Sparkles.vue';
import PwaInstallButton from '@/components/PwaInstallButton.vue';

export default defineComponent({
  name: 'Account',
  components: {
    AccountCard,
    // ThemeSwitcher,
    Layout,
    BaseSpacer,
    SettingsItem,
    SettingsGroupData,
    Sparkles,
    PwaInstallButton,
  },
  computed: {
    isReducedMotion: {
      get(): boolean {
        return this.$store.getters.getAppSettings.preferReducedMotion;
      },
      set(value: boolean): void {
        this.$store.commit(UserMutations.SET_APPSETTING, {
          key: 'preferReducedMotion',
          val: value,
        } as AppSettingPayload);
      },
    },
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
