<template>
  <div
    class="ui items"
    :class="{
      inverted: (
        isInverted || isDarkMode
      )
    }"
  >
    <div class="item base-info-item">
      <slot />
    </div>
  </div>
</template>

<script>
import {
  mapState
} from 'pinia'
import layoutStore from '@/stores/layout'

export default {
  name: 'BaseItemContainer',
  props: {
    isInverted: Boolean
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
