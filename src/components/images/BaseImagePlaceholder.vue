<template>
  <div
    class="ui image placeholder main-image-placeholder"
    :class="{
      inverted: isDarkMode
    }"
  />
</template>

<script>
import {
  mapState
} from 'pinia'
import layoutStore from '@/stores/layout'

export default {
  name: 'BaseImagePlaceholder',
  computed: {
    ...mapState(
      layoutStore,
      [
        'isDarkMode'
      ]
    )
  }
}
</script>

<style lang="sass" scoped></style>
