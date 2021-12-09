<template>
  <layout>
    <div class="container">
      <h1 class="visually-hidden">Account Page</h1>
      <account-card class="mb" :enableAvatarEditing="true" />
      <!-- <account-card :alt="true" class="mt-2 border" /> -->

      <button class="btn btn--primary">Reload app or something else idunno yet</button>

      <p class="h6">Settings</p>
      <ul>
        <li>
          <p>Account</p>
          <ul>
            <li>
              <router-link :to="{ name: 'Starred' }">Starred</router-link>
            </li>
          </ul>
        </li>
        <li>
          <p>Data</p>
          <ul>
            <li>
              <router-link to="/account/delete">
                Delete my data.
                <span>Remove all locally stored content</span>
              </router-link>
            </li>
            <li>
              Export my data
              <span>Download your data as a JSON file</span>
            </li>
            <li>
              Import data
              <span>Requires valid JSON file</span>
              <span>
                Import existing data. You can choose between overwriting your current locally stored
                data, or adding the imported data to your current dataset
              </span>
              <button>(opens overlay) More info for the JSON data structure</button>
              <p>
                Modal: Please select an import type: Overwrite: Overwrites all your existing local
                data Merge and add: Merges existing data and adds new
              </p>
            </li>
          </ul>
        </li>
        <li>
          <p>Application</p>
          <ul>
            <li>
              Darkmode
              <theme-switcher />
            </li>
            <li>
              Image saturation
              <span>Adjust the vibrance of colors in images</span>
            </li>
            <li>
              Prefer reduced motion
              <span>Disable/enable app animations</span>
              <input type="checkbox" v-model="isReducedMotion" />
            </li>
            <li>Change language</li>
            <li>Start product tour</li>
            <li>
              <router-link to="/account/changelog">
                Changelog
                <span>See what's new</span>
              </router-link>
            </li>
            <li>
              <router-link to="/account/feedback">Send Feedback</router-link>
            </li>
            <li>
              <router-link to="/account/about">About</router-link>
            </li>
            <li>
              <router-link to="/account/button">
                ???
                <span>????</span>
              </router-link>
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

export default defineComponent({
  name: 'Account',
  components: {
    AccountCard,
    ThemeSwitcher,
    Layout,
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
  },
});
</script>
