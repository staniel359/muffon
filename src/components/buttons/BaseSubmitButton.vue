<template>
  <button
    ref="button"
    type="submit"
    :class="[
      'ui primary button',
      'main-submit-button',
      {
        inverted: isDarkMode
      }
    ]"
  >
    <BaseIcon
      icon="check"
    />

    {{ actionText }}
  </button>
</template>

<script>
import {
  mapState
} from 'vuex'
import BaseIcon from '*/components/BaseIcon.vue'

export default {
  name: 'BaseSubmitButton',
  components: {
    BaseIcon
  },
  props: {
    actionKey: {
      type: String,
      required: true
    }
  },
  computed: {
    ...mapState(
      'layout',
      [
        'isDarkMode'
      ]
    ),
    actionText () {
      return this.$t(
        `actions.${this.actionKey}`
      )
    }
  },
  methods: {
    click () {
      this.$refs
        .button
        .click()
    }
  }
}
</script>

<style lang="sass" scoped></style>
