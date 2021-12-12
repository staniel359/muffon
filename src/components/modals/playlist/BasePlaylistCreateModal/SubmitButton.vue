<template>
  <button
    class="ui primary fluid button"
    :class="{ inverted: isDarkMode }"
    type="submit"
  >
    {{ createText }}
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
    createText () {
      return this.$t(
        'buttons.create'
      )
    }
  }
}
</script>

<style lang="sass" scoped></style>
