<template>
  <button
    class="ui primary button"
    :class="{ inverted: isDarkMode }"
    type="submit"
  >
    {{ textFormatted }}
  </button>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'BasePostSubmitButton',
  computed: {
    ...mapState('layout', [
      'isDarkMode'
    ]),
    textFormatted () {
      return this.$t(
        'buttons.post'
      )
    }
  }
}
</script>

<style lang="sass" scoped></style>
