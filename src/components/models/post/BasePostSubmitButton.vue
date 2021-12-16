<template>
  <button
    class="ui primary button"
    :class="{ inverted: isDarkMode }"
    type="submit"
  >
    {{ postText }}
  </button>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'BasePostSubmitButton',
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
    postText () {
      return this.$t(
        `buttons.${this.actionKey}`
      )
    }
  }
}
</script>

<style lang="sass" scoped></style>
