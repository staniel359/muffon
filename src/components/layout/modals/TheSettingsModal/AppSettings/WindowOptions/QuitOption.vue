<template>
  <div class="main-settings-option-container">
    <div class="main-settings-option">
      <BaseSettingsOptionHeader
        :text="optionText"
      />

      <BaseToggle
        store-key="window.isQuitOnClose"
        :class="{
          disabled: isDisabled
        }"
        :is-checked="isChecked"
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
  name: 'QuitOption',
  components: {
    BaseSettingsOptionHeader,
    BaseToggle
  },
  computed: {
    ...mapState(
      windowStore,
      [
        'isQuitOnClose',
        'isWithTrayIcon'
      ]
    ),
    optionText () {
      return this.$t(
        'settings.options.app.window.quit'
      )
    },
    isDisabled () {
      return !this.isWithTrayIcon
    },
    isChecked () {
      return (
        this.isQuitOnClose ||
          !this.isWithTrayIcon
      )
    }
  }
}
</script>

<style lang="sass" scoped></style>
