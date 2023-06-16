import { asyncRoutes, constantRoutes } from '@/router'
import { defineStore } from 'pinia'
import { reactive } from 'vue'

export const permissionStore = defineStore('permissionStore', () => {
  const state = reactive({
    routes: [],
    addRoutes: []
  })

  /**
   * Use meta.role to determine if the current user has permission
   * @param roles
   * @param route
   */
  function hasPermission(roles, route) {
    if (route.meta && route.meta.roles) {
      return roles.some(role => route.meta.roles.includes(role))
    } else {
      return true
    }
  }

  /**
   * Filter asynchronous routing tables by recursion
   * @param routes asyncRoutes
   * @param roles
   */
  function filterAsyncRoutes(routes, roles) {
    const res = []

    state.routes.forEach(route => {
      const tmp = { ...route }
      if (hasPermission(roles, tmp)) {
        if (tmp.children) {
          tmp.children = filterAsyncRoutes(tmp.children, roles)
        }
        res.push(tmp)
      }
    })

    return res
  }

  function generateRoutes(router, roles) {
    return new Promise(resolve => {
      let accessedRoutes
      if (roles.includes('admin')) {
        accessedRoutes = asyncRoutes || []
      } else {
        accessedRoutes = filterAsyncRoutes(asyncRoutes, roles)
      }

      this.state.addRoutes = accessedRoutes
      this.state.routes = constantRoutes.concat(accessedRoutes)

      accessedRoutes.forEach(route => router.addRoute(route))

      resolve()
    })
  }

  return { state, generateRoutes }
}, {
  persist: true
})
