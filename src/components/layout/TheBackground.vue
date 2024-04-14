<template>
  <div
    class="main-background"
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
import defaultImageLink from '@/assets/images/background.jpg'

export default {
  name: 'TheBackground',
  data () {
    return {
      imageLink: null
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
      return `url(${this.imageLink}) center/cover no-repeat`
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
    async handleBackgroundImagePathChange () {
      this.imageLink =
        await this.getImageLink()
    },
    getImageLink () {
      if (this.backgroundImagePath) {
        return getImageFileLink(
          this.backgroundImagePath
        )
      } else {
        return defaultImageLink
      }
    }
  }
}
</script>

<style lang="sass" scoped></style>
