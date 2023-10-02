<template>
  <div class="main-settings-option-container">
    <div class="main-settings-option">
      <BaseHeader
        class="option-header"
        tag="h4"
        :text="tracksCountTextFormatted"
      />

      <BaseNumberInput
        class="tracks-count-input"
        :class="{
          disabled: isNumberInputDisabled
        }"
        :value="recommendationTracksHideLibraryArtistsTracksCount"
        @change="handleTracksCountChange"
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
import BaseNumberInput from '@/components/inputs/BaseNumberInput.vue'
import {
  update as updateGlobalStore
} from '@/helpers/actions/store/global'

export default {
  name: 'HideLibraryArtistsTracksCountOption',
  components: {
    BaseHeader,
    BaseNumberInput
  },
  computed: {
    ...mapState(
      recommendationTracksStore,
      {
        isRecommendationTracksHideLibraryArtists:
          'isHideLibraryArtists',
        recommendationTracksHideLibraryArtistsTracksCount:
          'hideLibraryArtistsTracksCount'
      }
    ),
    tracksCountTextFormatted () {
      return `${this.tracksCountText} >=`
    },
    tracksCountText () {
      return this.$t(
        'settings.options.app.recommendations.tracksCount'
      )
    },
    isNumberInputDisabled () {
      return !this.isRecommendationTracksHideLibraryArtists
    }
  },
  methods: {
    handleTracksCountChange (
      value
    ) {
      updateGlobalStore(
        {
          'recommendationTracks.hideLibraryArtistsTracksCount': value
        }
      )
    }
  }
}
</script>

<style lang="sass" scoped>
.tracks-count-input
  max-width: 80px
</style>
