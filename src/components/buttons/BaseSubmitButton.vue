<template>
  <button
    ref="button"
    type="submit"
    class="ui circular button main-button"
    :class="[
      buttonColorClass,
      {
        basic: isBasic,
        primary: !isBasic
      }
    ]"
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
import buttonMixin from '@/mixins/buttonMixin'

export default {
  name: 'BaseSubmitButton',
  components: {
    BaseIcon
  },
  mixins: [
    buttonMixin
  ],
  props: {
    actionKey: {
      type: String,
      required: true
    },
    isWithIcon: {
      type: Boolean,
      default: true
    },
    isInvertable: Boolean
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
