<template>
  <div class="option">
    <BaseHeader
      class="option-header"
      tag="h4"
      :text="tracksCountText"
    />

    <BaseNumberInput
      class="tracks-count-input"
      :class="{
        disabled: !isRecommendationsHideLibraryArtists
      }"
      :value="recommendationsTracksCount"
      @blur="handleTracksCountChange"
    />
  </div>
</template>

<script>
import {
  mapState
} from 'vuex'
import BaseHeader from '@/components/BaseHeader.vue'
import BaseNumberInput from '@/components/inputs/BaseNumberInput.vue'
import {
  updateGlobal as updateGlobalStore
} from '@/helpers/actions/store'

export default {
  name: 'TracksCountOption',
  components: {
    BaseHeader,
    BaseNumberInput
  },
  computed: {
    ...mapState(
      'recommendations',
      {
        isRecommendationsHideLibraryArtists:
          'isHideLibraryArtists',
        recommendationsTracksCount: 'tracksCount'
      }
    ),
    tracksCountText () {
      return this.$t(
        'settings.options.app.recommendations.tracksCount'
      )
    }
  },
  methods: {
    handleTracksCountChange (
      value
    ) {
      updateGlobalStore(
        {
          'recommendations.tracksCount': value
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
