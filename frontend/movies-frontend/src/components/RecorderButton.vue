<template>
  <div class="recorder-button" :class="{ active: isRecording }">
    <button type="button" @click="handleClick">
      <span class="visually-hidden">{{ label }}</span>
      <base-icon>
        <icon-microphone />
      </base-icon>
    </button>
    <transition name="mic-scale">
      <div v-show="isRecording" class="mic-animation" aria-hidden="true">
        <div class="bar"></div>
        <div class="bar"></div>
        <div class="bar"></div>
        <div class="bar"></div>
      </div>
    </transition>
  </div>
</template>

<script>
// TODO: add lang="ts" on <script> which requires types SpeechRecognition and WebkitSpeechRecognition
import { defineComponent } from 'vue';
import BaseIcon from '@/components/base/BaseIcon.vue';
import IconMicrophone from '@/components/icons/IconMicrophone.vue';
import { isBrowserSafari } from '@/utils/userAgent';

/**
 * handle:
 * permissions,
 * browser support
 * everything else
 *
 * emit:
 * "listening" the recorder has started recording
 * "query" when isFinal, emit the final query
 * "partialQuery": emit this for every update to query, until isFinal
 * "permissionDenied", on click emit this if user has denied permission
 * "unsupported" on click emit this if browser doesnt support speeckrecognition
 * "unsupportedCreated" on Created emit this if browser doesnt support speechrecognition
 */

export default defineComponent({
  name: 'RecorderButton',
  emits: [
    'query',
    'partialQuery',
    'permissionDenied',
    'unsupported',
    'unsupportedCreated',
    'listening',
  ],
  components: {
    BaseIcon,
    IconMicrophone,
  },
  props: {
    lang: {
      type: String,
      default: 'en', // TODO: use app default language constant
    },
    label: {
      type: String,
      default: 'Record voice',
    },
    inputEl: {
      type: HTMLElement,
    },
  },
  data() {
    return {
      recognition: undefined,
      supported: true,
      isSafari: isBrowserSafari(),
      finalTranscript: '',
      timeoutFunc: undefined, // timeout to trigger speechend after certain amount of silence
      isRecording: false,
      storedPlaceholder: '', // placeholder from this.inputEl
    };
  },
  methods: {
    handleClick() {
      if (!this.supported) {
        this.$emit('unsupported');
        return;
      }

      if (this.isRecording) {
        // TODO: does this work?
        this.recognition.stop();
        // this.isRecording = false is this needed?
      } else {
        this.recognition.start();
        this.finalTranscript = '';
      }
    },
    endSpeechAndSearch(query) {
      if (query) {
        if (this.isSafari) {
          query = this.removeDuplicateTranscript(query);
        }

        this.$emit('query', query);

        // TODO: test this.inputEl
        if (this.inputEl) {
          // eslint-disable-next-line vue/no-mutating-props
          this.inputEl.placeholder = this.storedPlaceholder; // restore the input's original placeholder
          // eslint-disable-next-line vue/no-mutating-props
          this.inputEl.value = query;
        }
      }
      this.recognition.stop();
      this.isRecording = false;
    },
    removeDuplicateTranscript(final_transcript) {
      //Handles duplicating words bug in Safari 15
      let transcript = final_transcript.toLowerCase();
      let numWords = transcript.split(' ').length;
      if (numWords & (2 !== 0)) {
        return transcript;
      }
      let firstHalf = transcript
        .substring(0, transcript.length / 2)
        .split(' ')
        .join('');
      let secondHalf = transcript
        .substring(transcript.length / 2, transcript.length)
        .split(' ')
        .join('');
      if (firstHalf === secondHalf) {
        return transcript.substring(0, transcript.length / 2);
      } else {
        return transcript;
      }
    },
  },
  beforeUnmount() {
    // TODO: is this necessary, and is there anything else that needs to be cleaned up?
    this.recognition.stop();
  },
  created() {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
      this.supported = false;
      this.$emit('unsupportedCreated');
      return;
    }

    if (this.inputEl) {
      this.storedPlaceholder = this.inputEl.placeholder || ''; // store the existing value of the input's placeholder, as we will overwrite it with partial querys
      // eslint-disable-next-line vue/no-mutating-props
      this.inputEl.value = ''; // make sure the input's value is empty, so that we can see the placeholder
    }

    this.recognition = new SpeechRecognition();
    this.recognition.continuous = this.isSafari; // avoid a weird bug on Safari by setting continuous to true
    this.recognition.interimResults = true;
    this.recognition.lang = this.lang;

    // delays in ms used for this.timeoutFunc
    const initDelay = 5000;
    const continueDelay = 2000;

    //listeners
    this.recognition.onstart = () => {
      this.timeoutFunc = setTimeout(this.endSpeechAndSearch, initDelay, null);
      this.isRecording = true;
      this.$emit('listening');
    };

    this.recognition.onresult = (event) => {
      let interim_transcript = '';
      for (let i = event.resultIndex; i < event.results.length; ++i) {
        if (event.results[i].isFinal) {
          this.finalTranscript = event.results[i][0].transcript;
          this.endSpeechAndSearch(this.finalTranscript);
        } else {
          interim_transcript += event.results[i][0].transcript;

          if (this.inputEl) {
            // eslint-disable-next-line vue/no-mutating-props
            this.inputEl.placeholder = interim_transcript; // show the current recognized speech as the user is speaking
          }
          this.$emit('partialQuery', interim_transcript);

          // speech started - overwrite initial timeout with continuous timeout
          if (this.timeoutFunc) {
            clearTimeout(this.timeoutFunc);
          }
          this.timeoutFunc = setTimeout(this.endSpeechAndSearch, continueDelay, interim_transcript);
        }
      }
    };

    this.recognition.onspeechend = () => {
      this.isRecording = false;
      if (this.timeoutFunc) {
        clearTimeout(this.timeoutFunc);
      }
    };

    this.recognition.onerror = (event) => {
      this.isRecording = false;
      if (this.timeoutFunc) {
        clearTimeout(this.timeoutFunc);
      }
      // suppress warning for non-fatal 'abort' errors
      // https://developer.mozilla.org/en-US/docs/Web/API/SpeechRecognitionErrorEvent/error
      if (event.error !== 'aborted') {
        console.log('[RecorderButton] Voice recognition failed: ', event);
        // TODO: test what is emitted if user is offline, and emit that, if it has a unique identifier
      }
      if (event.error === 'not-allowed') {
        this.$emit('permissionDenied');
      }
    };
  },
});
</script>

