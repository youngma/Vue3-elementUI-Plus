
const tokens = {
  admin: {
    token: 'admin-token'
  },
  editor: {
    token: 'editor-token'
  }
}

const users = {
  'admin-token': {
    roles: ['admin'],
    introduction: 'I am a super administrator',
    avatar: 'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif',
    name: 'Super Admin'
  },
  'editor-token': {
    roles: ['editor'],
    introduction: 'I am an editor',
    avatar: 'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif',
    name: 'Normal Editor'
  }
}

export default [
  // user login
  {
    url: '/dev-api/vue-element-admin/user/login',
    method: 'post',
    response: ({ body }) => {
      const { username } = body
      const token = tokens[username]

      if (!token) {
        return {
          code: 60204,
          message: 'Account and password are incorrect.'
        }
      } else {
        return {
          code: 20000,
          data: token
        }
      }
    }
  },
  // get user info
  {
    url: '/dev-api/vue-element-admin/user/info',
    method: 'get',
    response: ({ query }) => {
      const { token } = query

      const info = users[token]

      // mock error
      if (!info) {
        return {
          code: 50008,
          message: 'Login failed, unable to get user details.'
        }
      }

      return {
        code: 20000,
        data: info
      }
    }
  },

  // user logout
  {
    url: '/dev-api/vue-element-admin/user/logout',
    method: 'post',
    response: ({ body }) => {
      // mock error
      return {
        code: 20000,
        data: 'success'
      }
    }
  }
]
