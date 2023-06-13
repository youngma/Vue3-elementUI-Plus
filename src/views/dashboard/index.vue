<template>
  <div class="dashboard-container">
    <component :is="currentRole" />
  </div>
</template>

<script>
// import { mapGetters } from 'vuex'
import adminDashboard from './admin/index.vue'
import editorDashboard from './editor/index.vue'

import { userStore } from '@/store/modules/user.js'
export default {
  name: 'DashboardMain',
  components: { adminDashboard, editorDashboard },
  setup() {
    const user = userStore()
    return {
      user
    }
  },
  data() {
    return {
      currentRole: 'adminDashboard'
    }
  },
  computed: {
    role() { return this.user.state.roles }
  },
  created() {
    if (!this.role.includes('admin')) {
      this.currentRole = 'editorDashboard'
    }
  }
}
</script>
