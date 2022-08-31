<template>
  <settings-item
    @click="showImageSaturationModal = true"
    title="Image saturation"
    subtitle="Adjust the vibrance of colors in images"
    :actionLabel="imageSaturationLabel"
    aria-haspopup="true"
  />
  <modal
    v-if="showImageSaturationModal"
    @close="closeImageSaturationModal"
    title="Image saturation"
    confirmLabel="Save"
    @confirm="updateImageSaturationValue"
  >
    <p>
      Adjusting the saturation of images can make them easier on the eye. This can work great in
      combination with darkmode enabled. Around 50-70% tends to be the preferred choice.
    </p>
    <div class="row">
      <div class="col-6">
        <img
          class="rounded no-saturate-filter shadow-sm"
          src="../../assets/colorful-balls.webp"
          alt=""
        />
        <span class="d-block text-center fw-bold mt text-small">No filters</span>
      </div>
      <div class="col-6">
        <img
          class="rounded shadow-sm"
          src="../../assets/colorful-balls.webp"
          alt=""
          :style="`filter: grayscale(${imageSaturationValueLocal}%)`"
        />
        <span class="d-block text-center fw-bold mt text-small"
          >{{ imageSaturationValueLocal }}% Gray</span
        >
      </div>
    </div>
    <label for="imageSaturationSlider" class="visually-hidden">Adjust saturation</label>
    <input
      type="range"
      name="imageSaturationSlider"
      id="imageSaturationSlider"
      min="0"
      max="100"
      step="10"
      v-model="imageSaturationValueLocal"
    />
  </modal>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { AppSettingPayload } from '@/store/user/types';
import { UserMutations } from '@/store/user/mutations';
import Modal from '@/components/Modal.vue';
import SettingsItem from '@/components/account/SettingsItem.vue';
import { setCssVariable } from '@/utils/setCssVariable';

export default defineComponent({
  name: 'SettingsItemImageSaturation',
  components: {
    SettingsItem,
    Modal,
  },
  data() {
    return {
      showImageSaturationModal: false,
      imageSaturationValueLocal: this.$store.getters.getAppSettings.imageSaturation || 0,
    };
  },
  computed: {
    imageSaturationLabel(): string {
      return this.$store.getters.getAppSettings.imageSaturation === 0
        ? 'Off'
        : this.$store.getters.getAppSettings.imageSaturation + '%';
    },
  },
  methods: {
    updateImageSaturationValue(): void {
      // https://medium.com/dev-channel/re-colorization-for-dark-mode-19e2e17b584b
      this.$store.commit(UserMutations.SET_APPSETTING, {
        key: 'imageSaturation',
        val: parseInt(this.imageSaturationValueLocal),
      } as AppSettingPayload);

      // NOTE: Variable is initialized in app.vue created() hook
      setCssVariable('--ui-saturation-percentage', this.imageSaturationValueLocal + '%');
    },
    closeImageSaturationModal(): void {
      this.showImageSaturationModal = false;
      this.imageSaturationValueLocal = this.$store.getters.getAppSettings.imageSaturation; // reset local back to current store value in case the user adjusts the local value to preview it, but doesn't save their changes
    },
  },
});
</script>
