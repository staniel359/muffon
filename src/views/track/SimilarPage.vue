<template>
  <BaseTrackPaginatedPageContainer
    pageNameKey="similar"
    scope="similar"
    :clientPageLimit="limit"
    :responsePageLimit="limit"
    :sourceParams="sourceParams"
  >
    <template #default="slotProps">
      <BaseTracksSimpleList
        :tracks="slotProps.similar"
        :artistName="slotProps.artistName"
        :profileId="slotProps.profileId"
        isWithArtistName
        isWithDuration
        isWithLibraryOption
        isWithFavoriteOption
        isWithBookmarkOption
        isWithListenedOption
        isWithPlaylistOption
      />
    </template>
  </BaseTrackPaginatedPageContainer>
</template>

<script>
import BaseTrackPaginatedPageContainer
  from '*/components/containers/pages/track/BaseTrackPaginatedPageContainer.vue'
import BaseTracksSimpleList
  from '*/components/lists/tracks/BaseTracksSimpleList.vue'

export default {
  name: 'SimilarPage',
  components: {
    BaseTrackPaginatedPageContainer,
    BaseTracksSimpleList
  },
  props: {
    trackTitle: String,
    artistName: String
  },
  data () {
    return {
      limit: 50
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
