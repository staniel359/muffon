<template>
  <code
    class="main-code"
    :class="{ inverted: isDarkMode }"
  >
    {{ text }}
  </code>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'BaseCode',
  props: {
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
