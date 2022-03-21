<template>
  <button @click="toggle">
    <base-icon>
      <icon-star-filled v-if="isFavorited" />
      <icon-star v-else />
    </base-icon>
    <span>{{ buttonLabel }}</span>
  </button>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { UserMutations } from '@/store/user/mutations';
import IconStar from '@/components/icons/IconStar.vue';
import IconStarFilled from '@/components/icons/IconStarFilled.vue';
import BaseIcon from '@/components/base/BaseIcon.vue';

export default defineComponent({
  name: 'FavoriteToggle',
  components: {
    BaseIcon,
    IconStar,
    IconStarFilled,
  },
  props: {
    imdbID: {
      type: String,
      required: true,
    },
  },
  data() {
    return {};
  },
  computed: {
    isFavorited(): boolean {
      return (this.$store.getters.getStarredIds as string[]).includes(this.imdbID);
    },
    buttonLabel() {
      return this.isFavorited ? 'Unstar' : 'Star';
    },
  },
  methods: {
    toggle() {
      if (this.isFavorited) {
        this.$store.commit(UserMutations.REMOVE_STARRED, this.imdbID);
      } else {
        this.$store.commit(UserMutations.ADD_STARRED, this.imdbID);
      }
    },
  },
});
</script>
