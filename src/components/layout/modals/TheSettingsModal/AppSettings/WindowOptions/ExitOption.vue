<template>
  <div class="main-settings-option-container">
    <div class="main-settings-option">
      <BaseHeader
        class="option-header"
        tag="h4"
        :text="exitText"
      />

      <BaseToggle
        store-key="layout.isExitOnClose"
        :is-checked="isExitOnClose"
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
  name: 'ExitOption',
  components: {
    BaseHeader,
    BaseToggle
  },
  computed: {
    ...mapState(
      layoutStore,
      [
        'isExitOnClose'
      ]
    ),
    exitText () {
      return this.$t(
        'settings.options.app.window.exit'
      )
    }
  }
}
</script>

<style lang="sass" scoped></style>
