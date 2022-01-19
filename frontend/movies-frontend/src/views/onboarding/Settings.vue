<template>
  <div class="">
    <h1 class="text-center">One last thing</h1>
    <label for="avatarname" class="text-normal">What's your firstname?</label>
    <input
      id="avatarname"
      :placeholder="avatar.displayName"
      type="text"
      v-model="displayName"
      class="mb-1"
    />
    <div class="d-flex justify-end button-container">
      <button class="btn btn--text mr btn--responsive" @click="next">Skip</button>
      <button class="btn btn--primary btn--responsive" @click="next">Start browsing</button>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { UserMutations } from '@/store/user/mutations';
import { AppSettingPayload, Avatar as AvatarType } from '@/store/user/types';

export default defineComponent({
  name: 'OnboardingStep4',
  data() {
    return {
      displayName: '',
    };
  },
  computed: {
    avatar(): AvatarType {
      return this.$store.getters.getAppSettings.avatar;
    },
  },
  methods: {
    updateAvatarDisplayName(newVal: string): void {
      this.$store.commit(UserMutations.SET_APPSETTING, {
        key: 'avatar',
        val: { ...this.avatar, displayName: newVal },
      } as AppSettingPayload);
    },
    next() {
      this.updateAvatarDisplayName(this.displayName || 'Anon');
      this.$emit('next');
    },
  },
});
</script>

<style lang="scss" scoped>
@use 'sass:math';
@import '@/design/variables/index.scss';
@import '@/design/mixins/index.scss';

.button-container {
  @include breakpoint-max(xs) {
    flex-flow: row wrap;
    flex-direction: column-reverse;

    .btn {
      margin-bottom: math.div($default-spacing, 2);
      margin-right: 0;
    }
  }
}
</style>
