
import variables from '@/styles/element-variables.module.scss'

import setting from '@/settings'
import { defineStore } from 'pinia'
import { computed, reactive } from 'vue'

export const settingStore = defineStore('settingStore', () => {
  const { showSettings, tagsView, fixedHeader, sidebarLogo } = setting

  const state = reactive({
    theme: variables.theme,
    showSettings: showSettings,
    tagsView: tagsView,
    fixedHeader: fixedHeader,
    sidebarLogo: sidebarLogo
  })

  const settings = computed(() => {
    return {
      showSettings: state.showSettings,
      needTagsView: state.tagsView,
      fixedHeader: state.fixedHeader
    }
  })

  function changeSetting(data) {
    const { key, value } = data
    if (state.hasOwnProperty(key)) {
      state[key] = value
    }
  }
  return { state, settings, changeSetting }
}, {
  persist: true
})

