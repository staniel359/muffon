<template>
  <BaseRecommendationsPaginatedPageContainer
    :key="refreshKey"
    ref="page"
    model="recommendationTrack"
    :scope="scope"
    :limit="limit"
    :order="order"
    is-with-top-segment
    is-with-top-second-segment
    is-with-play-button
    is-with-order-change
    is-with-reload-button
  >
    <template
      #topPlayButton
    >
      <BaseRecommendationsTracksPlayButton
        limit-name="medium"
        :order="order"
      />
    </template>

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
import BaseRecommendationsTracksPlayButton
  from '@/components/buttons/play/recommendations/BaseRecommendationsTracksPlayButton.vue'
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
    BaseTracksSimpleList,
    BaseRecommendationsTracksPlayButton
  },
  mixins: [
    orderChangeMixin,
    pageMixin,
    recommendationTracksMixin
  ],
  data () {
    return {
      isRecommendationsPage: true,
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
