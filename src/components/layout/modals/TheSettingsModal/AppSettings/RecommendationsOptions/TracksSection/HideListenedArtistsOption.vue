<template>
  <div class="main-settings-option-container">
    <div class="main-settings-option">
      <BaseHeader
        class="option-header"
        tag="h4"
        :text="hideListenedArtistsText"
      />

      <BaseToggle
        store-key="recommendationTracks.isHideListenedArtists"
        :is-checked="isRecommendationTracksHideListenedArtists"
      />
    </div>
  </div>
</template>

<script>
import {
  mapState
} from 'pinia'
import recommendationTracksStore from '@/stores/recommendationTracks'
import BaseHeader from '@/components/BaseHeader.vue'
import BaseToggle from '@/components/toggles/BaseToggle.vue'

export default {
  name: 'HideListenedArtistsOption',
  components: {
    BaseHeader,
    BaseToggle
  },
  computed: {
    ...mapState(
      recommendationTracksStore,
      {
        isRecommendationTracksHideListenedArtists:
          'isHideListenedArtists'
      }
    ),
    hideListenedArtistsText () {
      return this.$t(
        'settings.options.app.recommendations.hideListenedArtists'
      )
    }
  }
}
</script>

<style lang="sass" scoped></style>
