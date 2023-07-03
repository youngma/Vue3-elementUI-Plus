<template>
  <div class="components-container" type="">
    <el-row :gutter="20" align="middle">
      <el-col :span="11">
        <div class="editor-container">
          <json-code-mirror ref="jsonEditorBefore" :json-object="value" />
        </div>
      </el-col>
      <el-col :span="2" >
        <el-button primary> >> </el-button>
      </el-col>
      <el-col :span="11">
        <div class="editor-container">
          <json-code-mirror ref="jsonEditorAfter" :json-object="value" />
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import JsonCodeMirror from '@/components/JsonEditor/index.vue'

const jsonData = '[{"items":[{"market_type":"forexdata","symbol":"XAUUSD"},{"market_type":"forexdata","symbol":"UKOIL"},{"market_type":"forexdata","symbol":"CORN"}],"name":""},{"items":[{"market_type":"forexdata","symbol":"XAUUSD"},{"market_type":"forexdata","symbol":"XAGUSD"},{"market_type":"forexdata","symbol":"AUTD"},{"market_type":"forexdata","symbol":"AGTD"}],"name":"贵金属"},{"items":[{"market_type":"forexdata","symbol":"CORN"},{"market_type":"forexdata","symbol":"WHEAT"},{"market_type":"forexdata","symbol":"SOYBEAN"},{"market_type":"forexdata","symbol":"SUGAR"}],"name":"农产品"},{"items":[{"market_type":"forexdata","symbol":"UKOIL"},{"market_type":"forexdata","symbol":"USOIL"},{"market_type":"forexdata","symbol":"NGAS"}],"name":"能源化工"}]'

export default {
  name: 'JsonEditorView',
  components: { JsonCodeMirror },
  data() {
    return {
      value: JSON.parse(jsonData)
    }
  }
}
</script>

<style scoped>
.editor-container{
  position: relative;
  height: 100%;
}
</style>

