<template>
  <div class="main-settings-option-container">
    <div class="main-settings-option">
      <BaseSettingsOptionHeader
        :text="optionText"
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
import BaseSettingsOptionHeader
  from '@/components/headers/settings/BaseSettingsOptionHeader.vue'
import BaseToggle from '@/components/toggles/BaseToggle.vue'

export default {
  name: 'HideListenedTracksOption',
  components: {
    BaseSettingsOptionHeader,
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
    optionText () {
      return this.$t(
        'settings.options.app.recommendations.hideListenedTracks'
      )
    }
  }
}
</script>

<style lang="sass" scoped></style>
