<template>
  <div class="main-settings-option-container">
    <div class="main-settings-option">
      <BaseHeader
        class="option-header"
        tag="h4"
        :text="optionText"
      />

      <BaseToggle
        :store-key="storeKey"
        :is-checked="isChecked"
      />
    </div>
  </div>
</template>

<script>
import BaseHeader from '@/components/BaseHeader.vue'
import BaseToggle from '@/components/toggles/BaseToggle.vue'

export default {
  name: 'OptionItem',
  components: {
    BaseHeader,
    BaseToggle
  },
  props: {
    actionKey: {
      type: String,
      required: true
    },
    textKey: {
      type: String,
      required: true
    },
    isChecked: Boolean
  },
  computed: {
    optionText () {
      return this.$t(
        `navigation.${this.textKey}`
      )
    },
    storeKey () {
      return `homePage.${this.actionKey}`
    }
  }
}
</script>

<style lang="sass" scoped></style>
