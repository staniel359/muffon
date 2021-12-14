<template>
  <button
    class="ui primary button"
    :class="{ inverted: isDarkMode }"
    type="submit"
  >
    {{ sendText }}
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
    sendText () {
      return this.$t(
        'buttons.send'
      )
    }
  }
}
</script>

<style lang="sass" scoped></style>
