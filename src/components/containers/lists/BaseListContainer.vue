<template>
  <div
    class="ui list main-list"
    :class="{ inverted: isDarkMode }"
  >
    <slot></slot>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'BaseListContainer',
  computed: {
    ...mapState('layout', [
      'isDarkMode'
    ])
  }
}
</script>

<style lang="sass" scoped></style>
