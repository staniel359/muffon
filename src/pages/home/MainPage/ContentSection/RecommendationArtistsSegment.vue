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
        <BaseArtistsTableList
          :artists="slotProps[scope]"
          :items-in-row="itemsInRow"
          is-recommendation
          is-with-library-option
          is-with-favorite-option
          is-with-bookmark-option
          is-with-listened-option
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
import BaseArtistsTableList
  from '@/components/lists/artists/BaseArtistsTableList.vue'
import {
  artists as artistsLimits
} from '@/helpers/data/limits'
import {
  artists as formatRecommendationsArtistsLink
} from '@/helpers/formatters/links/recommendations'
import recommendationArtistsMixin from '@/mixins/recommendationArtistsMixin'

export default {
  name: 'RecommendationArtistsSegment',
  components: {
    BaseHeaderSegmentsContainer,
    BaseRecommendationsPaginatedSegmentContainer,
    BaseArtistsTableList
  },
  mixins: [
    recommendationArtistsMixin
  ],
  data () {
    return {
      isRecommendationsSegment: true,
      headerScope:
        'recommendationsCollection.artists',
      scope: 'artists',
      limit: (
        artistsLimits.table.small / 2
      ),
      itemsInRow: (
        artistsLimits.table.small / 2
      )
    }
  },
  computed: {
    headerLink () {
      return formatRecommendationsArtistsLink()
    }
  }
}
</script>

<style lang="sass" scoped></style>
