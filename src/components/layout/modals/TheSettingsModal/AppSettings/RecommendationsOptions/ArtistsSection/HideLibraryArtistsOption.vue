<template>
  <div class="main-settings-option-container">
    <div class="main-settings-option">
      <BaseHeader
        class="option-header"
        tag="h4"
        :text="hideLibraryArtistsText"
      />

      <BaseToggle
        store-key="recommendationArtists.isHideLibraryArtists"
        :is-checked="isRecommendationArtistsHideLibraryArtists"
      />
    </div>
  </div>
</template>

<script>
import {
  mapState
} from 'pinia'
import recommendationArtistsStore from '@/stores/recommendationArtists'
import BaseHeader from '@/components/BaseHeader.vue'
import BaseToggle from '@/components/toggles/BaseToggle.vue'

export default {
  name: 'HideLibraryArtistsOption',
  components: {
    BaseHeader,
    BaseToggle
  },
  computed: {
    ...mapState(
      recommendationArtistsStore,
      {
        isRecommendationArtistsHideLibraryArtists:
          'isHideLibraryArtists'
      }
    ),
    hideLibraryArtistsText () {
      return this.$t(
        'settings.options.app.recommendations.hideLibraryArtists'
      )
    }
  }
}
</script>

<style lang="sass" scoped></style>
