<template>
  <button
    ref="button"
    type="submit"
    class="ui primary button main-submit-button"
    :class="{ inverted: isDarkMode }"
  >
    <i class="check icon"></i>

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
        `actions.${this.actionKey}`
      )
    }
  },
  methods: {
    click () {
      this.$refs.button.click()
    }
  }
}
</script>

<style lang="sass" scoped></style>
