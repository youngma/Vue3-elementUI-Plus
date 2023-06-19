<template>
  <el-scrollbar ref="scrollContainer" :vertical="false" class="scroll-container" wheel.native.prevent="handleScroll" @scroll="emitScroll">
    <slot />
  </el-scrollbar>
</template>

<script>
const tagAndTagSpacing = 4 // tagAndTagSpacing
import { ref } from 'vue'

export default {
  name: 'ScrollPane',
  setup: () => {
    const scrollContainer = ref()
    return {
      scrollContainer
    }
  },
  data() {
    return {
      left: 0
    }
  },
  computed: {
    scrollWrapper() {
      return this.scrollContainer.wrapRef
    }
  },
  mounted() {
    this.scrollWrapper.addEventListener('scroll', this.emitScroll, true)
  },
  unmounted() {
    this.scrollWrapper.removeEventListener('scroll', this.emitScroll)
  },
  methods: {
    handleScroll(e) {
      const eventDelta = e.wheelDelta || -e.deltaY * 40
      const $scrollWrapper = this.scrollWrapper
      $scrollWrapper.scrollLeft = $scrollWrapper.scrollLeft + eventDelta / 4
    },
    emitScroll() {
      this.$emit('scroll')
    },
    moveToTarget(currentTag) {
      const $container = this.scrollContainer.$el
      const $containerWidth = $container.offsetWidth
      const $scrollWrapper = this.scrollContainer

      const tagList = this.$parent.$refs.tagRef

      let firstTag = null
      let lastTag = null

      // find first tag and last tag
      if (tagList.length > 0) {
        firstTag = tagList[0]
        lastTag = tagList[tagList.length - 1]
      }

      if (firstTag.to.fullPath === currentTag.fullPath) {
        $scrollWrapper.scrollLeft = 0
      } else if (lastTag.to.fullPath === currentTag.fullPath) {
        $scrollWrapper.scrollLeft = $scrollWrapper.scrollWidth - $containerWidth
      } else {
        // find preTag and nextTag
        const currentIndex = tagList.findIndex(item => item.to.fullPath === currentTag.fullPath)
        const prevTag = tagList[currentIndex - 1]
        const nextTag = tagList[currentIndex + 1]

        console.log(3, currentIndex)
        console.log(4, prevTag)
        console.log(5, nextTag)

        // the tag's offsetLeft after of nextTag
        const afterNextTagOffsetLeft = nextTag.$el.nextSibling.offsetLeft + nextTag.$el.nextSibling.offsetWidth + tagAndTagSpacing

        // the tag's offsetLeft before of prevTag
        const beforePrevTagOffsetLeft = prevTag.$el.nextSibling.offsetLeft - tagAndTagSpacing

        if (afterNextTagOffsetLeft > $scrollWrapper.scrollLeft + $containerWidth) {
          $scrollWrapper.scrollLeft = afterNextTagOffsetLeft - $containerWidth
        } else if (beforePrevTagOffsetLeft < $scrollWrapper.scrollLeft) {
          $scrollWrapper.scrollLeft = beforePrevTagOffsetLeft
        }
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.scroll-container {
  white-space: nowrap;
  position: relative;
  overflow: hidden;
  width: 100%;
  ::v-deep {
    .el-scrollbar__bar {
      bottom: 0px;
    }
    .el-scrollbar__wrap {
      height: 49px;
    }
  }
}
</style>
