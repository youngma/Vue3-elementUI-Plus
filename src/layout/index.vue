<template>
  <div :class="layoutComputed.classObj" class="app-wrapper">
    <el-container>
      <el-aside class="sidebar-container">
        <sidebar />
      </el-aside>
      <el-container :class="{ hasTagsView: layoutComputed.needTagsView }" class="main-container">
        <el-header :class="{'fixed-header': layoutComputed.fixedHeader}">
          <navbar />
          <tags-view v-if="layoutComputed.needTagsView" />
        </el-header>
        <el-main class="app-main">
          <app-main />
          <right-panel v-if="layoutComputed.showSettings">
              <settings />
          </right-panel>
        </el-main>
      </el-container>
    </el-container>
  </div>

<!--  <div :class="layoutComputed.classObj" class="app-wrapper">-->
<!--    <div v-if="layoutComputed.getDevice==='mobile'&&layoutComputed.sidebar.opened" class="drawer-bg" @click="handleClickOutside" />-->
<!--    <sidebar class="sidebar-container" />-->
<!--    <div :class="{ hasTagsView: layoutComputed.needTagsView }" class="main-container">-->
<!--        <div :class="{'fixed-header': layoutComputed.fixedHeader}">-->
<!--          <navbar />-->
<!--          <tags-view v-if="layoutComputed.needTagsView" />-->
<!--        </div>-->

<!--      <app-main />-->

<!--      <right-panel v-if="layoutComputed.showSettings">-->
<!--          <settings />-->
<!--      </right-panel>-->
<!--    </div>-->
<!--  </div>-->
</template>

<script setup>

const { body } = document
const WIDTH = 992 // refer to Bootstrap's responsive design

import RightPanel from '@/components/RightPanel/index.vue'
import { AppMain, Navbar, Settings, Sidebar, TagsView } from './components'
// import ResizeMixin from './mixin/ResizeHandler'

import { appStore } from '@/store/modules/app'
import { settingStore } from '@/store/modules/settings'
import {computed, inject, onBeforeMount, onBeforeUnmount, onMounted, reactive, ref, watch} from 'vue'

const router = inject('$router')

const _settingStore = settingStore()
const _appStore = appStore()

const layoutComputed = computed(() => {
  return {
    classObj: _appStore.classObj,
    device: _appStore.getDevice,
    sidebar: _appStore.sidebar,
    needTagsView: _settingStore.settings.needTagsView,
    showSettings: _settingStore.settings.showSettings,
    fixedHeader: _settingStore.settings.fixedHeader
  }
})

function $_isMobile() {
  const rect = body.getBoundingClientRect()
  return rect.width - 1 < WIDTH
}

function $_resizeHandler() {
  if (!document.hidden) {
    const isMobile = $_isMobile()
    // store.dispatch('app/toggleDevice', isMobile ? 'mobile' : 'desktop')
    _appStore.toggleDevice(isMobile ? 'mobile' : 'desktop')
    if (isMobile) {
      _appStore.closeSideBar({ withoutAnimation: true })
      // store.dispatch('app/closeSideBar', { withoutAnimation: true })
    }
  }
}

watch(
  () => router.currentRoute.value.fullPath,
  async fullPath => {
    if (_appStore.getDevice === 'mobile' && _appStore.sidebar.opened) {
      // store.dispatch('app/closeSideBar', { withoutAnimation: false })
      _appStore.closeSideBar({ withoutAnimation: false })
    }
  }
)

onMounted(() => {
  const isMobile = $_isMobile()
  if (isMobile) {
    _appStore.toggleDevice('mobile')
    _appStore.closeSideBar({ withoutAnimation: true })
  }
})

onBeforeMount(() => {
  window.addEventListener('resize', $_resizeHandler)
})

onBeforeUnmount(() => {
  window.removeEventListener('resize', $_resizeHandler)
})

function handleClickOutside() {
  _appStore.closeSideBar({ withoutAnimation: false })
}

</script>

<style lang="scss" scoped>
  @import "@/styles/mixin";
  @import "@/styles/variables.module.scss";

  .app-wrapper {
    @include clearfix;
    position: relative;
    height: 100%;
    width: 100%;

    &.mobile.openSidebar {
      position: fixed;
      top: 0;
    }
    .el-header {
      padding: 0;
      height: auto;
    }

    .el-main {
      padding: 0;
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
