<template>
  <layout class="button-layout">
    <div class="container">
      <div class="button-container">
        <div class="inventory shadow" v-if="showInventoryTemp">
          <div class="animation"></div>
          <ul class="shadow-inset">
            <li><button class="shadow-sm">party cone</button></li>
            <li><button class="shadow-sm">pirate</button></li>
            <li><button class="shadow-sm">viking helmet</button></li>
            <li><button class="shadow-sm">santa</button></li>
            <li><button class="shadow-sm">tophat</button></li>
            <li><button class="shadow-sm">wizard</button></li>
            <li><button class="shadow-sm">Crown</button></li>
          </ul>
          <span class="label">Hat-o-meter</span>
          <div class="progress-bar shadow-inset">
            <div class="progress shadow-sm" :style="{ width: 20 + '%' }"></div>
          </div>
        </div>
        <div class="justify-center align-center d-flex pb-2">
          <red-button @click="handleClick" />
        </div>
      </div>
    </div>
  </layout>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import RedButton from '@/components/RedButton.vue';
import { ToastMutations } from '@/store/toast/mutations';
import { Toast } from '@/store/toast/types';
import { UserMutations } from '@/store/user/mutations';
import { AppSettingPayload } from '@/store/user/types';
import Layout from '@/layouts/Main.vue';

export default defineComponent({
  name: 'ButtonPage',
  components: {
    RedButton,
    Layout,
  },
  data() {
    return {
      localClickCount: 0,
      showInventoryTemp: false, // TODO: remove. this is just here to easily make the animations
      tiers: {
        partyCone: {
          unlock: 10,
          comestic: 'TODO component/image',
          x: 5, // percentage from top of parent el
          y: 5, // percentage from left of parent el
          rotate: 0, // transform rotate degree
          size: 20, // percentage width of parent el
        },
        pirateBicorne: {
          unlock: 50,
        },
        vikingHelmet: {
          unlock: 120,
        },
        santaHat: {
          unlock: 200,
        },
        topHat: {
          unlock: 300,
        },
        wizard: {
          unlock: 500,
        },
        crown: {
          unlock: 1000,
        },
      },
    };
  },
  computed: {
    storedClickCount(): number {
      return this.$store.getters.getAppSettings.buttonClicks;
    },
    clickCount(): number {
      return this.storedClickCount + this.localClickCount;
    },
  },
  methods: {
    handleClick(): void {
      console.log('click');
      this.showInventoryTemp = !this.showInventoryTemp;
      this.localClickCount++;
    },
  },
  watch: {
    clickCount(newVal) {
      if (newVal === 10) {
        console.log('clicked 10 times!');
        this.$store.commit(ToastMutations.ADD_TOAST, {
          content: '🎉 Cone unlocked',
        } as Toast);
        // TODO: show toast, saying 'crown unlocked', and show a crown on the avatarCard component.
        // Could also implement multiple hats, and then this page would be a page to select a hat, and all unlocked hats would show above the button.
        // Not yet unlocked hats could show a black silhouette with a question mark, "Who's that pokémon" style
        // don't show how many times the button has been clicked
      }
    },
  },
  beforeUnmount() {
    this.$store.commit(UserMutations.SET_APPSETTING, {
      key: 'buttonClicks',
      val: this.clickCount,
    } as AppSettingPayload);
  },
});
</script>

<style lang="scss" scoped>
@use 'sass:math';
@import '@/design/variables/index.scss';
@import '@/design/mixins/index.scss';

.button-layout {
  display: flex;
  align-items: center;

  .container {
    width: 100%;
  }
}

.inventory {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  background-color: $gray-600;
  border: 6px solid $gray-600;
  border-radius: $border-radius-base;

  ul {
    border-radius: $border-radius-base;
    background-color: $gray-400;
    list-style-type: none;
    padding: 3px;
    margin: 0;
    display: flex;
    overflow: auto;
    -webkit-overflow-scrolling: touch;

    li {
      display: block;
      width: 100px;
      height: 100px;
      min-width: 100px;
      padding: 3px;

      button {
        background-color: $gray-500;
        border: $border-width-base solid $gray-600;
        height: 100%;
        width: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        border-radius: $border-radius-small;
      }
    }
  }

  .label {
    margin-top: 6px;
    margin-left: 6px;
    margin-right: 6px;
    text-align: center;
    display: block;
    text-transform: uppercase;
    letter-spacing: 1.4px;
    font-weight: bold;
    color: $gray-400;
  }

  .progress-bar {
    margin-top: 6px;
    height: 20px;
    background-color: $gray-400;
    border-radius: $border-radius-base;
    .progress {
      height: 100%;
      border-radius: $border-radius-base;
      background-color: $gray-800;
    }
  }
}

.button-container {
  padding-top: 175px + $default-spacing * 4; // inventory height + spacing between button and inventory
  position: relative;
}

@keyframes fade-out {
  from {
    opacity: 1;
  }
  to {
    opacity: 0;
  }
}

.animation {
  animation: fade-out 0.3s ease-out 4s forwards;
  background-color: $body-bg;
  position: absolute;
  top: -35px;
  bottom: -35px;
  left: -35px;
  right: -35px;
}
</style>
