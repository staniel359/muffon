<template>
  <div class="main-settings-option-container">
    <div class="main-settings-option">
      <BaseHeader
        class="option-header"
        tag="h4"
        :text="infiniteScrollText"
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
import BaseHeader from '@/components/BaseHeader.vue'
import BaseToggle from '@/components/toggles/BaseToggle.vue'

export default {
  name: 'InfiniteScrollOption',
  components: {
    BaseHeader,
    BaseToggle
  },
  computed: {
    ...mapState(
      layoutStore,
      [
        'isWithInfiniteScroll'
      ]
    ),
    infiniteScrollText () {
      return this.$t(
        'settings.options.app.interface.infiniteScroll'
      )
    }
  }
}
</script>

<style lang="sass" scoped></style>
