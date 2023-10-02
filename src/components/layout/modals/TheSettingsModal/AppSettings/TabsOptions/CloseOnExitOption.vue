<template>
  <div class="main-settings-option-container">
    <div class="main-settings-option">
      <BaseHeader
        class="option-header"
        tag="h4"
        :text="closeTabsText"
      />

      <BaseToggle
        store-key="layout.isCloseTabsOnExit"
        :is-checked="isCloseTabsOnExit"
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
  name: 'CloseOnExitOption',
  components: {
    BaseHeader,
    BaseToggle
  },
  computed: {
    ...mapState(
      layoutStore,
      [
        'isCloseTabsOnExit'
      ]
    ),
    closeTabsText () {
      return this.$t(
        'settings.options.app.tabs.closeOnExit'
      )
    }
  }
}
</script>

<style lang="sass" scoped></style>
