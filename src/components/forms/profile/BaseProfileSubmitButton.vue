<template>
  <button
    class="ui primary button"
    :class="{ inverted: isDarkMode }"
    type="submit"
  >
    {{ actionText }}
  </button>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'BaseProfileSubmitButton',
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
        `actions.${this.actionKey}`
      )
    }
  }
}
</script>

<style lang="sass" scoped></style>
