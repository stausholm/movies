<template>
  <div class="container">
    <h2>Context menu button</h2>
    <p>
      opens out in a direction depending on which quarter of the viewport, the button was clicked on
    </p>
    <button class="btn btn--primary">tabable content</button>
    <base-spacer :size="4" />
    <div class="demo-context-menu">
      <div class="demo-card p-1 shadow rounded bg-white">
        <context-menu-button
          :actions="contextMenuActions"
          @share="handleShare"
          @test="handleTest"
          id="a"
        />
      </div>
      <div class="demo-card p-1 shadow rounded bg-white">
        <context-menu-button
          :actions="contextMenuActions"
          @share="handleShare"
          @test="handleTest"
          id="b"
          buttonClass="btn--primary btn--outline"
        />
      </div>
      <div class="demo-card p-1 shadow rounded bg-white">
        <context-menu-button
          :actions="contextMenuActions"
          @share="handleShare"
          @test="handleTest"
          id="c"
        />
      </div>
      <div class="demo-card p-1 shadow rounded bg-white">
        <context-menu-button
          :actions="contextMenuActions"
          @share="handleShare"
          @test="handleTest"
          id="d"
        />
      </div>
    </div>
    <button class="btn btn--primary">more tabable content</button>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import ContextMenuButton from '@/components/ContextMenuButton.vue';
import BaseSpacer from '@/components/base/BaseSpacer.vue';

export default defineComponent({
  name: 'ExampleContextMenu',
  components: {
    ContextMenuButton,
    BaseSpacer,
  },
  data() {
    return {
      contextMenuActions: [
        {
          label: 'Share',
          emit: 'share',
          icon: 'Share',
        },
        {
          label: 'Test',
          emit: 'test',
          icon: 'Filmstrip',
        },
        {
          label: "a label that's a little longer longwordisverylongwithoutspacestesttesttesttest",
          emit: 'test',
        },
      ],
    };
  },
  methods: {
    handleShare() {
      console.log('SHARING CLICKED');
    },
    handleTest() {
      console.log('TEST CLICKED');
    },
  },
});
</script>

<style lang="scss" scoped>
.demo-context-menu {
  height: 80vh;
  margin-bottom: 100vh;
  position: relative;

  .demo-card {
    position: absolute;
    &:nth-child(1) {
      top: 0;
      left: 0;
    }
    &:nth-child(2) {
      top: 0;
      right: 0;
    }
    &:nth-child(3) {
      bottom: 0;
      left: 0;
    }
    &:nth-child(4) {
      bottom: 0;
      right: 0;
    }
  }
}
</style>
