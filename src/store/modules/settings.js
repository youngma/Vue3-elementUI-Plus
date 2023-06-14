
import variables from '@/styles/element-variables.scss?inline'

import setting from '@/settings'
import { defineStore } from 'pinia'
import { computed, reactive } from 'vue'

export const settingStore = defineStore('settingStore', () => {
  const { showSettings, tagsView, fixedHeader, sidebarLogo } = setting

  console.log(variables)

  const state = reactive({
    theme: '#1890ff',
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

