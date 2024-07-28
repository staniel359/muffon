<template>
  <div class="main-settings-option-container">
    <div class="main-settings-option">
      <BaseHeader
        class="option-header"
        tag="h4"
        :text="showTrayIconText"
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
import BaseHeader from '@/components/BaseHeader.vue'
import BaseToggle from '@/components/toggles/BaseToggle.vue'

export default {
  name: 'TrayOption',
  components: {
    BaseHeader,
    BaseToggle
  },
  computed: {
    ...mapState(
      windowStore,
      [
        'isWithTrayIcon'
      ]
    ),
    showTrayIconText () {
      return this.$t(
        'settings.options.app.window.showTrayIcon'
      )
    }
  }
}
</script>

<style lang="sass" scoped></style>
