<template>
  <div class="">
    <h1>Account</h1>
    <div class="profile-card">
      <img src="../../assets/logo.png" alt="Profile image" class="profile-card__image" />
      <p class="profile-card__stat">Movies:<span>X</span></p>
      <p class="profile-card__stat">Series:<span>X</span></p>
      <p class="profile-card__stat">Starred:<span>X</span></p>
    </div>
    <button>Reload app or something else idunno yet</button>

    <p>Settings</p>
    <ul>
      <li>
        <p>Account</p>
        <ul>
          <li>
            <router-link to="/account/starred">Starred</router-link>
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
          <li>Darkmode</li>
          <li>
            Image saturation
            <span>Adjust the vibrance of colors in images</span>
          </li>
          <li>
            Prefer reduced motion
            <span>Disable/enable app animations</span>
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
        </ul>
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'Account',
});
</script>