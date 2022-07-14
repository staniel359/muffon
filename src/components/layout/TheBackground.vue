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
import fs from 'fs'
import {
  mapState
} from 'vuex'

export default {
  name: 'TheBackground',
  computed: {
    ...mapState(
      'layout',
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
        return this.customBackgroundImage
      } else {
        return this.defaultBackgroundImage
      }
    },
    customBackgroundImage () {
      const file =
        fs.readFileSync(
          this.backgroundImagePath
        )

      const blob = new Blob(
        [
          file
        ]
      )

      return URL.createObjectURL(
        blob
      )
    },
    defaultBackgroundImage () {
      return require(
        '*/assets/images/Background.jpg'
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
