<template>
  <base-button class="btn--rounded">
    <span class="visually-hidden">Additional actions</span>
    <base-icon>
      <icon-more-vert />
    </base-icon>
  </base-button>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import BaseButton from '@/components/base/BaseButton.vue';
import BaseIcon from '@/components/base/BaseIcon.vue';
import IconMoreVert from '@/components/icons/IconMoreVert.vue';

export default defineComponent({
  name: 'ContextMenuButton',
  components: {
    BaseButton,
    BaseIcon,
    IconMoreVert,
  },
  props: {
    actions: {
      type: Array,
      required: true,
    },
  },
});
</script>
