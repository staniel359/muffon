<template>
  <BaseSegmentContainer>
    <div
      class="recommended-block d-flex"
    >
      <BaseIcon
        class="main-icon"
        icon="recommendation"
      />

      <div class="content flex-full main-right-small-section">
        <BaseHeader
          tag="h5"
          :text="headerText"
        />

        <div
          class="main-bottom-mini-section"
          v-text="basedText"
        />

        <BaseButton
          class="basic circular compact fluid main-bottom-mini-section"
          left-icon="artist"
          :text="artistsText"
          @click="handleArtistsButtonClick"
        />

        <BaseRecommendationArtistArtistsModal
          ref="artistsModal"
          :recommendation-id="recommendationId"
        />
      </div>
    </div>
  </BaseSegmentContainer>
</template>

<script>
import BaseSegmentContainer
  from '@/components/containers/segments/BaseSegmentContainer.vue'
import BaseIcon from '@/components/icons/BaseIcon.vue'
import BaseHeader from '@/components/BaseHeader.vue'
import BaseButton from '@/components/buttons/BaseButton.vue'
import BaseRecommendationArtistArtistsModal
  from '@/components/modals/recommendation/artist/BaseRecommendationArtistArtistsModal.vue'
import {
  number as formatNumber
} from '@/helpers/formatters'

export default {
  name: 'RecommendedSegment',
  components: {
    BaseSegmentContainer,
    BaseIcon,
    BaseHeader,
    BaseButton,
    BaseRecommendationArtistArtistsModal
  },
  props: {
    recommendationData: {
      type: Object,
      required: true
    }
  },
  computed: {
    headerText () {
      return this.$t(
        'recommended.header'
      )
    },
    basedText () {
      return this.$t(
        'recommended.based'
      )
    },
    artistsText () {
      return this.$tc(
        'counters.genitive.artists',
        this.artistsCount,
        {
          count: this.artistsCountFormatted
        }
      )
    },
    artistsCountFormatted () {
      return formatNumber(
        this.artistsCount
      )
    },
    artistsCount () {
      return this.recommendationData.artists_count
    },
    recommendationId () {
      return this.recommendationData.id.toString()
    }
  },
  methods: {
    handleArtistsButtonClick () {
      this.showArtistsModal()
    },
    showArtistsModal () {
      this.$refs
        .artistsModal
        .show()
    }
  }
}
</script>

<style lang="sass" scoped>
.recommended-block
  & > .icon
    font-size: 1.2rem
</style>
