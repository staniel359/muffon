<template>
  <div class="main-settings-option-container">
    <div class="main-settings-option">
      <BaseSettingsOptionHeader
        :text="optionText"
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
import BaseSettingsOptionHeader
  from '@/components/headers/settings/BaseSettingsOptionHeader.vue'
import BaseToggle from '@/components/toggles/BaseToggle.vue'

export default {
  name: 'HideLibraryTracksOption',
  components: {
    BaseSettingsOptionHeader,
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
    optionText () {
      return this.$t(
        'settings.options.app.recommendations.hideLibraryTracks'
      )
    }
  }
}
</script>

<style lang="sass" scoped></style>
