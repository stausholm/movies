<template>
  <div class="container">
    <h2>Web share api</h2>
    <p>Sharing supported: {{ sharingSupported }}</p>
    <input type="file" name="" id="" ref="fileinput" class="mb" multiple />
    <button @click="shareCurrentUrl" class="btn btn--primary btn--responsive mr mb">
      Share current page
    </button>
    <button @click="shareUrl" class="btn btn--primary btn--responsive mr mb">
      Share another url
    </button>
    <button @click="shareText" class="btn btn--primary btn--responsive mr mb">
      Share some text
    </button>
    <button @click="shareImage" class="btn btn--primary btn--responsive mr mb">
      Share an image
    </button>
    <button @click="shareFiles" class="btn btn--primary btn--responsive mr mb">
      Share file(s) from file input
    </button>
    <button @click="shareInvalid" class="btn btn--primary btn--responsive mr mb">
      Share something invalid
    </button>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { getShareUrl, sharingSupported, share, shareResult } from '@/utils/webShare';
import { Toast } from '@/store/toast/types';
import { ToastMutations } from '@/store/toast/mutations';

export default defineComponent({
  name: 'ExampleSharing',
  components: {},
  data() {
    return {
      sharingSupported: true,
    };
  },
  methods: {
    shareCurrentUrl() {
      share({
        title: 'Current url!',
        url: getShareUrl(),
      }).then(this.handleSharingCallback);
    },
    shareUrl() {
      share({
        title: 'Web.dev Learn PWA!',
        url: 'https://web.dev/learn/pwa',
      }).then(this.handleSharingCallback);
    },
    shareText() {
      share({
        title: 'This is a title',
        text: 'Progressive Web Apps are cool!',
      }).then(this.handleSharingCallback);
    },
    async shareImage() {
      const response = await fetch(
        'https://cdn.glitch.me/606fe2ae-f386-47d3-9892-c6d18ca17998%2F9b775a52-d700-4208-84e9-18578ee75266_icon.jpeg?v=1637764108088'
      );
      const imageBlob = await response.blob();
      const imageFile = new File([imageBlob], 'logo.png', { type: 'image/png' });
      const filesArray = [imageFile];
      share({
        // TODO: update typescript
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        files: filesArray,
        title: 'PWA Logo',
      }).then(this.handleSharingCallback);
    },
    shareFiles() {
      const input = this.$refs.fileinput as HTMLInputElement;
      const files = input.files;
      if (!files?.length) return;

      share({
        // TODO: update typescript
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        files,
      }).then(this.handleSharingCallback);
    },
    shareInvalid() {
      share({
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        files: [''],
      })
        .then(this.handleSharingCallback)
        .catch((err) => {
          this.handleSharingCallback('error');
        });
    },
    handleSharingCallback(result: shareResult) {
      if (result === 'success') {
        this.$store.commit(ToastMutations.ADD_TOAST, {
          content: 'Successfully shared content',
          theme: 'success',
        } as Toast);
      } else {
        this.$store.commit(ToastMutations.ADD_TOAST, {
          content: 'Failed to share',
          theme: 'danger',
        } as Toast);
      }
    },
  },
  created() {
    this.sharingSupported = sharingSupported();
  },
});
</script>
