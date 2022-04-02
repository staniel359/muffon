<template>
  <BaseProfileLibraryArtistPaginatedSegmentContainer
    scope="tracks"
    :clientPageLimit="limit"
    :responsePageLimit="limit"
    :profileId="profileId"
    :artistId="artistId"
    :headerLink="headerLink"
  >
    <template #default="slotProps">
      <BaseTracksSimpleList
        :tracks="slotProps.tracks"
        :profileId="profileId"
        :artistName="artistName"
        :isWithFavoriteOption="isWithFavoriteOption"
        :isWithDeleteOption="isWithDeleteOption"
        isWithImage
        isWithAlbumTitle
        isWithCreated
        isLinkToLibrary
        isWithPlaylistOption
      />
    </template>
  </BaseProfileLibraryArtistPaginatedSegmentContainer>
</template>

<script>
import BaseProfileLibraryArtistPaginatedSegmentContainer
  from '*/components/containers/segments/profile/library/artist/BaseProfileLibraryArtistPaginatedSegmentContainer.vue'
import BaseTracksSimpleList
  from '*/components/lists/tracks/BaseTracksSimpleList.vue'
import {
  tracks as formatProfileLibraryArtistTracksLink
} from '*/helpers/formatters/links/profile/library/artist'

export default {
  name: 'AlbumsSegment',
  components: {
    BaseProfileLibraryArtistPaginatedSegmentContainer,
    BaseTracksSimpleList
  },
  props: {
    profileId: {
      type: String,
      required: true
    },
    artistId: {
      type: String,
      required: true
    },
    artistName: String,
    isWithFavoriteOption: Boolean,
    isWithDeleteOption: Boolean
  },
  data () {
    return {
      limit: 10
    }
  },
  computed: {
    headerLink () {
      return formatProfileLibraryArtistTracksLink({
        profileId: this.profileId,
        artistId: this.artistId
      })
    }
  }
}
</script>

<style lang="sass" scoped></style>
