import { appStore } from '@/store/modules/app'

const { body } = document
const WIDTH = 992 // refer to Bootstrap's responsive design

export default {
  setup() {
    const app = appStore()
    return {
      app
    }
  },
  watch: {
    $route(route) {
      if (this.device === 'mobile' && this.sidebar.opened) {
        // store.dispatch('app/closeSideBar', { withoutAnimation: false })
        this.app.closeSideBar({ withoutAnimation: false })
      }
    }
  },
  beforeMount() {
    window.addEventListener('resize', this.$_resizeHandler)
  },
  beforeDestroy() {
    window.removeEventListener('resize', this.$_resizeHandler)
  },
  mounted() {
    const isMobile = this.$_isMobile()
    if (isMobile) {
      this.app.toggleDevice('mobile')
      this.app.closeSideBar({ withoutAnimation: true })

      // store.dispatch('app/toggleDevice', 'mobile')
      // store.dispatch('app/closeSideBar', { withoutAnimation: true })
    }
  },
  methods: {
    // use $_ for mixins properties
    // https://vuejs.org/v2/style-guide/index.html#Private-property-names-essential
    $_isMobile() {
      const rect = body.getBoundingClientRect()
      return rect.width - 1 < WIDTH
    },
    $_resizeHandler() {
      if (!document.hidden) {
        const isMobile = this.$_isMobile()
        // store.dispatch('app/toggleDevice', isMobile ? 'mobile' : 'desktop')
        this.app.toggleDevice(isMobile ? 'mobile' : 'desktop')
        if (isMobile) {
          this.app.closeSideBar({ withoutAnimation: true })
          // store.dispatch('app/closeSideBar', { withoutAnimation: true })
        }
      }
    }
  }
}
