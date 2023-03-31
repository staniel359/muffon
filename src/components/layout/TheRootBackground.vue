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
import profileStore from '@/stores/profile'
import defaultImageLink from '@/assets/images/background.jpg'

export default {
  name: 'TheRootBackground',
  computed: {
    ...mapState(
      layoutStore,
      [
        'isDarkMode'
      ]
    ),
    ...mapState(
      profileStore,
      {
        profileId: 'id'
      }
    ),
    backgroundStyle () {
      return `url(${this.imageLink}) center/cover no-repeat`
    },
    imageLink () {
      if (this.profileId) {
        return null
      } else {
        return defaultImageLink
      }
    }
  }
}
</script>

<style lang="sass" scoped></style>
