<template>
  <div
    ref="button"
    class="ui button main-simple-button"
    :class="{
      inverted: isDarkMode
    }"
  >
    <slot />
  </div>
</template>

<script>
import {
  mapState
} from 'vuex'

export default {
  name: 'BaseButtonContainer',
  emits: [
    'init'
  ],
  computed: {
    ...mapState(
      'layout',
      [
        'isDarkMode'
      ]
    )
  },
  mounted () {
    this.$emit(
      'init',
      this.$refs.button
    )
  }
}
</script>

<style lang="sass" scoped></style>
