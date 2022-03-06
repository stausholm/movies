<template>
  <svg
    xmlns="http://www.w3.org/2000/svg"
    :width="size"
    :height="size"
    :viewBox="`0 0 ${SIZE} ${SIZE}`"
    role="presentation"
    fill="none"
  >
    <mask :id="maskId" maskUnits="userSpaceOnUse" x="0" y="0" :width="SIZE" :height="SIZE">
      <rect :width="SIZE" :height="SIZE" :rx="square ? undefined : SIZE * 2" fill="white" />
    </mask>
    <g :mask="'url(#' + maskId + ')'">
      <rect :width="SIZE" :height="SIZE" :fill="data.backgroundColor" />
      <rect
        x="0"
        y="0"
        :width="SIZE"
        :height="SIZE"
        :transform="
          'translate(' +
          data.wrapperTranslateX +
          ' ' +
          data.wrapperTranslateY +
          ') rotate(' +
          data.wrapperRotate +
          ' ' +
          SIZE / 2 +
          ' ' +
          SIZE / 2 +
          ') scale(' +
          data.wrapperScale +
          ')'
        "
        :fill="data.wrapperColor"
        :rx="data.isCircle ? SIZE : SIZE / 6"
      />
      <g
        :transform="
          'translate(' +
          data.faceTranslateX +
          ' ' +
          data.faceTranslateY +
          ') rotate(' +
          data.faceRotate +
          ' ' +
          SIZE / 2 +
          ' ' +
          SIZE / 2 +
          ')'
        "
      >
        <path
          v-if="data.isMouthOpen"
          :d="'M15 ' + (19 + data.mouthSpread) + 'c2 1 4 1 6 0'"
          :stroke="data.faceColor"
          fill="none"
          strokeLinecap="round"
        />
        <path
          v-else
          :d="'M13,' + (19 + data.mouthSpread) + ' a1,0.75 0 0,0 10,0'"
          :fill="data.faceColor"
        />
        <rect
          :x="14 - data.eyeSpread"
          y="14"
          width="1.5"
          height="2"
          rx="1"
          stroke="none"
          :fill="data.faceColor"
        />
        <rect
          :x="20 + data.eyeSpread"
          y="14"
          width="1.5"
          height="2"
          rx="1"
          stroke="none"
          :fill="data.faceColor"
        />
      </g>
    </g>
  </svg>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';
import { generateData, SIZE } from '@/components/account/avatarUtils';
import { slugify } from '@/utils/stringToSlug';
export default defineComponent({
  data() {
    return {
      SIZE: SIZE,
    };
  },
  props: {
    name: {
      type: String,
      default: 'user@name.com',
    },
    colors: {
      type: Array as PropType<string[]>,
      default: () => ['#92A1C6', '#146A7C', '#F0AB3D', '#C271B4', '#C20D90'],
    },
    square: {
      type: Boolean,
      default: false,
    },
    size: {
      type: Number,
      default: 40,
    },
  },
  computed: {
    data() {
      return generateData(this.name, this.colors);
    },
    maskId() {
      return `avatar-mask--${slugify(this.name)}`;
    },
  },
});
</script>
