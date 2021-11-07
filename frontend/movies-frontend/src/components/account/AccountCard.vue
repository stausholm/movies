<template>
  <div class="account-card" :class="{ 'account-card--alt': alt }">
    <div class="account-card__avatar d-block position-relative">
      <avatar class="avatar" :colors="avatar.colors" :name="avatar.name" />
      <button
        v-if="enableAvatarEditing"
        @click="toggleAvatarEditor"
        title="Edit avatar"
        class="
          avatar-edit
          position-absolute
          top-0
          left-0
          border-0
          bg-transparent
          d-flex
          justify-center
          align-center
        "
      >
        <span class="visually-hidden">Edit avatar</span>
        <base-icon>
          <icon-edit />
        </base-icon>
      </button>
      <div class="todo shadow" v-if="showAvatarEditor">
        <input type="text" :value="avatar.name" />
        <button
          v-for="color in avatar.colors"
          :key="color"
          :style="{ backgroundColor: color }"
          class="todo-button border-0"
        ></button>
      </div>
    </div>
    <div class="account-card__header pl pr">
      <p class="account-card__title text-big mb-0 fw-bold lh-1 text-truncate text-capitalize">
        {{ avatar.displayName }}
      </p>
      <p class="account-card__subtitle text-small text-truncate">Local user</p>
      <hr class="account-card__divider" />
    </div>
    <div class="account-card__stats pl pr pb">
      <p class="account-card__stat fw-bold">
        Movies: <span class="fw-normal">{{ moviesCount }}</span>
      </p>
      <p class="account-card__stat fw-bold">
        Series: <span class="fw-normal">{{ seriesCount }}</span>
      </p>
      <p class="account-card__stat fw-bold mb-0">
        Starred: <span class="fw-normal">{{ starredCount }}</span>
      </p>
    </div>
  </div>
</template>

<script lang="ts">
import { Avatar as AvatarType } from '@/store/user/types';
import { defineComponent } from 'vue';
import Avatar from '@/components/account/Avatar.vue';
import BaseIcon from '@/components/base/BaseIcon.vue';
import IconEdit from '@/components/icons/IconEdit.vue';

export default defineComponent({
  components: { Avatar, BaseIcon, IconEdit },
  data() {
    return {
      showAvatarEditor: false,
    };
  },
  props: {
    // use alternative styles
    alt: {
      type: Boolean,
      default: false,
    },
    enableAvatarEditing: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    moviesCount(): number {
      return this.$store.getters.movies.length;
    },
    seriesCount(): number {
      return this.$store.getters.series.length;
    },
    starredCount(): number {
      return this.$store.getters.getStarredIds.length;
    },
    avatar(): AvatarType {
      return this.$store.getters.getAppSettings.avatar;
    },
  },
  methods: {
    toggleAvatarEditor(): void {
      this.showAvatarEditor = !this.showAvatarEditor;
    },
  },
});
</script>

<style lang="scss" scoped>
@use 'sass:math';
@import '@/design/variables/index.scss';

.account-card {
  border-radius: $border-radius-base;
  width: 100%;
  background-color: $gray-400;

  &__avatar {
    border: $border-width-large solid $body-bg;
    width: 96px;
    height: 96px;
    border-radius: 50%;
    background: $gray-400;
    transform: translateY(-50%);
    margin: 48px auto (-48px + $default-spacing) auto;

    .avatar {
      width: 100%;
      height: 100%;
    }
  }

  &.account-card--alt {
    padding: $default-spacing;
    background-color: transparent;

    .account-card {
      &__avatar {
        width: 48px;
        height: 48px;
        border-radius: 50%;
        float: left;
        margin-right: $default-spacing;
        margin-bottom: $default-spacing;
        margin-top: 0;
        margin-left: 0;
        border: $border-width-base solid $gray-400;
        transform: none;
      }

      &__header {
        padding: 0;
      }

      &__divider {
        display: none;
      }

      // &__title {
      //   line-height: 1.25;
      // }

      &__stats {
        clear: both;
        background: $gray-400;
        padding: math.div($default-spacing, 2);
        border-radius: $border-radius-small;
      }

      &__stat {
        font-size: $font-size-small;

        &:not(:last-child) {
          margin-bottom: math.div($default-spacing, 4);
        }
      }
    }
  }
}

.avatar-edit {
  width: 100%;
  height: 100%;
  opacity: 0;
  border-radius: 50%;

  &:hover,
  &:focus {
    background-color: rgba($gray-900, 0.55);
    color: $white;
    opacity: 1;
  }
}

.todo {
  background: white;
  display: flex;
  flex-flow: row wrap;
  width: 460px;
  padding: 20px;
  border-radius: 0.5rem;
  position: relative;
  left: 50%;
  transform: translateX(-50%);
  top: 20px;

  &::before {
    content: '';
    width: 12px;
    height: 12px;
    background-color: inherit;
    display: block;
    position: absolute;
    top: 0;
    left: 50%;
    transform: translateX(-9px) translateY(-50%) rotate(45deg);
    box-sizing: border-box;
  }

  input {
    width: 100%;
    margin-bottom: 10px;
  }

  &-button {
    width: 40px;
    height: 40px;
    border-radius: 50%;
  }
}
</style>
