<template>
  <div class="main-settings-option-container">
    <div class="main-settings-option">
      <BaseHeader
        class="option-header"
        tag="h4"
        :text="cachePagesText"
      />

      <BaseToggle
        store-key="layout.isCachePages"
        :is-checked="isCachePages"
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
  name: 'CachePagesOption',
  components: {
    BaseHeader,
    BaseToggle
  },
  computed: {
    ...mapState(
      layoutStore,
      [
        'isCachePages'
      ]
    ),
    cachePagesText () {
      return this.$t(
        'settings.options.app.interface.cachePages'
      )
    }
  }
}
</script>

<style lang="sass" scoped></style>
