import { ElMessage } from 'element-plus'
import NProgress from 'nprogress' // progress bar
import 'nprogress/nprogress.css' // progress bar style
import { getToken } from '@/utils/auth' // get token from cookie
import getPageTitle from '@/utils/get-page-title'

import { permissionStore } from '@/store/modules/permission.js'
import { userStore } from '@/store/modules/user.js'

export {
  generateRoutes
}

async function generateRoutes(router) {

  const _permissionStore = permissionStore()
  const _userStore = userStore()

  // get user info
  const { roles } = await _userStore.getInfo()

  // generate accessible routes map based on roles
  await _permissionStore.generateRoutes(router, roles)

  install(router)
}

function install(router) {

  // const _permissionStore = permissionStore()

  NProgress.configure({ showSpinner: false }) // NProgress Configuration

  const whiteList = ['/login', '/auth-redirect'] // no redirect whitelist

  router.beforeEach(async(to, from, next) => {

    const _userStore = userStore()

    // start progress bar
    NProgress.start()

    // set page title
    document.title = getPageTitle(to.meta.title)

    // determine whether the user has logged in
    const hasToken = getToken()
    if (hasToken) {
      if (to.path === '/login') {
        // if is logged in, redirect to the home page
        next({ path: '/' })
        NProgress.done() // hack: https://github.com/PanJiaChen/vue-element-admin/pull/2939
      } else {
        // determine whether the user has obtained his permission roles through getInfo
        const hasRoles = _userStore.state.roles && _userStore.state.roles.length > 0
        if (hasRoles) {
          // this.generateRoutes(router)
          next()
        } else {
          try {
            // this.generateRoutes(router)
            next({ ...to, replace: true })
          } catch (error) {
            // console.log(error)
            // remove token and go to login page to re-login
            ElMessage.error(error || 'Has Error')
            next(`/login?redirect=${to.path}`)
            NProgress.done()
          }
        }
      }
    } else {
      /* has no token*/
      if (whiteList.indexOf(to.path) !== -1) {
        // in the free login whitelist, go directly
        next()
      } else {
        // other pages that do not have permission to access are redirected to the login page.
        next(`/login?redirect=${to.path}`)
        NProgress.done()
      }
    }
  })

  router.afterEach(() => {
    // finish progress bar
    NProgress.done()
  })
}

