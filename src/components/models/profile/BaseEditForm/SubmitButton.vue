<template>
  <button
    class="ui green fluid button"
    :class="{ inverted: isDarkMode }"
    type="submit"
  >
    {{ textFormatted }}
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
    textFormatted () {
      return localize(
        'shared.profile.form.submit.save'
      )
    }
  }
}
</script>

<style lang="sass" scoped></style>
