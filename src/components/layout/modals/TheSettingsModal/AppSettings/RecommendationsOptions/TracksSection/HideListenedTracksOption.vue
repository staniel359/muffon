<template>
  <div class="main-settings-option-container">
    <div class="main-settings-option">
      <BaseHeader
        class="option-header"
        tag="h4"
        :text="hideListenedTracksText"
      />

      <BaseToggle
        store-key="recommendationTracks.isHideListenedTracks"
        :is-checked="isRecommendationTracksHideListenedTracks"
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
  name: 'HideListenedTracksOption',
  components: {
    BaseHeader,
    BaseToggle
  },
  computed: {
    ...mapState(
      recommendationTracksStore,
      {
        isRecommendationTracksHideListenedTracks:
          'isHideListenedTracks'
      }
    ),
    hideListenedTracksText () {
      return this.$t(
        'settings.options.app.recommendations.hideListenedTracks'
      )
    }
  }
}
</script>

<style lang="sass" scoped></style>
