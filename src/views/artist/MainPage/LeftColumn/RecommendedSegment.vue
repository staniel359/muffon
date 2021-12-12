<template>
  <BaseSegmentContainer
    class="main-segment-container"
  >
    <div class="recommended-block">
      <i class="volume up icon"></i>

      <div class="content">
        <BaseHeader
          tag="h5"
          :text="headerText"
        />

        <div class="based-text">
          {{ basedText }}
        </div>

        <BaseButton
          class="basic compact fluid"
          icon="microphone alternate"
          :text="artistsTextFormatted"
          @click="handleArtistsButtonClick"
        />

        <BaseRecommendationProfileArtistsModal
          ref="artistsModal"
          :recommendationId="recommendationId"
        />
      </div>
    </div>
  </BaseSegmentContainer>
</template>

<script>
import BaseSegmentContainer
  from '@/containers/segments/BaseSegmentContainer.vue'
import BaseHeader from '@/BaseHeader.vue'
import BaseButton from '@/buttons/BaseButton.vue'
import BaseRecommendationProfileArtistsModal
  from '@/modals/recommendation/BaseRecommendationProfileArtistsModal.vue'

export default {
  name: 'RecommendedSegment',
  components: {
    BaseSegmentContainer,
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
        'pages.artist.recommended.header'
      )
    },
    basedText () {
      return this.$t(
        'pages.artist.recommended.based'
      )
    },
    artistsTextFormatted () {
      return this.$t(
        'pages.artist.recommended.artists',
        { count: this.profileArtistsCount }
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
      this.$refs.artistsModal.show()
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
    margin-left: 0.5em !important
    & > .based-text
      margin-bottom: 0.25em
</style>
