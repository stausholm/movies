<template>
  <layout>
    <hero-app :showBackButton="true" :slim="true" title="Danger Zone" />
    <div class="container">
      <p>
        Delete all locally stored application data. Deleting your data is a
        <strong>permanent and irreversible action.</strong> Please be sure before proceeding.
      </p>
      <button class="btn btn--danger btn--uppercase" @click="showModal = true">
        <base-icon>
          <icon-delete />
        </base-icon>
        <span>Delete application data</span>
      </button>
      <modal
        v-if="showModal"
        @close="showModal = false"
        @confirm="handleConfirm"
        confirmLabel="Delete"
        :stackActions="true"
        :confirmIsDestructive="true"
        title="Confirm deletion"
      >
        <p>Permanently delete all locally stored content?</p>
      </modal>

      <overlay v-if="deletingData" label="Deleting data" :dismissible="false">
        <div class="loading-visuals d-flex justify-center">
          <transition name="fade" mode="out-in">
            <div v-if="!dataDeleted"><loader size="70" /></div>
            <div v-else>
              <svg class="checkmark-svg" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 52 52">
                <circle class="checkmark__circle" cx="26" cy="26" r="25" fill="none" />
                <path class="checkmark__check" fill="none" d="M14.1 27.2l7.1 7.2 16.7-16.8" />
              </svg>
            </div>
          </transition>
        </div>
        <div class="loading-content mt-2">
          <transition name="slide-up" mode="out-in">
            <strong class="text-big text-center d-block mb-1 title" v-if="!dataDeleted">
              {{ deletingMessage }}
              <br />
              <span class="text-normal">please wait.</span>
            </strong>
            <div v-else>
              <strong class="text-big text-center d-block mb-1 title">Data deleted.</strong>
              <button class="btn btn--primary btn--block" @click="returnToStart">Close</button>
            </div>
          </transition>
        </div>
      </overlay>
    </div>
  </layout>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import BaseIcon from '@/components/base/BaseIcon.vue';
import IconDelete from '@/components/icons/IconDelete.vue';
import Layout from '@/layouts/Main.vue';
import Modal from '@/components/Modal.vue';
import Overlay from '@/components/Overlay.vue';
import Loader from '@/components/Loader.vue';
import promiseDelay from '@/utils/promiseDelay';
import HeroApp from '@/components/HeroApp.vue';

export default defineComponent({
  name: 'Delete',
  components: {
    BaseIcon,
    IconDelete,
    Layout,
    Modal,
    Overlay,
    Loader,
    HeroApp,
  },
  data() {
    return {
      showModal: false,
      deletingData: false,
      dataDeleted: false,
      deletingMessage: 'Deleting data...',
    };
  },
  methods: {
    async handleConfirm() {
      this.deletingData = true;

      // TODO: this is TEMP
      this.deletingMessage = 'Deleting data... 1/4';
      await promiseDelay(2000);
      this.deletingMessage = 'Deleting data... 2/4';
      await promiseDelay(500);
      this.deletingMessage = 'Deleting data... 3/4';
      await promiseDelay(1000);
      this.deletingMessage = 'Deleting data... 4/4';
      await promiseDelay(500);

      // localStorage.clear();
      this.dataDeleted = true;

      // 1: show loader overlay with spinner and text 'Deleting data... please wait'.
      // 2: disable navigation
      // 3: clear local data. e.g. localstorage.clear()
      // 4: change spinner in overlay to checkmark and text to 'Data deleted'. Show button at the bottom of overlay with label 'Close'
      // 5: on click of 'close' button, clear all history entries in this.returnToStart so backbutton doesn't have to redirect to onboarding constantly
      // 6: on click of 'close' button, hard reload the page (this.returnToStart), so state resets and user is shown the onboarding screen.
    },
    returnToStart() {
      window.location.href = window.location.origin;
    },
  },
});
</script>

<style lang="scss" scoped>
@use 'sass:math';
@import '@/design/variables/index.scss';
@import '@/design/mixins/index.scss';

$checkmark-bg: $brand-success;
$checkmark-color: $white;

.checkmark__circle {
  stroke-dasharray: 166;
  stroke-dashoffset: 166;
  stroke-width: 2;
  stroke-miterlimit: 10;
  stroke: $checkmark-bg;
  fill: none;
  animation: stroke 0.6s $ease-in-out-cubic forwards;
}

.checkmark-svg {
  width: 70px;
  height: 70px;
  border-radius: 50%;
  display: block;
  stroke-width: 2;
  stroke: $checkmark-color;
  stroke-miterlimit: 10;
  box-shadow: inset 0px 0px 0px $checkmark-bg;
  animation: fill 0.4s $ease-in-out-cubic 0.4s forwards, scale 0.3s $ease-in-out-cubic 0.9s both;
}

.checkmark__check {
  transform-origin: 50% 50%;
  stroke-dasharray: 48;
  stroke-dashoffset: 48;
  animation: stroke 0.3s $ease-in-out-cubic 0.8s forwards;
}

@keyframes stroke {
  100% {
    stroke-dashoffset: 0;
  }
}

@keyframes scale {
  0%,
  100% {
    transform: none;
  }

  50% {
    transform: scale3d(1.1, 1.1, 1);
  }
}

@keyframes fill {
  100% {
    box-shadow: inset 0px 0px 0px 50px $checkmark-bg;
  }
}
</style>
