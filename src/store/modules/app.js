import Cookies from 'js-cookie'
import { defineStore } from 'pinia'
export const appStore = defineStore('appStore',
  {
    state: () => ({
      sidebar: {
        opened: Cookies.get('sidebarStatus') ? !!+Cookies.get('sidebarStatus') : true,
        withoutAnimation: false
      },
      device: 'desktop',
      size: Cookies.get('size') || 'medium'
    }),
    getters: {
      getDevice(state) {
        return state.device
      },
      classObj(state) {
        return {
          hideSidebar: !state.sidebar.opened,
          openSidebar: state.sidebar.opened,
          withoutAnimation: state.sidebar.withoutAnimation,
          mobile: state.device === 'mobile'
        }
      }
    },
    actions: {
      toggleSideBar() {
        this.sidebar.opened = !this.sidebar.opened
        this.sidebar.withoutAnimation = false
        if (this.sidebar.opened) {
          Cookies.set('sidebarStatus', 1)
        } else {
          Cookies.set('sidebarStatus', 0)
        }
      },
      closeSideBar({ withoutAnimation }) {
        Cookies.set('sidebarStatus', 0)
        this.sidebar.opened = false
        this.sidebar.withoutAnimation = withoutAnimation
      },
      toggleDevice(device) {
        this.device = device
      },
      setSize(size) {
        this.size = size
      }
    }
  }
)
