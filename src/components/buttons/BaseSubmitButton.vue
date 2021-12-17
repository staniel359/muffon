<template>
  <button
    type="submit"
    class="ui primary button main-submit-button"
    :class="{ inverted: isDarkMode }"
  >
    {{ actionText }}
  </button>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'BaseSubmitButton',
  props: {
    actionKey: {
      type: String,
      required: true
    }
  },
  computed: {
    ...mapState('layout', [
      'isDarkMode'
    ]),
    actionText () {
      return this.$t(
        `buttons.${this.actionKey}`
      )
    }
  }
}
</script>

<style lang="sass" scoped></style>
