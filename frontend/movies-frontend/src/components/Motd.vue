<template>
  <component :is="tag" class="motd" :class="{ animated: animate }">
    <span class="motd-inner">{{ message }}</span>
  </component>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { sampleOne } from '@/utils/generic';

// TODO: translation
const hourMessages = [
  {
    hour: 0,
    message: 'Today is a new day',
  },
  {
    hour: 6,
    message: 'Good early morning',
  },
  {
    hour: 7,
    message: ['Good morning', 'Awesome morning!'],
  },
  {
    hour: 9,
    message: 'Good day',
  },
  {
    hour: 14,
    message: 'Good afternoon',
  },
  {
    hour: 18,
    message: 'Good evening',
  },
  {
    hour: 23,
    message: 'Good night',
  },
];

export default defineComponent({
  name: 'MessageOfTheDay',
  props: {
    fallBackMessage: {
      type: String,
      default: 'Hello there :)',
    },
    tag: {
      type: String,
      default: 'span',
    },
    animate: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    message(): string {
      const currentHour = new Date().getHours();
      const currentMessage = hourMessages.find((x) => x.hour === currentHour)?.message;
      if (!currentMessage) {
        // this doesn't account for 23 being less than 0 and vice versa,
        // but it's not really an issue as long as hour 0 is defined or we use the fallbackMessage
        const closestPreviousHour = hourMessages
          .map((x) => x.hour)
          .sort((a, b) => b - a)
          .find((x) => x < currentHour);

        const closestPreviousMessage = hourMessages.find(
          (x) => x.hour === closestPreviousHour
        )?.message;

        return this.getRandomMessage(closestPreviousMessage);
      }
      return this.getRandomMessage(currentMessage);
    },
  },
  methods: {
    getRandomMessage(message: undefined | string | string[]): string {
      if (!message) {
        return this.fallBackMessage;
      }
      if (Array.isArray(message)) {
        return sampleOne(message) as string;
      }
      return message;
    },
  },
});
</script>

<style lang="scss" scoped>
@import '@/design/variables/index.scss';
@import '@/design/mixins/index.scss';

.motd {
  display: inline-flex;
  overflow: hidden;

  &-inner {
    display: block;
    float: left;
  }

  &.animated {
    .motd-inner {
      animation: move-up 0.8s forwards;
      animation-delay: 1.2s;
      animation-timing-function: $ease-out-quint-ish;
      transform: translateY(115%);
    }
  }
}
@keyframes move-up {
  100% {
    transform: translateY(0%);
  }
}
</style>
