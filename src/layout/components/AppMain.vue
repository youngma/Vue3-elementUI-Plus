<template>
  <section class="app-main">
      <router-view v-slot="{ Component, route }">
        <transition name="fade-transform" mode="out-in">
          <keep-alive :include="cachedViews">
              <component :is="Component" :key="route.path" />
          </keep-alive>
        </transition>
      </router-view>
  </section>
</template>

<script setup>

import { tagsViewStore } from '@/store/modules/tagsView.js'
import { computed } from 'vue'

import router from '@/router'

const _tagViewStore = tagsViewStore()

const cachedViews = computed(() => _tagViewStore.getCachedViews)
const key = computed(() => router.path)

// export default {
//   name: 'AppMain',
//   setup() {
//     return {
//       tagView
//     }
//   },
//   computed: {
//     cachedViews() {
//       return this.tagView.cachedViews
//     },
//     key() {
//       return this.$route.path
//     }
//   }
// }
</script>

<style lang="scss" scoped>
.app-main {
  /* 50= navbar  50  */
  min-height: calc(100vh - 50px);
  width: 100%;
  position: relative;
  overflow: hidden;
}

.fixed-header+.app-main {
  padding-top: 50px;
}

.hasTagsView {
  .app-main {
    /* 84 = navbar + tags-view = 50 + 34 */
    min-height: calc(100vh - 84px);
  }

  .fixed-header+.app-main {
    padding-top: 84px;
  }
}
</style>

<style lang="scss">
// fix css style bug in open el-dialog
.el-popup-parent--hidden {
  .fixed-header {
    padding-right: 15px;
  }
}
</style>
