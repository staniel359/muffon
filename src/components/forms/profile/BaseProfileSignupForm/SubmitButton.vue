<template>
  <button
    class="ui primary fluid button"
    :class="{ inverted: isDarkMode }"
    type="submit"
  >
    {{ signupText }}
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
    signupText () {
      return this.$t(
        'shared.profile.form.submit.signup'
      )
    }
  }
}
</script>

<style lang="sass" scoped></style>
