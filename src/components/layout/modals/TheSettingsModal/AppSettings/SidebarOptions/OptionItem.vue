<template>
  <div class="main-settings-option-container">
    <div class="main-settings-option">
      <BaseSettingsOptionHeader
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
import BaseSettingsOptionHeader
  from '@/components/headers/settings/BaseSettingsOptionHeader.vue'
import BaseToggle from '@/components/toggles/BaseToggle.vue'

export default {
  name: 'OptionItem',
  components: {
    BaseSettingsOptionHeader,
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
      return `sidebar.${this.actionKey}`
    }
  }
}
</script>

<style lang="sass" scoped></style>
