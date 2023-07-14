<template>
  <div class="main-settings-option">
    <BaseHeader
      class="option-header"
      tag="h4"
      :text="hideListenedArtistsText"
    />

    <BaseToggle
      store-key="recommendations.isHideListenedArtists"
      :is-checked="isRecommendationsHideListenedArtists"
    />
  </div>
</template>

<script>
import {
  mapState
} from 'pinia'
import recommendationsStore from '@/stores/recommendations'
import BaseHeader from '@/components/BaseHeader.vue'
import BaseToggle from '@/components/toggles/BaseToggle.vue'

export default {
  name: 'HideListenedArtistsOption',
  components: {
    BaseHeader,
    BaseToggle
  },
  computed: {
    ...mapState(
      recommendationsStore,
      {
        isRecommendationsHideListenedArtists:
          'isHideListenedArtists'
      }
    ),
    hideListenedArtistsText () {
      return this.$t(
        'settings.options.app.recommendations.hideListenedArtists'
      )
    }
  }
}
</script>

<style lang="sass" scoped></style>
