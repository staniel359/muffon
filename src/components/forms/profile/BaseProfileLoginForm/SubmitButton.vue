<template>
  <button
    class="ui primary fluid button"
    :class="{ inverted: isDarkMode }"
    type="submit"
  >
    {{ loginText }}
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
    loginText () {
      return this.$t(
        'shared.profile.form.submit.login'
      )
    }
  }
}
</script>

<style lang="sass" scoped></style>
