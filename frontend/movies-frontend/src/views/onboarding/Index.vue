<template>
  <main class="onboarding" id="main">
    <div class="onboarding__content">
      <div class="container container--xxs">
        <transition :name="transitionName" mode="out-in">
          <component :is="$options.board[index]" @next="next" @prev="prev" />
        </transition>
      </div>
    </div>
    <div class="onboarding__footer">
      <div class="container container--xxs d-flex justify-center">
        <transition name="fade" mode="out-in">
          <div v-if="index === 0">
            <router-link :to="{ name: 'PrivacyPolicy' }" class="link mr-1">
              Privacy Policy
            </router-link>
            <router-link :to="{ name: 'TOS' }" class="link">Terms of Service</router-link>
          </div>
          <div
            v-else-if="index < $options.board.length - 1"
            class="d-flex flex-column align-center"
          >
            <ol class="dots">
              <li v-for="(board, i) in $options.board" :key="i">
                <button @click="navigateDot(i)" :class="{ active: i === index, dot: true }">
                  <span class="visually-hidden">
                    Item {{ i + 1 }} of {{ $options.board.length }}.
                  </span>
                  <span class="visually-hidden" v-if="i === index">(Current item)</span>
                </button>
              </li>
            </ol>
            <button @click="finish" class="btn btn--text mt-1">Skip</button>
          </div>
        </transition>
      </div>
    </div>
  </main>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { UserMutations } from '@/store/user/mutations';
import Hello from './Hello.vue';
import Why from './Why.vue';
import Privacy from './Privacy.vue';
import Settings from './Settings.vue';
import { AppSettingPayload } from '@/store/user/types';

export default defineComponent({
  name: 'Onboarding',
  components: {
    Hello,
    Why,
    Privacy,
    Settings,
  },
  // order of onboarding steps
  board: [Hello, Why, Privacy, Settings],
  data() {
    return {
      index: 0,
      transitionName: 'onboard-left',
    };
  },
  methods: {
    prev(): void {
      if (this.index > 0) {
        this.transitionName = 'onboard-right';
        this.index = this.index - 1;
        this.updateUrl();
      }
    },
    next(): void {
      if (this.index + 1 < this.$options.board.length) {
        this.transitionName = 'onboard-left';
        this.index = this.index + 1;
        this.updateUrl();
      } else this.finish();
    },
    updateUrl(): void {
      this.$router.replace({ ...this.$route, query: { ...this.$route.query, step: this.index } });
    },
    finish(): void {
      this.$store.commit(UserMutations.SET_APPSETTING, {
        key: 'showOnboarding',
        val: false,
      } as AppSettingPayload);

      this.$router.replace({ name: 'Home' });
    },
    navigateDot(i: number): void {
      if (this.index === i) return;

      if (this.index > i) {
        this.transitionName = 'onboard-right';
      } else {
        this.transitionName = 'onboard-left';
      }
      this.index = i;
      this.updateUrl();
    },
  },
  created() {
    if (this.$route.query.step) {
      this.index = parseInt(this.$route.query.step as string);
    } else {
      this.updateUrl();
    }
  },
});
</script>

<style lang="scss">
@use 'sass:math';
@import '@/design/variables/index.scss';
@import '@/design/mixins/index.scss';

.onboard-left-enter-active,
.onboard-left-leave-active,
.onboard-right-enter-active,
.onboard-right-leave-active {
  transition: transform 200ms ease, opacity 200ms ease;
}

.onboard-left-enter-from,
.onboard-left-leave-to,
.onboard-right-enter-from,
.onboard-right-leave-to {
  opacity: 0;
}

.onboard-left-enter-from,
.onboard-right-leave-to {
  transform: translateX(20vw);
}
.onboard-left-leave-to,
.onboard-right-enter-from {
  transform: translateX(-20vw);
}

.onboarding {
  $onboarding-bg-color: $__body-bg;

  display: flex;
  flex-direction: column;
  min-height: 100vh; // TODO: browsertest

  &__content {
    overflow: hidden; // needed for onboarding__content sliding transition
    padding-bottom: $default-spacing * 2;

    img {
      // TODO
      max-height: 30vh;
      margin: 0 auto;
      display: block;
    }
  }

  background-color: $onboarding-bg-color;
  padding-top: 15vh;

  &__footer {
    position: -webkit-sticky;
    position: sticky;
    bottom: 0;
    left: 0;
    right: 0;
    background-color: $onboarding-bg-color;

    padding-top: $default-spacing;
    padding-bottom: $default-spacing;
    margin-top: auto;

    // overflow shadow
    &::before {
      content: '';
      position: absolute;
      bottom: 100%;
      left: 0;
      right: 0;
      display: block;
      height: $default-spacing;
      background: linear-gradient(to top, $onboarding-bg-color, transparent);
    }
  }

  .dots {
    margin: 0;
    padding: 0;
    list-style-type: none;
    display: flex;
    justify-content: center;

    li {
      line-height: 0;
      &:not(:last-child) {
        margin-right: math.div($default-spacing, 2);
      }
    }

    .dot {
      background-color: $brand-primary;
      border: none;
      padding: 0;
      width: 12px;
      height: 12px;
      border-radius: 6px;
      display: inline-block;
      position: relative;
      transition: background-color 0.2s ease;

      @include hover() {
        background-color: $brand-primary-dark;
      }

      &::after {
        position: absolute;
        top: 2px;
        left: 2px;
        width: 8px;
        height: 8px;
        border-radius: 4px;
        content: '';
        background-color: $onboarding-bg-color;
        transition: transform 0.2s ease;
      }

      &.active {
        &::after {
          transform: scale(0);
        }
      }
    }
  }
}
</style>
