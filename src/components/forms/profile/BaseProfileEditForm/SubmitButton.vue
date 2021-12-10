<template>
  <button
    class="ui green fluid button"
    :class="{ inverted: isDarkMode }"
    type="submit"
  >
    <i class="save icon"></i>
    {{ textFormatted }}
  </button>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'SubmitButton',
  computed: {
    ...mapState('layout', [
      'isDarkMode'
    ]),
    textFormatted () {
      return this.$t(
        'buttons.save'
      )
    }
  }
}
</script>

<style lang="sass" scoped></style>
