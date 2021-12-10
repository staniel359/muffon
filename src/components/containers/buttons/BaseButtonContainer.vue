<template>
  <div
    class="ui button main-simple-button"
    ref="button"
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
  },
  emits: [
    'init'
  ],
  mounted () {
    this.$emit(
      'init',
      this.$refs.button
    )
  }
}
</script>

<style lang="sass" scoped></style>
