<template>
  <div class="main-settings-option-container">
    <div class="main-settings-option">
      <BaseHeader
        class="option-header"
        tag="h4"
        :text="newTabSwitchText"
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
import BaseHeader from '@/components/BaseHeader.vue'
import BaseToggle from '@/components/toggles/BaseToggle.vue'

export default {
  name: 'SwitchToNewTabOption',
  components: {
    BaseHeader,
    BaseToggle
  },
  computed: {
    ...mapState(
      layoutStore,
      [
        'isSwitchToNewTab'
      ]
    ),
    newTabSwitchText () {
      return this.$t(
        'settings.options.app.tabs.newTabSwitch'
      )
    }
  }
}
</script>

<style lang="sass" scoped></style>
