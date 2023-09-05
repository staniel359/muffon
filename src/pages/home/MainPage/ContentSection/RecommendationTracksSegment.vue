<template>
  <BaseHeaderSegmentsContainer
    :scope="headerScope"
    :header-link="headerLink"
  >
    <BaseRecommendationsPaginatedSegmentContainer
      ref="segment"
      :scope="scope"
      :limit="limit"
    >
      <template
        #default="slotProps"
      >
        <BaseTracksSimpleList
          :tracks="slotProps[scope]"
          is-with-artist-image
          is-with-artist-name
          is-with-album-title
          is-recommendation
          is-with-source-option
          is-with-library-option
          is-with-favorite-option
          is-with-listened-option
          is-with-playlist-option
          is-with-queue-option
          is-with-save-option
          is-with-share-option
          is-with-external-link-option
          is-with-delete-option
        />
      </template>
    </BaseRecommendationsPaginatedSegmentContainer>
  </BaseHeaderSegmentsContainer>
</template>

<script>
import BaseHeaderSegmentsContainer
  from '@/components/containers/segments/BaseHeaderSegmentsContainer.vue'
import BaseRecommendationsPaginatedSegmentContainer
  from '@/components/containers/segments/recommendations/BaseRecommendationsPaginatedSegmentContainer.vue'
import BaseTracksSimpleList
  from '@/components/lists/tracks/BaseTracksSimpleList.vue'
import {
  tracks as tracksLimits
} from '@/helpers/data/limits'
import {
  tracks as formatRecommendationsTracksLink
} from '@/helpers/formatters/links/recommendations'
import recommendationTracksMixin from '@/mixins/recommendationTracksMixin'

export default {
  name: 'RecommendationTracksSegment',
  components: {
    BaseHeaderSegmentsContainer,
    BaseRecommendationsPaginatedSegmentContainer,
    BaseTracksSimpleList
  },
  mixins: [
    recommendationTracksMixin
  ],
  data () {
    return {
      headerScope:
        'recommendationsCollection.tracks',
      scope: 'tracks',
      limit:
        tracksLimits.simple.extrasmall
    }
  },
  computed: {
    headerLink () {
      return formatRecommendationsTracksLink()
    }
  }
}
</script>

<style lang="sass" scoped></style>
