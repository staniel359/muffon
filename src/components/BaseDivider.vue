<template>
  <div
    class="ui divider"
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

<style lang="sass" scoped></style>
