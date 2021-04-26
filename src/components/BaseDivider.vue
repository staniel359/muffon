<template>
  <div
    class="ui divider main-divider"
    :class="{
      inverted: isInverted || isDarkMode,
      horizontal: isHorizontal
    }"
  >
    <template v-if="text">
      {{ text }}
    </template>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'BaseDivider',
  props: {
    isInverted: Boolean,
    isHorizontal: Boolean,
    text: String
  },
  computed: {
    ...mapState('layout', [
      'isDarkMode'
    ])
  }
}
</script>

<style lang="sass" scoped></style>
