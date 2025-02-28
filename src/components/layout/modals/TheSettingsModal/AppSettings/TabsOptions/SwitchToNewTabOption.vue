<template>
  <div class="main-settings-option-container">
    <div class="main-settings-option">
      <BaseSettingsOptionHeader
        :text="optionText"
      />

      <BaseToggle
        store-key="layout.isSwitchToNewTab"
        :is-checked="isSwitchToNewTab"
      />
    </div>
  </div>
</template>

<script>
import {
  mapState
} from 'pinia'
import layoutStore from '@/stores/layout'
import BaseSettingsOptionHeader
  from '@/components/headers/settings/BaseSettingsOptionHeader.vue'
import BaseToggle from '@/components/toggles/BaseToggle.vue'

export default {
  name: 'SwitchToNewTabOption',
  components: {
    BaseSettingsOptionHeader,
    BaseToggle
  },
  computed: {
    ...mapState(
      layoutStore,
      [
        'isSwitchToNewTab'
      ]
    ),
    optionText () {
      return this.$t(
        'settings.options.app.tabs.newTabSwitch'
      )
    }
  }
}
</script>

<style lang="sass" scoped></style>
