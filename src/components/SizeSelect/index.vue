<template>
    <el-dropdown trigger="click" @command="handleSetSize">
      <div >
        <SetUp class="svg-icon"/>
      </div>
      <template #dropdown>
        <el-dropdown-menu >
          <el-dropdown-item v-for="item of sizeOptions" :key="item.value" :disabled="size===item.value" :command="item.value">
            {{
              item.label }}
          </el-dropdown-item>
        </el-dropdown-menu>
      </template>
    </el-dropdown>
</template>

<script setup>

import { computed, reactive } from 'vue'
import router from '@/router'
import { tagsViewStore } from '@/store/modules/tagsView.js'
import { appStore } from '@/store/modules/app.js'

const sizeOptions = reactive([
  { label: 'Default', value: 'default' },
  { label: 'Medium', value: 'medium' },
  { label: 'Small', value: 'small' },
  { label: 'Mini', value: 'mini' }
])

const _tagsViewStore = tagsViewStore()
const _appStore = appStore()
const size = computed(() => _appStore.size)

function handleSetSize(size) {
  this.$ELEMENT.size = size
  _appStore.setSize(size)
  refreshView()

  this.$message({
    message: 'Switch Size Success',
    type: 'success'
  })
}
function refreshView() {
  // In order to make the cached page re-rendered
  _tagsViewStore.delAllCachedViews()

  const { fullPath } = router
  this.$nextTick(() => {
    router.replace({
      path: '/redirect' + fullPath
    })
  })
}

// export default {
//   data() {
//     return {
//       sizeOptions: [
//         { label: 'Default', value: 'default' },
//         { label: 'Medium', value: 'medium' },
//         { label: 'Small', value: 'small' },
//         { label: 'Mini', value: 'mini' }
//       ]
//     }
//   },
//   computed: {
//     size() {
//       return this.$store.getters.size
//     }
//   },
//   methods: {
//     handleSetSize(size) {
//       this.$ELEMENT.size = size
//       this.$store.dispatch('app/setSize', size)
//       this.refreshView()
//       this.$message({
//         message: 'Switch Size Success',
//         type: 'success'
//       })
//     },
//     refreshView() {
//       // In order to make the cached page re-rendered
//       this.$store.dispatch('tagsView/delAllCachedViews', this.$route)
//
//       const { fullPath } = this.$route
//
//       this.$nextTick(() => {
//         this.$router.replace({
//           path: '/redirect' + fullPath
//         })
//       })
//     }
//   }

// }
</script>
