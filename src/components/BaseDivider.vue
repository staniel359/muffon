<template>
  <div
    class="ui divider base-divider"
    :class="{
      inverted: (
        isInverted || isDarkMode
      ),
      horizontal: (
        isHorizontal || text
      )
    }"
  >
    {{ text }}
  </div>
</template>

<script>
import {
  mapState
} from 'pinia'
import layoutStore from '@/stores/layout'

export default {
  name: 'BaseDivider',
  props: {
    isInverted: Boolean,
    isHorizontal: Boolean,
    text: String
  },
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

<style lang="sass" scoped>
.base-divider
  margin: 1.5rem 0
  &.small
    margin: 1rem 0
  &.large
    margin: 2.5rem 0
</style>
