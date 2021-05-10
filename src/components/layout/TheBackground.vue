<template>
  <div
    class="the-background"
    :class="{ dark: isDarkMode }"
  ></div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'TheBackground',
  computed: {
    ...mapState('layout', [
      'isDarkMode'
    ])
  }
}
</script>

<style lang="sass" scoped>
.the-background
  @extend .fixed, .w-100, .h-100
  background: $backgroundPath center/cover no-repeat
  z-index: -1
  &.dark
    filter: brightness(0.5)
</style>
