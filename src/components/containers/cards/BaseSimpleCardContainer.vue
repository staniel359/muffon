<template>
  <div
    class="ui card main-simple-card"
    :class="{
      inverted: isDarkMode
    }"
  >
    <div />

    <slot />
  </div>
</template>

<script>
import {
  mapState
} from 'vuex'

export default {
  name: 'BaseSimpleCardContainer',
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

<style lang="sass" scoped></style>
