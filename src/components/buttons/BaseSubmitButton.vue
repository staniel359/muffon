<template>
  <button
    ref="button"
    type="submit"
    class="ui primary circular button main-button"
  >
    <BaseIcon
      v-if="isWithIcon"
      class="main-left-small-icon"
      icon="submit"
    />

    <span
      v-text="actionText"
    />
  </button>
</template>

<script>
import BaseIcon from '@/components/icons/BaseIcon.vue'

export default {
  name: 'BaseSubmitButton',
  components: {
    BaseIcon
  },
  props: {
    actionKey: {
      type: String,
      required: true
    },
    isWithIcon: {
      type: Boolean,
      default: true
    }
  },
  computed: {
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
