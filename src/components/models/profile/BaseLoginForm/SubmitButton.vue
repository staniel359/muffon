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
import { localize } from '#/actions/plugins/i18n'

export default {
  name: 'SubmitButton',
  computed: {
    ...mapState('layout', [
      'isDarkMode'
    ]),
    placeholderFormatted () {
      return localize(
        'shared.profile.form.submit.login'
      )
    }
  }
}
</script>

<style lang="sass" scoped></style>
