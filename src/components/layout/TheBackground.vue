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
  getLink as getImageFileLink
} from '@/helpers/actions/imageFile'
import defaultImagePath from '@/assets/images/background.jpg'

export default {
  name: 'TheBackground',
  data () {
    return {
      customImageLink: null
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
        return defaultImagePath
      }
    }
  },
  watch: {
    backgroundImagePath: {
      immediate: true,
      handler:
        'handleBackgroundImagePathChange'
    }
  },
  methods: {
    async handleBackgroundImagePathChange (
      value
    ) {
      if (value) {
        this.customImageLink =
          await getImageFileLink(
            this.backgroundImagePath
          )
      } else {
        this.customImageLink = null
      }
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
