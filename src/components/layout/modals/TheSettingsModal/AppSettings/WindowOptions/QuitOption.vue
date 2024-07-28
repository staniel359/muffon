<template>
  <div class="main-settings-option-container">
    <div class="main-settings-option">
      <BaseHeader
        class="option-header"
        tag="h4"
        :text="quitText"
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
import BaseHeader from '@/components/BaseHeader.vue'
import BaseToggle from '@/components/toggles/BaseToggle.vue'

export default {
  name: 'QuitOption',
  components: {
    BaseHeader,
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
    quitText () {
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
