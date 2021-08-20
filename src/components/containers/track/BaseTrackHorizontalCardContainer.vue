<template>
  <div
    class="ui horizontal card main-horizontal-card"
    :class="{ inverted: isDarkMode }"
  >
    <div class="content">
      <slot></slot>
    </div>

    <div></div>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'BaseTrackHorizontalCardContainer',
  computed: {
    ...mapState('layout', [
      'isDarkMode'
    ])
  }
}
</script>

<style lang="sass" scoped>
.content
  @extend .d-flex, .no-border
</style>
