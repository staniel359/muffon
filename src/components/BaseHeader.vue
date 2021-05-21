<template>
  <Component
    class="ui header main-header"
    :is="tag"
    :class="{ inverted: isDarkMode }"
  >
    {{ text }}
  </Component >
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'BaseHeader',
  props: {
    tag: {
      type: String,
      required: true
    },
    text: {
      type: String,
      required: true
    }
  },
  computed: {
    ...mapState('layout', [
      'isDarkMode'
    ])
  }
}
</script>

<style lang="sass" scoped></style>
