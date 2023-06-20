<template>
  <codemirror
    v-model="code"
    placeholder="Code goes here..."
    :autofocus="true"
    :indent-with-tab="true"
    :tab-size="2"
    :extensions="extensions"
    @ready="handleReady"
    @change="log('change', $event)"
    @focus="log('focus', $event)"
    @blur="log('blur', $event)"
  />
</template>

<script>
import { Codemirror } from 'vue-codemirror'
import { javascript } from '@codemirror/lang-javascript'
import { json } from '@codemirror/lang-json'
import { oneDark } from '@codemirror/theme-one-dark'
import { lintGutter, linter, openLintPanel } from '@codemirror/lint'

// import 'codemirror/addon/lint/lint.css'
// import 'codemirror/lib/codemirror.css'
// import 'codemirror/theme/rubyblue.css'
// require('script-loader!jsonlint')
// import 'codemirror/mode/javascript/javascript'
// import 'codemirror/addon/lint/lint'
// import 'codemirror/addon/lint/json-lint'
import { shallowRef, ref } from 'vue'

import Linter from 'eslint4b-prebuilt'

export default {
  name: 'JsonEditor',
  components: {
    Codemirror
  },
  /* eslint-disable vue/require-prop-types */
  props: ['jsonObject'],
  setup(props) {
    // eslint-disable-next-line no-undef
    const code = ref(JSON.stringify(props.jsonObject, null, 2))

    const extensions = [
      lintGutter(),
      oneDark,
      json(),
      javascript()
    ]

    // Codemirror EditorView instance ref
    const view = shallowRef()
    const handleReady = (payload) => {
      view.value = payload.view
    }

    return {
      code,
      extensions,
      handleReady,
      log: console.log
    }
  },
  data() {
    return {
      jsonEditor: false
    }
  },
  watch: {
    // value(value) {
    //   const editorValue = this.jsonEditor.getValue()
    //   if (value !== editorValue) {
    //     this.jsonEditor.setValue(JSON.stringify(this.value, null, 2))
    //   }
    // }
  },
  mounted() {
    // this.jsonEditor = CodeMirror.fromTextArea(this.$refs.textarea, {
    //   lineNumbers: true,
    //   mode: 'application/json',
    //   gutters: ['CodeMirror-lint-markers'],
    //   theme: 'rubyblue',
    //   lint: true
    // })
    //
    // this.jsonEditor.setValue(JSON.stringify(this.value, null, 2))
    // this.jsonEditor.on('change', cm => {
    //   this.$emit('changed', cm.getValue())
    //   this.$emit('input', cm.getValue())
    // })
  },
  methods: {
    // getValue() {
    //   return this.jsonEditor.getValue()
    // }
  }
}
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
