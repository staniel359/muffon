<template>
  <div class="main-settings-option">
    <BaseHeader
      class="option-header"
      tag="h4"
      :text="tracksCountTextFormatted"
    />

    <BaseNumberInput
      class="tracks-count-input"
      :class="{
        disabled: isNumberInputDisabled
      }"
      :value="recommendationsTracksCount"
      @change="handleTracksCountChange"
    />
  </div>
</template>

<script>
import {
  mapState
} from 'pinia'
import recommendationsStore from '@/stores/recommendations'
import BaseHeader from '@/components/BaseHeader.vue'
import BaseNumberInput from '@/components/inputs/BaseNumberInput.vue'
import {
  update as updateGlobalStore
} from '@/helpers/actions/store/global'

export default {
  name: 'TracksCountOption',
  components: {
    BaseHeader,
    BaseNumberInput
  },
  computed: {
    ...mapState(
      recommendationsStore,
      {
        isRecommendationsHideLibraryArtists:
          'isHideLibraryArtists',
        recommendationsTracksCount: 'tracksCount'
      }
    ),
    tracksCountTextFormatted () {
      return `${this.tracksCountText} >=`
    },
    tracksCountText () {
      return this.$t(
        'settings.options.app.recommendations.tracksCount'
      )
    },
    isNumberInputDisabled () {
      return !this.isRecommendationsHideLibraryArtists
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
