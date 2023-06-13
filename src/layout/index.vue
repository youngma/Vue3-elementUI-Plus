<template>
  <div :class="layoutComputed.classObj" class="app-wrapper">
    <div v-if="layoutComputed.getDevice==='mobile'&&layoutComputed.sidebar.opened" class="drawer-bg" @click="handleClickOutside" />
    <sidebar class="sidebar-container" />
    <div :class="{ hasTagsView: layoutComputed.needTagsView }" class="main-container">
      <div :class="{'fixed-header': layoutComputed.fixedHeader}">
        <navbar />
        <tags-view v-if="layoutComputed.needTagsView" />
      </div>
      <app-main />
      <right-panel v-if="layoutComputed.showSettings">
        <settings />
      </right-panel>
    </div>
  </div>
</template>

<script setup>
import RightPanel from '@/components/RightPanel/index.vue'
import { AppMain, Navbar, Settings, Sidebar, TagsView } from './components'
// import ResizeMixin from './mixin/ResizeHandler'

import { appStore } from '@/store/modules/app'
import { settingStore } from '@/store/modules/settings'
import { computed } from 'vue'

// import { computed } from 'vue'

const _settingStore = settingStore()
const _appStore = appStore()

const layoutComputed = computed(() => {
  return {
    classObj: _appStore.classObj,
    device: _appStore.getDevice,
    sidebar: _settingStore.settings.sidebar,
    needTagsView: _settingStore.settings.needTagsView,
    showSettings: _settingStore.settings.showSettings,
    fixedHeader: _settingStore.settings.fixedHeader
  }
})

function handleClickOutside() {
  _appStore.closeSideBar({ withoutAnimation: false })
}
</script>

<style lang="scss" scoped>
  @import "@/styles/mixin";
  @import "@/styles/variables";

  .app-wrapper {
    @include clearfix;
    position: relative;
    height: 100%;
    width: 100%;

    &.mobile.openSidebar {
      position: fixed;
      top: 0;
    }
  }

  .drawer-bg {
    background: #000;
    opacity: 0.3;
    width: 100%;
    top: 0;
    height: 100%;
    position: absolute;
    z-index: 999;
  }

  .fixed-header {
    position: fixed;
    top: 0;
    right: 0;
    z-index: 9;
    width: calc(100% - #{$sideBarWidth});
    transition: width 0.28s;
  }

  .hideSidebar .fixed-header {
    width: calc(100% - 54px)
  }

  .mobile .fixed-header {
    width: 100%;
  }
</style>
