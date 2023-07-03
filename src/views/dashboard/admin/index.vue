<template>
  <div class="dashboard-editor-container">
<!--    <github-corner class="github-corner" />-->

    <panel-group @handleSetLineChartData="handleSetLineChartData" />

    <el-row  style="background:#fff;padding:16px 16px 0;margin-bottom:32px;">

        <Flicking :options="{ renderOnlyVisible: true }">
          <div v-for="idx in flickings" :key="idx" class="flicking-panel has-background-primary has-text-white is-size-1">
            <span class="flicking-index">{{ idx }}</span>
          </div>
        </Flicking>
    </el-row>

    <el-row style="background:#fff;padding:16px 16px 0;margin-bottom:32px;">
<!--      <line-chart :chart-data="lineChartData" />-->
    </el-row>

    <el-row :gutter="32">
      <el-col :xs="24" :sm="24" :lg="8">
        <div class="chart-wrapper">
<!--          <raddar-chart />-->
        </div>
      </el-col>
      <el-col :xs="24" :sm="24" :lg="8">
        <div class="chart-wrapper">
<!--          <pie-chart />-->
        </div>
      </el-col>
      <el-col :xs="24" :sm="24" :lg="8">
        <div class="chart-wrapper">
<!--          <bar-chart />-->
        </div>
      </el-col>
    </el-row>

    <el-row :gutter="8">
      <el-col :xs="{span: 24}" :sm="{span: 24}" :md="{span: 24}" :lg="{span: 12}" :xl="{span: 12}" style="padding-right:8px;margin-bottom:30px;">
        <transaction-table />
      </el-col>
      <el-col :xs="{span: 24}" :sm="{span: 12}" :md="{span: 12}" :lg="{span: 6}" :xl="{span: 6}" style="margin-bottom:30px;">
<!--        <todo-list />-->
      </el-col>
      <el-col :xs="{span: 24}" :sm="{span: 12}" :md="{span: 12}" :lg="{span: 6}" :xl="{span: 6}" style="margin-bottom:30px;">
<!--        <box-card />-->
      </el-col>
    </el-row>
  </div>
</template>

<script setup>
// import GithubCorner from '@/components/GithubCorner/index.vue'
import PanelGroup from './components/PanelGroup.vue'
import { computed, ref } from 'vue'
import Flicking from '@egjs/vue3-flicking'

// import LineChart from './components/LineChart.vue'
// import RaddarChart from './components/RaddarChart.vue'
// import PieChart from './components/PieChart.vue'
// import BarChart from './components/BarChart.vue'
import TransactionTable from './components/TransactionTable.vue'
// import TodoList from './components/TodoList/index.vue'
// import BoxCard from './components/BoxCard.vue'

defineOptions({
  name: 'DashboardAdmin'
})

const lineChartData = ref({
  newVisitis: {
    expectedData: [100, 120, 161, 134, 105, 160, 165],
    actualData: [120, 82, 91, 154, 162, 140, 145]
  },
  messages: {
    expectedData: [200, 192, 120, 144, 160, 130, 140],
    actualData: [180, 160, 151, 106, 145, 150, 130]
  },
  purchases: {
    expectedData: [80, 100, 121, 104, 105, 90, 100],
    actualData: [120, 90, 100, 138, 142, 130, 130]
  },
  shoppings: {
    expectedData: [130, 140, 141, 142, 145, 150, 160],
    actualData: [120, 82, 91, 154, 162, 140, 130]
  }
})

const flickings = ref([1, 2, 3, 4, 5])

function handleSetLineChartData(type) {
  this.value.lineChartData = lineChartData[type]
}

// export default {
//
//   components: {
//     // GithubCorner,
//     PanelGroup
//     // LineChart,
//     // RaddarChart,
//     // PieChart,
//     // BarChart,
//     // TransactionTable,
//     // TodoList,
//     // BoxCard
//   },
//   data() {
//     return {
//       lineChartData: lineChartData.newVisitis
//     }
//   },
//   methods: {
//     handleSetLineChartData(type) {
//       this.lineChartData = lineChartData[type]
//     }
//   }
// }
</script>

<style lang="scss" scoped>
@use '@/styles/dashboard/ficking.css';

.flicking-camera {
  display: flex;
  flex-direction: row;
  height: 100%;
  position: relative;
  width: 100%;
  will-change: transform;
  z-index: 1
}

.flicking-panel {
  align-items: flex-end;
  border-radius: 5px;
  box-sizing: border-box;
  display: flex;
  height: 200px;
  justify-content: flex-start;
  margin-bottom: 10px;
  margin-right: 10px;
  padding: 30px 20px;
  position: relative;
  width: 100%;

  .high {
    height: 300px
  }

  .higher {
    height: 400px
  }

}
.flicking-index {
  min-width: 60px;
  height: 65px;
  position: relative;
  text-align: center;

  :after {
    bottom: -1.2rem;
    content: "PANEL";
    font-size: 1rem;
    font-weight: 700;
    left: 0;
    position: absolute;
    text-align: center;
    width: 100%
  }

  :before {
    border-bottom: 2px solid #fff;
    bottom: .5rem;
    content: "";
    left: 10%;
    position: absolute;
    width: 80%
  }

}

.panel {
  width: 200px;
  height: 200px;
  margin-right: 20px;
  display: inline-flex;
  justify-content: center;
  align-items: center;
}

.has-background-primary {
  background-color: #f2a65e!important;
}

.has-text-white {
  color: #fff!important
}

a.has-text-white:focus,a.has-text-white:hover {
  color: #e6e6e6!important
}

.has-background-white {
  background-color: #fff!important
}

.is-size-1 {
  font-size: 3rem!important;
}

.is-size-2 {
  font-size: 2.5rem!important
}

.is-size-3 {
  font-size: 2rem!important
}

.is-size-4 {
  font-size: 1.5rem!important
}

.is-size-5 {
  font-size: 1.25rem!important
}

.is-size-6 {
  font-size: 1rem!important
}

.is-size-7 {
  font-size: .75rem!important
}

.dashboard-editor-container {
  padding: 32px;
  background-color: rgb(240, 242, 245);
  position: relative;

  .github-corner {
    position: absolute;
    top: 0px;
    border: 0;
    right: 0;
  }

  .chart-wrapper {
    background: #fff;
    padding: 16px 16px 0;
    margin-bottom: 32px;
  }
}

@media (max-width:1024px) {
  .chart-wrapper {
    padding: 8px;
  }
}
</style>

