<template>
  <div class="main-settings-option-container">
    <div class="main-settings-option">
      <BaseSettingsOptionHeader
        :text="optionTextFormatted"
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
import BaseSettingsOptionHeader
  from '@/components/headers/settings/BaseSettingsOptionHeader.vue'
import BaseNumberInput from '@/components/inputs/BaseNumberInput.vue'
import {
  update as updateGlobalStore
} from '@/helpers/actions/store/global'

export default {
  name: 'HideLibraryArtistsTracksCountOption',
  components: {
    BaseSettingsOptionHeader,
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
    optionTextFormatted () {
      return `${this.optionText} >=`
    },
    optionText () {
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
