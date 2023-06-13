<template>
  <div></div>
</template>

<script>
export default {
  name: 'RedirectView',
  created() {
    const { params, query } = this.$route
    const { path } = params
    this.$router.replace({ path: '/' + path, query })
  },
  render: function(h) {
    return h() // avoid warning message
  }
}
</script>

<script setup>
</script>
