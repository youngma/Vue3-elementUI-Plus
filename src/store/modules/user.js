import * as userAPI from '@/api/user'
import * as AuthUtils from '@/utils/auth'
import router, { resetRouter } from '@/router'

import { permissionStore } from '@/store/modules/permission'
import { tagsViewStore } from '@/store/modules/tagsView'

import { defineStore } from 'pinia'
import { reactive } from 'vue'

export const userStore = defineStore(
  'user', () => {
    const state = reactive({
      token: AuthUtils.getToken(),
      name: '',
      avatar: '',
      introduction: '',
      roles: []
    })

    function login(userInfo) {
      const { username, password } = userInfo
      return new Promise((resolve, reject) => {
        userAPI.login({ username: username.trim(), password: password }).then(response => {
          const { data } = response
          state.token = data.token
          AuthUtils.setToken(data.token)
          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    }

    const getInfo = () => {
      return new Promise((resolve, reject) => {
        userAPI.getInfo(state.token).then(response => {
          const { data } = response

          if (!data) {
            reject('Verification failed, please Login again.')
          }

          const { roles, name, avatar, introduction } = data

          // roles must be a non-empty array
          if (!roles || roles.length <= 0) {
            reject('getInfo: roles must be a non-null array!')
          }

          state.roles = roles
          state.name = name
          state.avatar = avatar
          state.introduction = introduction

          resolve(data)
        }).catch(error => {
          reject(error)
        })
      })
    }

    const logout = () => {
      return new Promise((resolve, reject) => {
        userAPI.logout(state.token).then(() => {
          resetToken().then(r => {
            resetRouter()
            resolve()
          })

          // reset visited views and cached views
          // to fixed https://github.com/PanJiaChen/vue-element-admin/issues/2485
          tagsViewStore.delAllViews(null)
        }).catch(error => {
          reject(error)
        })
      })
    }

    // remove token
    const resetToken = () => {
      return new Promise(resolve => {
        state.token.value = ''
        state.roles.value = []
        AuthUtils.removeToken()
        resolve()
      })
    }

    // dynamically modify permissions
    const changeRoles = async(role) => {
      const token = role + '-token'
      state.token = token

      AuthUtils.setToken(token)

      const { roles } = await getInfo()

      resetRouter()

      // generate accessible routes map based on roles
      const accessRoutes = await permissionStore.generateRoutes(roles)
      // dynamically add accessible routes
      router.addRoutes(accessRoutes)

      // reset visited views and cached views
      // dispatch('tagsView/delAllViews', null, { root: true })
    }

    return { state, login, getInfo, logout, resetToken, changeRoles }
  }, {
    persist: true
  }
)

