<template>
  <BaseSegmentContainer>
    <div
      class="recommended-block"
    >
      <BaseIcon
        icon="recommendation"
      />

      <div class="content">
        <BaseHeader
          tag="h5"
          :text="headerText"
        />

        <div
          class="based-text"
          v-text="basedText"
        />

        <BaseButton
          class="basic circular compact fluid artists-button"
          icon="artist"
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
  @extend .d-flex
  & > .icon
    @extend .no-margin
    font-size: 1.2em
  & > .content
    @extend .flex-full
    margin-left: 0.5em !important
    .based-text
      margin-top: 0.25em
    .artists-button
      margin-top: 0.5em !important
</style>
