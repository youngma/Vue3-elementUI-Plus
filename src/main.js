import Cookies from 'js-cookie'
import ElementPlus from 'element-plus'

import '@/styles/index.scss' // global css

import 'normalize.css/normalize.css' // a modern alternative to CSS resets

import '@/styles/element-variables.module.scss'

import enLang from 'element-plus/lib/locale/lang/en'// 如果使用中文语言包请默认支持，无需额外引入，请删除该依赖
// import * as filters from '@/filters' // global filters

import * as ElementPlusIconsVue from '@element-plus/icons-vue'

import { createApp } from 'vue'
import App from './App.vue'
import { createPinia } from 'pinia'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'

import router from './router'
import * as permission from '@/permission.js'

const pinia = createPinia()
pinia.use(piniaPluginPersistedstate)

const newApp = createApp(App)
  .use(pinia)
  .use(router)
  .use(ElementPlus, {
    size: Cookies.get('size') || 'medium', // set element-ui default size
    locale: enLang // 如果使用中文，无需设置，请删除
  })

for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  newApp.component(key, component)
}

newApp.config.globalProperties.$router = router
newApp.provide('$router', newApp.config.globalProperties.$router)

// Object.keys(filters).forEach(key => {
//   newApp.filter(key, filters[key])
// })

// const req = require.context('./svg', false, /\.svg$/)
// const requireAll = requireContext => requireContext.keys().map(requireContext)
// requireAll(req)

newApp.mount('#app')

permission.install()
