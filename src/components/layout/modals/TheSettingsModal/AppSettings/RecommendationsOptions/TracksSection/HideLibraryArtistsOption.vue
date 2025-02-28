<template>
  <div class="main-settings-option-container">
    <div class="main-settings-option">
      <BaseSettingsOptionHeader
        :text="optionText"
      />

      <BaseToggle
        store-key="recommendationTracks.isHideLibraryArtists"
        :is-checked="isRecommendationTracksHideLibraryArtists"
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
import BaseToggle from '@/components/toggles/BaseToggle.vue'

export default {
  name: 'HideLibraryArtistsOption',
  components: {
    BaseSettingsOptionHeader,
    BaseToggle
  },
  computed: {
    ...mapState(
      recommendationTracksStore,
      {
        isRecommendationTracksHideLibraryArtists:
          'isHideLibraryArtists'
      }
    ),
    optionText () {
      return this.$t(
        'settings.options.app.recommendations.hideLibraryArtists'
      )
    }
  }
}
</script>

<style lang="sass" scoped></style>
