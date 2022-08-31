<template>
  <div class="">
    <img src="../../assets/padlock-graphic.svg" alt="" class="fade-up" />
    <h1 class="text-center mt">{{ appName }} is secure</h1>
    <p>
      Your data is yours and yours only. {{ appName }} doesn't do any sort of profiling or analytics
      on your data or usage of {{ appName }}.
    </p>
    <div class="d-flex justify-end button-container">
      <button class="btn btn--text mr btn--responsive" @click="showModal = true">
        How secure?
      </button>
      <button class="btn btn--primary btn--responsive" @click="$emit('next')">Got it</button>
    </div>

    <modal v-if="showModal" @close="showModal = false" cancelLabel="Close">
      <p>Very secure.</p>
    </modal>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { APP_NAME } from '@/constants/SiteSettings.json';
import Modal from '@/components/Modal.vue';

export default defineComponent({
  name: 'OnboardingStep3',
  components: {
    Modal,
  },
  data() {
    return {
      appName: APP_NAME,
      showModal: false,
    };
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

    .btn {
      margin-bottom: math.div($default-spacing, 2);
      margin-right: 0;
    }
  }
}
</style>
