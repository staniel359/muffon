<template>
  <BaseTrackPaginatedPageContainer
    :key="refreshKey"
    :scope="scope"
    :limit="limit"
    :source-params="sourceParams"
    is-with-top-second-segment
    is-with-play-button
  >
    <template
      #topPlayButton
    >
      <BaseTrackSimilarPlayButton
        limit-name="medium"
        :artist-name="artistName"
        :track-title="trackTitle"
      />
    </template>

    <template
      #default="slotProps"
    >
      <BaseTracksSimpleList
        :tracks="slotProps[scope]"
        is-with-artist-name
        is-with-artist-image
        is-with-duration
        is-with-source-option
        is-with-library-option
        is-with-favorite-option
        is-with-bookmark-option
        is-with-listened-option
        is-with-playlist-option
        is-with-queue-option
        is-with-share-option
        is-with-external-link-option
      />
    </template>
  </BaseTrackPaginatedPageContainer>
</template>

<script>
import BaseTrackPaginatedPageContainer
  from '@/components/containers/pages/track/BaseTrackPaginatedPageContainer.vue'
import BaseTracksSimpleList
  from '@/components/lists/tracks/BaseTracksSimpleList.vue'
import BaseTrackSimilarPlayButton
  from '@/components/buttons/play/track/BaseTrackSimilarPlayButton.vue'
import {
  tracks as tracksLimits
} from '@/helpers/data/limits'
import pageMixin from '@/mixins/pageMixin'

export default {
  name: 'SimilarPage',
  components: {
    BaseTrackPaginatedPageContainer,
    BaseTracksSimpleList,
    BaseTrackSimilarPlayButton
  },
  mixins: [
    pageMixin
  ],
  props: {
    trackTitle: {
      type: String,
      required: true
    },
    artistName: {
      type: String,
      required: true
    }
  },
  data () {
    return {
      limit:
        tracksLimits.simple.large,
      scope: 'similar'
    }
  },
  computed: {
    sourceParams () {
      return {
        artistName: this.artistName,
        trackTitle: this.trackTitle
      }
    }
  }
}
</script>

<style lang="sass" scoped></style>
