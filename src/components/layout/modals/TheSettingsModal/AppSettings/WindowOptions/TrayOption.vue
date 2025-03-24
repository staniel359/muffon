<template>
  <div class="main-settings-option-container">
    <div class="main-settings-option">
      <BaseSettingsOptionHeader
        :text="optionText"
      />

      <BaseToggle
        store-key="window.isWithTrayIcon"
        :is-checked="isWithTrayIcon"
      />
    </div>
  </div>
</template>

<script>
import {
  mapState
} from 'pinia'
import windowStore from '@/stores/window'
import BaseSettingsOptionHeader
  from '@/components/headers/settings/BaseSettingsOptionHeader.vue'
import BaseToggle from '@/components/toggles/BaseToggle.vue'

export default {
  name: 'TrayOption',
  components: {
    BaseSettingsOptionHeader,
    BaseToggle
  },
  computed: {
    ...mapState(
      windowStore,
      [
        'isWithTrayIcon'
      ]
    ),
    optionText () {
      return this.$t(
        'settings.options.app.window.showTrayIcon'
      )
    }
  }
}
</script>

<style lang="sass" scoped></style>
