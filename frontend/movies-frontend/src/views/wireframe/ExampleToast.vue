<template>
  <div class="container">
    <h2>Toasts</h2>
    <button @click="toast" class="btn btn--primary mb-2 mr">show toast</button>
    <button @click="toastPush" class="btn btn--primary mb-2 mr">push toast</button>
    <button @click="removeToasts" class="btn btn--primary mb-2">remove all toasts</button>
    <br />
    <button @click="toggle1" class="btn btn--primary mb-2 mr">Replace success with warning</button>
    <button @click="toggle2" class="btn btn--primary mb-2">Replace warning with success</button>

    <h2 class="mt-2">Toasts with action</h2>
    <p>
      NB: for accecssibility reasons these should have a sufficiently long enough timeout to be
      interacted with.
    </p>
    <button @click="toggle3" class="btn btn--primary">Toast with action</button>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { ToastMutations } from '@/store/toast/mutations';
import { Toast } from '@/store/toast/types';

export default defineComponent({
  name: 'ExampleToast',
  data() {
    return {};
  },
  methods: {
    toast() {
      this.$store.commit(ToastMutations.CHANGE_TOAST, {
        content: 'test content aaaaaaaa lorem ipsum dolor sit amet lorem ipsum dolor',
        theme: 'danger',
        duration: 1000000,
      } as Toast);
    },
    toastPush() {
      this.$store.commit(ToastMutations.ADD_TOAST, {
        content: 'pushed toast' + Date.now(),
        theme: 'warning',
      } as Toast);
    },
    removeToasts() {
      this.$store.commit(ToastMutations.CLEAR_TOASTS);
    },
    toggle1(): void {
      this.$store.commit(ToastMutations.REMOVE_TOAST_BY_ID, 'appIsOnline');
      this.$store.commit(ToastMutations.ADD_TOAST, {
        id: 'appIsOffline',
        content: "You're offline.",
        theme: 'warning',
        dismissable: false,
        duration: 1000 * 60 * 15, // 15 minutes
      } as Toast);
    },
    toggle2(): void {
      this.$store.commit(ToastMutations.REMOVE_TOAST_BY_ID, 'appIsOffline');
      this.$store.commit(ToastMutations.ADD_TOAST, {
        id: 'appIsOnline',
        content: "You're back online!",
        theme: 'success',
      } as Toast);
    },
    toggle3(): void {
      // eslint-disable-next-line @typescript-eslint/no-this-alias
      const that = this;
      this.$store.commit(ToastMutations.ADD_TOAST, {
        id: 'withAction',
        content: 'A new version of the app is available, refresh to start using the newest verison',
        action() {
          alert('Refresh');
          that.$store.commit(ToastMutations.REMOVE_TOAST_BY_ID, 'withAction');
        },
        actionLabel: 'Refresh',
        duration: 10000000,
        theme: 'success',
      } as Toast);
    },
  },
});
</script>
