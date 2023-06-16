<template>
  <div :class="{'has-logo':showLogo}">
    <logo v-if="showLogo" :collapse="isCollapse" />
    <el-scrollbar wrap-class="scrollbar-wrapper">
      <el-menu
        :default-active="activeMenu"
        :collapse="isCollapse"
        :background-color="variables.menuBg"
        :text-color="variables.menuText"
        :unique-opened="false"
        :active-text-color="variables.menuActiveText"
        :collapse-transition="false"
        mode="vertical"
      >
        <sidebar-item v-for="route in permission_routes" :key="route.path" :item="route" :base-path="route.path" />
      </el-menu>
    </el-scrollbar>
  </div>
</template>

<script>
// import { mapGetters } from 'vuex'
import Logo from './Logo.vue'
import SidebarItem from './SidebarItem.vue'
import variables from '@/styles/variables.module.scss'

import { permissionStore } from '@/store/modules/permission'
import { settingStore } from '@/store/modules/settings'
import { appStore } from '@/store/modules/app'

export default {
  name: 'SidebarIndex',
  components: { SidebarItem, Logo },
  setup() {
    const permission = permissionStore()
    const setting = settingStore()
    const app = appStore()

    return {
      permission, setting, app
    }
  },
  computed: {
    permission_routes() {
      return this.permission.state.routes
    },
    activeMenu() {
      const route = this.$route
      const { meta, path } = route
      // if set path, the sidebar will highlight the path you set
      if (meta.activeMenu) {
        return meta.activeMenu
      }
      return path
    },
    showLogo() {
      return this.setting.sidebarLogo
    },
    variables() {
      return variables
    },
    isCollapse() {
      return !this.app.sidebar.opened
    }
  }
}
</script>
