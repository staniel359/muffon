<template>
  <div
    class="ui button"
    :class="{ inverted: isDarkMode }"
  >
    <slot></slot>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'BaseButtonContainer',
  computed: {
    ...mapState('layout', [
      'isDarkMode'
    ])
  }
}
</script>

<style lang="sass" scoped></style>
