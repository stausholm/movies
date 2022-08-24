<template>
  <layout class="button-layout overflow-hide">
    <div class="container">
      <div class="button-container">
        <div class="inventory" v-if="showInventory">
          <div class="animation">
            <div class="animation-mask">
              <div class="animation-content">
                <div class="inventory-inner">
                  <ul class="shadow-inset">
                    <li v-for="tier in tiers" :key="tier.name">
                      <button
                        class="shadow-sm"
                        :class="{ active: tier.name === buttonClicksActiveReward }"
                        @click="handleRewardClick(tier.name, tier.unlock)"
                        :disabled="tier.unlock > clickCount"
                      >
                        {{ tier.name }}
                      </button>
                    </li>
                  </ul>
                  <span class="label">Hat-o-meter</span>
                  <div class="progress-bar shadow-inset">
                    <div
                      class="progress shadow-sm"
                      :style="{ width: percentageUntilNextUnlock + '%' }"
                    ></div>
                  </div>
                </div>
              </div>
            </div>
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
import { AppSettingPayload, buttonClickRewardId } from '@/store/user/types';
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
      tiers: [
        {
          name: 'partyCone' as buttonClickRewardId,
          unlock: 10,
          comestic: 'TODO component/image',
          x: 5, // percentage from top of parent el
          y: 5, // percentage from left of parent el
          rotate: 0, // transform rotate degree
          size: 20, // percentage width of parent el
        },
        {
          name: 'pirateBicorne' as buttonClickRewardId,
          unlock: 50,
        },
        {
          name: 'vikingHelmet' as buttonClickRewardId,
          unlock: 120,
        },
        {
          name: 'santaHat' as buttonClickRewardId,
          unlock: 200,
        },
        {
          name: 'topHat' as buttonClickRewardId,
          unlock: 300,
        },
        {
          name: 'wizard' as buttonClickRewardId,
          unlock: 500,
        },
        {
          name: 'crown' as buttonClickRewardId,
          unlock: 1000,
        },
      ],
    };
  },
  computed: {
    storedClickCount(): number {
      return this.$store.getters.getAppSettings.buttonClicks;
    },
    buttonClicksActiveReward(): string | null {
      return this.$store.getters.getAppSettings.buttonClicksActiveReward;
    },
    clickCount(): number {
      return this.storedClickCount + this.localClickCount;
    },
    showInventory(): boolean {
      return this.clickCount >= this.tiers[0].unlock;
    },
    percentageUntilNextUnlock(): number {
      const highestUnlockedUnlock = this.tiers
        .filter((x) => x.unlock <= this.clickCount)
        .reverse()[0];
      if (!highestUnlockedUnlock) return 0; // haven't unlocked anything yet

      const nextUnlock = this.tiers.filter((x) => x.unlock > this.clickCount)[0];
      if (!nextUnlock) return 100; // have unlocked everything

      const diff = nextUnlock.unlock - highestUnlockedUnlock.unlock; // 100%
      const currentlyAt = this.clickCount - highestUnlockedUnlock.unlock;
      const percentage = (currentlyAt / diff) * 100;
      return percentage;
    },
  },
  methods: {
    handleClick(): void {
      console.log('click');
      this.localClickCount++;
    },
    handleRewardClick(name: string, unlock: number): void {
      if (unlock > this.clickCount) return;

      this.$store.commit(UserMutations.SET_APPSETTING, {
        key: 'buttonClicksActiveReward',
        val: name === this.buttonClicksActiveReward ? null : name,
      } as AppSettingPayload);
    },
  },
  watch: {
    clickCount(newVal) {
      if (newVal === this.tiers[0].unlock) {
        console.log('clicked 10 times!');
        this.$store.commit(ToastMutations.ADD_TOAST, {
          content: '🎉 Cone unlocked',
        } as Toast);

        // set active hat to be cone
        this.$store.commit(UserMutations.SET_APPSETTING, {
          key: 'buttonClicksActiveReward',
          val: 'partyCone' as buttonClickRewardId,
        } as AppSettingPayload);

        // TODO: show toast, saying 'crown unlocked', and show a crown on the avatarCard component.
        // Could also implement multiple hats, and then this page would be a page to select a hat, and all unlocked hats would show above the button.
        // Not yet unlocked hats could show a black silhouette with a question mark, "Who's that pokémon" style
        // don't show how many times the button has been clicked

        return;
      }

      const newUnlock = this.tiers.find((x) => x.unlock === newVal);
      if (newUnlock) {
        this.$store.commit(ToastMutations.ADD_TOAST, {
          content: `🎉 ${newUnlock.name} unlocked`,
        } as Toast);
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

$border-size: 0.3em;
$starting-delay: 500ms;
$reveal-borders-time: 700ms;
$open-mask-time: 600ms;
$content-width: 100%;
$content-height: auto;
$timing-function: cubic-bezier(0.14, 0.87, 0.05, 0.95);

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

        &.active {
          background-color: $gray-700;
        }

        &:disabled {
          background-color: $gray-400;
        }
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
      transition: width 0.2s ease-out;
    }
  }
}

.button-container {
  padding-top: 175px + $default-spacing * 4; // inventory height + spacing between button and inventory
  position: relative;
}

.inventory-inner {
  background-color: $gray-600;
  border: 6px solid $gray-600;
  border-radius: $border-radius-base;
}

@keyframes reveal-mask {
  from {
    max-width: $border-size;
  }
  to {
    max-width: 100%;
  }
}

@keyframes reveal-content {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}
@keyframes hide-content {
  from {
    opacity: 1;
  }
  to {
    opacity: 0;
  }
}
@keyframes reveal-shadow {
  from {
    box-shadow: 0 0 0 0 rgba(0, 0, 0, 0);
  }
  to {
    box-shadow: $box-shadow;
  }
}

@keyframes grow-height {
  from {
    transform: scaleY(0);
  }
  to {
    transform: scaleY(1);
  }
}

// adapted from https://codepen.io/epaezrubio/pen/OoMGXR
.animation {
  &-mask {
    animation-name: reveal-mask, reveal-shadow;
    animation-duration: $open-mask-time, 150ms;
    animation-timing-function: $timing-function;
    animation-delay: $starting-delay + $reveal-borders-time;
    animation-fill-mode: both;
    max-width: $content-width;
    height: $content-height;
    overflow-x: hidden;
    overflow-y: auto;
    margin: 0 auto;
    position: relative;
    border-radius: $border-radius-base;

    &:before {
      animation-name: grow-height, hide-content;
      animation-duration: $reveal-borders-time, 50ms;
      animation-timing-function: $timing-function;
      animation-delay: $starting-delay, $starting-delay + $reveal-borders-time;
      animation-fill-mode: both;
      content: '';
      display: block;
      position: absolute;
      height: 100%;
      z-index: 1;
      transform-origin: center center;
      border-radius: 20px;
    }

    &:before {
      border-right: $border-size solid $gray-600;
      left: 0;
    }
  }

  &-content {
    animation-name: reveal-content;
    animation-duration: 50ms;
    animation-timing-function: $timing-function;
    animation-delay: $starting-delay + $reveal-borders-time;
    animation-fill-mode: both;
    margin: 0;
    padding: 0;
    overflow: visible;
    white-space: nowrap;
  }
}
</style>
