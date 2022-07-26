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
} from 'vuex'
import BaseHeader from '*/components/BaseHeader.vue'
import BaseToggle from '*/components/BaseToggle.vue'

export default {
  name: 'HideLibraryArtistsOption',
  components: {
    BaseHeader,
    BaseToggle
  },
  computed: {
    ...mapState(
      'recommendations',
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
