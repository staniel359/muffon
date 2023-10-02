<template>
  <BaseRecommendationsPaginatedPageContainer
    :key="refreshKey"
    ref="page"
    model="recommendationTrack"
    :scope="scope"
    :limit="limit"
    :order="order"
    is-with-top-segment
    is-with-order-change
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
  </BaseRecommendationsPaginatedPageContainer>
</template>

<script>
import BaseRecommendationsPaginatedPageContainer
  from '@/components/containers/pages/recommendations/BaseRecommendationsPaginatedPageContainer.vue'
import BaseTracksSimpleList
  from '@/components/lists/tracks/BaseTracksSimpleList.vue'
import orderChangeMixin from '@/mixins/orderChangeMixin'
import pageMixin from '@/mixins/pageMixin'
import recommendationTracksMixin from '@/mixins/recommendationTracksMixin'
import {
  tracks as tracksLimits
} from '@/helpers/data/limits'

export default {
  name: 'TracksPage',
  components: {
    BaseRecommendationsPaginatedPageContainer,
    BaseTracksSimpleList
  },
  mixins: [
    orderChangeMixin,
    pageMixin,
    recommendationTracksMixin
  ],
  data () {
    return {
      isPage: true,
      scope: 'tracks',
      limit:
        tracksLimits.simple.large,
      order:
        'libraryTracksCountDesc'
    }
  }
}
</script>

<style lang="sass" scoped></style>
