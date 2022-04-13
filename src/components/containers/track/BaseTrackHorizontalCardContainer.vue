<template>
  <div
    :class="[
      'ui horizontal card',
      'main-horizontal-card',
      {
        inverted: isDarkMode
      }
    ]"
  >
    <div class="content">
      <slot />
    </div>

    <div />
  </div>
</template>

<script>
import {
  mapState
} from 'vuex'

export default {
  name: 'BaseTrackHorizontalCardContainer',
  computed: {
    ...mapState(
      'layout',
      [
        'isDarkMode'
      ]
    )
  }
}
</script>

<style lang="sass" scoped>
.content
  @extend .d-flex, .no-border
</style>
