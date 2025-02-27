<template>
  <div class="main-settings-option-container">
    <div class="main-settings-option">
      <BaseSettingsOptionHeader
        :text="saveText"
      />

      <BaseToggle
        store-key="history.isSaveBrowser"
        :is-checked="isSaveBrowserHistory"
      />
    </div>
  </div>
</template>

<script>
import {
  mapState
} from 'pinia'
import historyStore from '@/stores/history'
import BaseSettingsOptionHeader
  from '@/components/headers/settings/BaseSettingsOptionHeader.vue'
import BaseToggle from '@/components/toggles/BaseToggle.vue'

export default {
  name: 'SaveOption',
  components: {
    BaseSettingsOptionHeader,
    BaseToggle
  },
  computed: {
    ...mapState(
      historyStore,
      {
        isSaveBrowserHistory: 'isSaveBrowser'
      }
    ),
    saveText () {
      return this.$t(
        'settings.options.app.history.browser.save'
      )
    }
  }
}
</script>

<style lang="sass" scoped></style>
