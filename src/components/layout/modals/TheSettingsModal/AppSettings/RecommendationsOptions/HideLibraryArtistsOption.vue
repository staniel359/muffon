<template>
  <div class="option">
    <BaseHeader
      class="option-header"
      tag="h4"
      :text="hideLibraryArtistsText"
    />

    <BaseToggle
      store-key="recommendations.isHideLibraryArtists"
      :is-checked="isRecommendationsHideLibraryArtists"
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
  name: 'HideLibraryArtistsOption',
  components: {
    BaseHeader,
    BaseToggle
  },
  computed: {
    ...mapState(
      recommendationsStore,
      {
        isRecommendationsHideLibraryArtists:
          'isHideLibraryArtists'
      }
    ),
    hideLibraryArtistsText () {
      return this.$t(
        'settings.options.app.recommendations.hideLibraryArtists'
      )
    }
  }
}
</script>

<style lang="sass" scoped></style>
