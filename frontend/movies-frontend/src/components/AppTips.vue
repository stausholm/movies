<template>
  <base-card
    v-if="activeCard === 1"
    class="mb-2"
    :title="`Tour ${appName}`"
    headingLevel="h2"
    tags=""
    type="tip"
  >
    <!-- TODO: make it -->
    <p>
      Welcome to {{ appName }} 👋 <br />
      Take a tour to see some of the things {{ appName }} provides.
    </p>
    <template #footer>
      <button class="btn btn--text-primary" @click="handleCard1">Take the tour</button>
      <button class="btn btn--text" @click="dismissCard(1)">Dismiss</button>
    </template>
  </base-card>

  <base-card
    v-if="activeCard === 2"
    class="mb-2"
    :title="`Customize what you see in ${appName}`"
    headingLevel="h2"
    tags="Did you know?"
    type="tip"
  >
    <p>Add or remove favourites, adjust app colors, animations, images & more</p>
    <template #footer>
      <router-link class="btn btn--text-primary" :to="{ name: 'Account' }" @click="dismissCard(2)">
        Go to Settings
      </router-link>
      <button class="btn btn--text" @click="dismissCard(2)">Got it</button>
    </template>
  </base-card>

  <base-card
    v-if="activeCard === 3"
    class="mb-2"
    title="Browse all tips"
    headingLevel="h2"
    tags="Did you know?"
    type="tip"
  >
    <p>See all the hot tips for using {{ appName }}, through the settings page</p>
    <template #footer>
      <router-link class="btn btn--text-primary" :to="{ name: 'Tips' }" @click="dismissCard(3)"
        >Show me tips</router-link
      >
      <button class="btn btn--text" @click="dismissCard(3)">Dismiss</button>
    </template>
  </base-card>

  <base-card
    v-if="activeCard === 4"
    class="mb-2"
    title="Quick Access"
    headingLevel="h2"
    tags="Did you know?"
    type="tip"
  >
    <!-- TODO: make it  -->
    <p>Use Quick Access to get around {{ appName }} quickly. Just press:</p>
    <!-- Button will open quick access menu -->
    <button class="btn btn--primary btn--uppercase mr" @click="handleCard4">CTRL + K</button>
    <button class="btn btn--transparent" @click="dismissCard(4)">Dismiss</button>
  </base-card>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import BaseCard from '@/components/base/BaseCard.vue';
import { APP_NAME } from '@/constants/SiteSettings.json';
import { setLocalStorageValue, getLocalStorageValue } from '@/utils/localStorage';
import { sampleOne } from '@/utils/generic';

const APP_TIPS_STORAGE_KEY = 'component:AppTips';

export default defineComponent({
  name: 'AppTips',
  components: {
    BaseCard,
  },
  data() {
    return {
      appName: APP_NAME,
      activeCard: -1,
      dismissedCards: getLocalStorageValue(APP_TIPS_STORAGE_KEY, []),
      cardIds: [1, 2, 3, 4], // NOTE: remember to add a new id to this array, when adding new tips cards in this component
    };
  },
  computed: {
    appLaunchCount(): number {
      return this.$store.getters.appLaunches;
    },
  },
  methods: {
    setActiveCard() {
      if (this.appLaunchCount <= 1 && this.dismissedCards.indexOf(1) === -1) {
        this.activeCard = 1; // this should always be the very first tip the user sees. After the first launch we can show something else
        return;
      }
      const undismissedCards = this.cardIds.filter((x) => this.dismissedCards.indexOf(x) === -1);
      const randomCard = sampleOne(undismissedCards);
      this.activeCard = randomCard ? randomCard : -1;
    },
    dismissCard(cardId: number) {
      setLocalStorageValue(APP_TIPS_STORAGE_KEY, [cardId, ...this.dismissedCards]);
      this.activeCard = -1;
    },
    handleCard1() {
      alert('card1');
      this.dismissCard(1);
    },
    handleCard4() {
      alert('card4');
      this.dismissCard(4);
    },
  },
  created() {
    this.setActiveCard();
  },
});
</script>
