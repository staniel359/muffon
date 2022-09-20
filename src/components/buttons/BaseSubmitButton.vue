<template>
  <button
    ref="button"
    type="submit"
    class="ui primary circular button main-simple-button"
  >
    <BaseIcon
      v-if="isWithIcon"
      icon="check"
    />

    {{ actionText }}
  </button>
</template>

<script>
import BaseIcon from '@/components/BaseIcon.vue'

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
