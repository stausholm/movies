<template>
  <div class="container">
    <div class="row">
      <div v-for="(icon, index) in iconNames" :key="icon" class="col-xs-3 col-12">
        <div class="icon-container p-1">
          <span>{{ icon }}</span>
          <base-icon :iconName="icon">
            <component :is="iconComponents[index]"></component>
          </base-icon>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import icons from '@/components/icons/all';
import BaseIcon from '@/components/base/BaseIcon.vue';

export default defineComponent({
  components: {
    BaseIcon,
  },

  computed: {
    iconNames() {
      return Object.keys(icons);
    },
    iconComponents() {
      return Object.values(icons);
    },
  },
});
</script>

<style lang="scss" scoped>
@import '@/design/variables/index.scss';
@import '@/design/mixins/index.scss';

.icon-container {
  background-color: $gray-400;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column-reverse;
}
</style>