<style lang="scss" scoped>
@use 'sass:math';
@import '@/design/variables/index.scss';
@import '@/design/mixins/index.scss';
.recorder-button {
  position: relative;
  display: inline-block;

  button {
    border: 0;
    padding: 0;
    min-width: $min-touch-target-size;
    min-height: $min-touch-target-size;
    border-radius: 50%;
    line-height: 0;
    background-color: transparent;
  }

  &.active {
    .mic-animation {
      .bar {
        animation-play-state: running;
      }
    }
  }

  .mic-animation {
    display: flex;
    justify-content: center;
    align-items: center;
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    background-color: $white;
    border-radius: 50%;
    pointer-events: none;

    @keyframes equalize {
      0% {
        // height: 19px;
        transform: scaleY(4.75);
      }
      4% {
        // height: 17px;
        transform: scaleY(4.25);
      }
      8% {
        // height: 16px;
        transform: scaleY(4);
      }
      12% {
        // height: 12px;
        transform: scaleY(3);
        opacity: 0.55;
      }
      16% {
        // height: 8px;
        transform: scaleY(2);
      }
      20% {
        // height: 12px;
        transform: scaleY(3);
      }
      24% {
        // height: 16px;
        transform: scaleY(4);
      }
      28% {
        // height: 4px;
        transform: scaleY(1);
      }
      32% {
        // height: 16px;
        transform: scaleY(4);
      }
      36% {
        // height: 19px;
        transform: scaleY(4.75);
      }
      40% {
        // height: 8px;
        transform: scaleY(2);
      }
      44% {
        // height: 16px;
        transform: scaleY(4);
      }
      48% {
        // height: 19px;
        transform: scaleY(4.75);
      }
      52% {
        // height: 12px;
        transform: scaleY(3);
      }
      56% {
        // height: 4px;
        transform: scaleY(1);
      }
      60% {
        // height: 12px;
        transform: scaleY(3);
      }
      64% {
        // height: 19px;
        transform: scaleY(4.75);
      }
      68% {
        // height: 12px;
        transform: scaleY(3);
      }
      72% {
        // height: 19px;
        transform: scaleY(4.75);
      }
      76% {
        // height: 8px;
        transform: scaleY(2);
      }
      80% {
        // height: 19px;
        transform: scaleY(4.75);
      }
      84% {
        // height: 15px;
        transform: scaleY(3.75);
      }
      88% {
        // height: 19px;
        transform: scaleY(4.75);
      }
      92% {
        // height: 8px;
        transform: scaleY(2);
      }
      96% {
        // height: 19px;
        transform: scaleY(4.75);
        opacity: 1;
      }
      100% {
        // height: 19px;
        transform: scaleY(4.75);
      }
    }

    .bar {
      width: 4px;
      height: 4px;
      border-radius: 25%; // magic number that doesn't look too strectched at scaleY(4.75), and still gives rounded corners
      background-color: $brand-primary;
      animation: equalize 8s 0s infinite linear;
      animation-play-state: paused;
      will-change: transform;

      &:not(:last-child) {
        margin-right: 4px;
      }

      &:nth-child(1) {
        animation-delay: -1.9s;
      }
      &:nth-child(2) {
        animation-delay: -2.9s;
      }
      &:nth-child(3) {
        animation-delay: -3.9s;
      }
      &:nth-child(4) {
        animation-delay: -4.9s;
      }
    }
  }
}

.mic-scale-enter-from,
.mic-scale-leave-to {
  opacity: 0;
  transform: scale(0.7);
}
.mic-scale-enter-active {
  transition: opacity 0.2s ease-out, transform 0.2s ease-out;
}
.mic-scale-leave-active {
  transition: opacity 0.2s ease-out, transform 0.1s ease-out;
}
</style>
