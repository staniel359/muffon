<template>
  <div class="main-settings-option-container">
    <div class="main-settings-option">
      <BaseHeader
        class="option-header"
        tag="h4"
        :text="hideLibraryTracksText"
      />

      <BaseToggle
        store-key="recommendationTracks.isHideLibraryTracks"
        :is-checked="isRecommendationTracksHideLibraryTracks"
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
  name: 'HideLibraryTracksOption',
  components: {
    BaseHeader,
    BaseToggle
  },
  computed: {
    ...mapState(
      recommendationTracksStore,
      {
        isRecommendationTracksHideLibraryTracks:
          'isHideLibraryTracks'
      }
    ),
    hideLibraryTracksText () {
      return this.$t(
        'settings.options.app.recommendations.hideLibraryTracks'
      )
    }
  }
}
</script>

<style lang="sass" scoped></style>
