<template>
  <BaseSegmentContainer>
    <div
      class="recommended-block"
    >
      <BaseIcon
        icon="volume up"
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
          class="basic compact fluid"
          icon="microphone alternate"
          :text="artistsText"
          @click="handleArtistsButtonClick"
        />

        <BaseRecommendationProfileArtistsModal
          ref="artistsModal"
          :recommendation-id="recommendationId"
        />
      </div>
    </div>
  </BaseSegmentContainer>
</template>

<script>
import BaseSegmentContainer
  from '*/components/containers/segments/BaseSegmentContainer.vue'
import BaseIcon from '*/components/BaseIcon.vue'
import BaseHeader from '*/components/BaseHeader.vue'
import BaseButton from '*/components/buttons/BaseButton.vue'
import BaseRecommendationProfileArtistsModal
  from '*/components/modals/recommendation/BaseRecommendationProfileArtistsModal.vue'
import {
  number as formatNumber
} from '*/helpers/formatters'

export default {
  name: 'RecommendedSegment',
  components: {
    BaseSegmentContainer,
    BaseIcon,
    BaseHeader,
    BaseButton,
    BaseRecommendationProfileArtistsModal
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
        this.profileArtistsCount,
        {
          count: this.profileArtistsCountFormatted
        }
      )
    },
    profileArtistsCountFormatted () {
      return formatNumber(
        this.profileArtistsCount
      )
    },
    profileArtistsCount () {
      return this.recommendationData.profile_artists_count
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
    & > .based-text
      margin: 0.25em 0
</style>
