<template>
  <div class="main-settings-option-container">
    <div class="main-settings-option">
      <BaseSettingsOptionHeader
        :text="optionText"
      />

      <BaseToggle
        store-key="layout.isCloseTabsOnQuit"
        :is-checked="isCloseTabsOnQuit"
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
  name: 'CloseOnQuitOption',
  components: {
    BaseSettingsOptionHeader,
    BaseToggle
  },
  computed: {
    ...mapState(
      layoutStore,
      [
        'isCloseTabsOnQuit'
      ]
    ),
    optionText () {
      return this.$t(
        'settings.options.app.tabs.closeOnQuit'
      )
    }
  }
}
</script>

<style lang="sass" scoped></style>
