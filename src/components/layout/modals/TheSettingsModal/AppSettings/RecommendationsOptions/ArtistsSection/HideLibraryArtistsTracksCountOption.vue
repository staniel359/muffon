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
      recommendationArtistsStore,
      {
        isRecommendationArtistsHideLibraryArtists:
          'isHideLibraryArtists',
        recommendationArtistsHideLibraryArtistsTracksCount:
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
