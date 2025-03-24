<template>
  <div class="main-settings-option-container">
    <div class="main-settings-option">
      <BaseSettingsOptionHeader
        :text="optionText"
      />

      <BaseToggle
        store-key="layout.isWithInfiniteScroll"
        :is-checked="isWithInfiniteScroll"
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
  name: 'InfiniteScrollOption',
  components: {
    BaseSettingsOptionHeader,
    BaseToggle
  },
  computed: {
    ...mapState(
      layoutStore,
      [
        'isWithInfiniteScroll'
      ]
    ),
    optionText () {
      return this.$t(
        'settings.options.app.interface.infiniteScroll'
      )
    }
  }
}
</script>

<style lang="sass" scoped></style>
