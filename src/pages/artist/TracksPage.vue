<template>
  <BaseArtistPaginatedPageContainer
    :key="refreshKey"
    :artist-name="artistName"
    :scope="scope"
    :limit="limit"
    is-with-top-second-segment
    is-with-play-button
  >
    <template
      #topPlayButton
    >
      <BaseArtistTracksPlayButton
        limit-name="medium"
        :artist-name="artistName"
      />
    </template>

    <template
      #default="slotProps"
    >
      <BaseTracksSimpleList
        :tracks="slotProps[scope]"
        :top-track-count="slotProps.topTrackCount"
        is-with-listeners-count
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
  </BaseArtistPaginatedPageContainer>
</template>

<script>
import BaseArtistPaginatedPageContainer
  from '@/components/containers/pages/artist/BaseArtistPaginatedPageContainer.vue'
import BaseTracksSimpleList
  from '@/components/lists/tracks/BaseTracksSimpleList.vue'
import BaseArtistTracksPlayButton
  from '@/components/buttons/play/artist/BaseArtistTracksPlayButton.vue'
import {
  tracks as tracksLimits
} from '@/helpers/data/limits'
import pageMixin from '@/mixins/pageMixin'

export default {
  name: 'TracksPage',
  components: {
    BaseArtistPaginatedPageContainer,
    BaseTracksSimpleList,
    BaseArtistTracksPlayButton
  },
  mixins: [
    pageMixin
  ],
  props: {
    artistName: String
  },
  data () {
    return {
      limit:
        tracksLimits.simple.large,
      scope: 'tracks'
    }
  }
}
</script>

<style lang="sass" scoped></style>
