<template>
  <div
    class="the-background"
    :class="{
      dark: isDarkMode
    }"
    :style="{
      background: backgroundStyle
    }"
  />
</template>

<script>
import {
  mapState
} from 'pinia'
import layoutStore from '@/stores/layout'
import {
  getLink as getFileLink
} from '@/helpers/actions/file'

export default {
  name: 'TheBackground',
  data () {
    return {
      defaultImagePath: require(
        '@/assets/images/Background.jpg'
      )
    }
  },
  computed: {
    ...mapState(
      layoutStore,
      [
        'backgroundImagePath',
        'isDarkMode'
      ]
    ),
    backgroundStyle () {
      return `url(${this.backgroundImage}) center/cover no-repeat`
    },
    backgroundImage () {
      if (this.backgroundImagePath) {
        return this.customImageLink
      } else {
        return this.defaultImagePath
      }
    },
    customImageLink () {
      return getFileLink(
        this.backgroundImagePath
      )
    }
  }
}
</script>

<style lang="sass" scoped>
.the-background
  @extend .fixed, .w-100, .h-100
  &.dark
    filter: brightness(0.5)
</style>
