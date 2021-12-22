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
      combination with darkmode enabled
    </p>
    <div class="row">
      <div class="col-6">
        <img class="rounded" src="TODO" alt="" style="filter: grayscale(0)" />
        <span class="d-block text-center fw-bold mt text-small">No filters</span>
      </div>
      <div class="col-6">
        <img
          class="rounded"
          src="TODO"
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
      // TODO: image grayscale filter could also benefit from brightness(0.9)
      // TODO: update css variable on initial pageload like we already do with color theme
      this.$store.commit(UserMutations.SET_APPSETTING, {
        key: 'imageSaturation',
        val: parseInt(this.imageSaturationValueLocal),
      } as AppSettingPayload);

      // TODO: add css variable on :root css rule if possible. Currently it adds it inline on the html node
      // TODO: hardcoded value for name :(
      setCssVariable('--ui-saturation-percentage', this.imageSaturationValueLocal + '%');
    },
    closeImageSaturationModal(): void {
      this.showImageSaturationModal = false;
      this.imageSaturationValueLocal = this.$store.getters.getAppSettings.imageSaturation; // reset local back to current store value in case the user adjusts the local value to preview it, but doesn't save their changes
    },
  },
});
</script>
