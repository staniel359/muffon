<template>
  <div class="main-settings-option-container">
    <div class="main-settings-option">
      <BaseSettingsOptionHeader
        :text="optionText"
      />

      <BaseToggle
        store-key="recommendationArtists.isHideLibraryArtists"
        :is-checked="isRecommendationArtistsHideLibraryArtists"
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
import BaseToggle from '@/components/toggles/BaseToggle.vue'

export default {
  name: 'HideLibraryArtistsOption',
  components: {
    BaseSettingsOptionHeader,
    BaseToggle
  },
  computed: {
    ...mapState(
      recommendationArtistsStore,
      {
        isRecommendationArtistsHideLibraryArtists:
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
