<template>
  <router-link :to="to" v-if="!type || type === 'internal'" class="block-link">
    <span class="slot">
      <slot></slot>
    </span>
    <base-icon>
      <component :is="icon" />
    </base-icon>
  </router-link>
  <a :href="to" v-else target="_blank" rel="noopener noreferrer" class="block-link">
    <span class="slot">
      <slot></slot>
    </span>
    <base-icon>
      <component :is="icon" />
    </base-icon>
  </a>
</template>

<script lang="ts">
import { Component, defineComponent, PropType } from 'vue';
import BaseIcon from '@/components/base/BaseIcon.vue';
import IconArrowRight from '@/components/icons/IconArrowRight.vue';
import IconExternalLink from '@/components/icons/IconExternalLink.vue';
import IconFolderZip from '@/components/icons/IconFolderZip.vue';
import IconFile from '@/components/icons/IconFile.vue';
import IconDocument from '@/components/icons/IconDocument.vue';
import IconImage from '@/components/icons/IconImage.vue';

export default defineComponent({
  name: 'BlockLink',
  components: {
    BaseIcon,
  },
  props: {
    type: {
      type: String as PropType<'internal' | 'external' | 'file' | 'image' | 'folder' | 'document'>,
      required: false,
    },
    to: {
      type: [String, Object],
      required: true,
    },
  },
  computed: {
    icon(): Component {
      if (!this.type || this.type === 'internal') {
        return IconArrowRight;
      }

      const isFolder = this.to.match(/\.(zip|7z|rar|folder)$/i);
      const isImage = this.to.match(/\.(png|jpg|jpeg|gif|image|tiff?|bmp|webp)$/i);
      const isDocument = this.to.match(/\.(doc|docx|docm|pdf)$/i);
      switch (this.type) {
        case 'external':
          return IconExternalLink;
        case 'file':
          // try to be smart about file icons
          if (isFolder) return IconFolderZip;
          if (isImage) return IconImage;
          if (isDocument) return IconDocument;
          return IconFile;
        case 'image':
          return IconImage;
        case 'folder':
          return IconFolderZip;
        case 'document':
          return IconDocument;
        default:
          return IconArrowRight;
      }
    },
  },
});
</script>

<style lang="scss">
@use 'sass:math';
@import '@/design/variables/index.scss';
@import '@/design/mixins/index.scss';

.block-link {
  padding: $default-spacing 0;
  font-weight: bold;
  color: inherit;
  display: flex;
  justify-content: space-between;
  align-items: center;
  text-decoration: none;

  .slot {
    flex: 1;
  }

  svg {
    opacity: 0.54;
    margin-left: math.div($default-spacing, 2);
    transform: scale(0.8);
  }

  @include breakpoint(ipad-landscape) {
    svg {
      transition: transform 0.2s ease-out;
      transform: translateX(-10px);
    }
    .slot {
      transition: transform 0.2s ease-out;
    }

    @include hover() {
      svg {
        transform: translateX(0);
      }

      .slot {
        transform: translateX(10px);
      }
    }
  }
}

.block-link-wrapper {
  border-bottom: 1px solid $gray-300;

  .block-link {
    border-top: 1px solid $gray-300;
  }
}
</style>
