<template>
  <div>
    <CodeMirror
      :lang="lang"
      basic
      :model-value="code"
      :extensions="extensions"
      @change="update($event)"
      @focus="log('focus', $event)"
      @blur="log('blur', $event)"
    >
    </CodeMirror>
  </div>
</template>

<script setup>

import CodeMirror from 'vue-codemirror6'
import { json, jsonParseLinter } from '@codemirror/lang-json'
import { computed, ref } from 'vue'
import { oneDark } from '@codemirror/theme-one-dark'
import { lintGutter, linter, openLintPanel } from '@codemirror/lint'

const props = defineProps({
  jsonObject: Object
})

const text = ref(props.jsonObject)
const code = computed(() => JSON.stringify(text.value, null, 2))

const lang = json()

const log = console.log
function update(evt) {
  // log(1)
  // text.value = evt.doc.toString()
}

defineOptions({
  name: 'JsonCodeMirror'
})

const extensions = [
  oneDark,
  json(),
  // linter(),
  lintGutter()
]

// export default {
//
//   components: {
//     CodeMirror
//   },
//   props: ['jsonObject'],
//   setup(props) {
//     // eslint-disable-next-line no-undef
//
//
//     return {
//       code,
//       lang,
//       dark,
//       linter,
//       log: console.log
//     }
//   },
//   data() {
//     return {
//       jsonEditor: false
//     }
//   },
//   watch: {
//     // value(value) {
//     //   const editorValue = this.jsonEditor.getValue()
//     //   if (value !== editorValue) {
//     //     this.jsonEditor.setValue(JSON.stringify(this.value, null, 2))
//     //   }
//     // }
//   },
//   mounted() {
//     // this.jsonEditor = CodeMirror.fromTextArea(this.$refs.textarea, {
//     //   lineNumbers: true,
//     //   mode: 'application/json',
//     //   gutters: ['CodeMirror-lint-markers'],
//     //   theme: 'rubyblue',
//     //   lint: true
//     // })
//     //
//     // this.jsonEditor.setValue(JSON.stringify(this.value, null, 2))
//     // this.jsonEditor.on('change', cm => {
//     //   this.$emit('changed', cm.getValue())
//     //   this.$emit('input', cm.getValue())
//     // })
//   },
//   methods: {
//     // getValue() {
//     //   return this.jsonEditor.getValue()
//     // }
//   }
// }
</script>

<style lang="scss" scoped>
.json-editor {
  height: 100%;
  position: relative;

  ::v-deep {
    .CodeMirror {
      height: auto;
      min-height: 300px;
    }

    .CodeMirror-scroll {
      min-height: 300px;
    }

    .cm-s-rubyblue span.cm-string {
      color: #F08047;
    }
  }
}
</style>
