<template>
  <el-table :data="list" style="width: 100%;padding-top: 15px;">
    <el-table-column label="Order_No" min-width="200">
      <template #default="scope">
        {{ scope.row.order_no}}
      </template>
    </el-table-column>
    <el-table-column label="Price" width="195" align="right">
      <template #default="scope">
        ¥{{ scope.row.price.toLocaleString('ko-KR')}}
      </template>
    </el-table-column>
    <el-table-column label="Status" width="100" align="center">
      <template #default="{ row }">
<!--        <el-tag :type="row.status ">-->
          {{ row.status }}
<!--        </el-tag>-->
      </template>
    </el-table-column>
  </el-table>
</template>

<script setup>
import { transactionList } from '@/api/remote-search'
import { onMounted, ref } from 'vue'

const list = ref([])

function fetchData() {
  transactionList().then(response => {
    list.value = response.data.items.slice(0, 8)
  })
}

onMounted(() => {
  fetchData()
})

</script>
