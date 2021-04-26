<template>
  <div
    class="ui popup main-popup"
    :class="{ inverted: isDarkMode }"
  >
    <div class="content">
      <slot></slot>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'BasePopupContainer',
  computed: {
    ...mapState('layout', [
      'isDarkMode'
    ])
  }
}
</script>

<style lang="sass" scoped>
.content
  @extend .h-100, .d-flex, .flex-column, .align-items-center
</style>
