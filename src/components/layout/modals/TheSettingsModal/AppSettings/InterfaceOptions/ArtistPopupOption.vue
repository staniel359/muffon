<template>
  <div class="main-settings-option-container">
    <div class="main-settings-option">
      <BaseHeader
        class="option-header"
        tag="h4"
        :text="artistPopupText"
      />

      <BaseToggle
        store-key="layout.isWithArtistPopup"
        :is-checked="isWithArtistPopup"
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
  name: 'ArtistPopupOption',
  components: {
    BaseHeader,
    BaseToggle
  },
  computed: {
    ...mapState(
      layoutStore,
      [
        'isWithArtistPopup'
      ]
    ),
    artistPopupText () {
      return this.$t(
        'settings.options.app.interface.artistPopup'
      )
    }
  }
}
</script>

<style lang="sass" scoped></style>
