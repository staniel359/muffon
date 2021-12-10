<template>
  <button
    class="ui primary fluid button"
    :class="{ inverted: isDarkMode }"
    type="submit"
  >
    {{ placeholderFormatted }}
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
    placeholderFormatted () {
      return this.$t(
        'shared.profile.form.submit.login'
      )
    }
  }
}
</script>

<style lang="sass" scoped></style>
