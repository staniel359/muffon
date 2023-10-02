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
        :value="recommendationArtistsHideLibraryArtistsTracksCount"
        @change="handleTracksCountChange"
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
      recommendationArtistsStore,
      {
        isRecommendationArtistsHideLibraryArtists:
          'isHideLibraryArtists',
        recommendationArtistsHideLibraryArtistsTracksCount:
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
      return !this.isRecommendationArtistsHideLibraryArtists
    }
  },
  methods: {
    handleTracksCountChange (
      value
    ) {
      updateGlobalStore(
        {
          'recommendationArtists.hideLibraryArtistsTracksCount': value
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
