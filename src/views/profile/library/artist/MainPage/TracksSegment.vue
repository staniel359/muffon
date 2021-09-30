<template>
  <BaseProfileLibraryArtistPaginatedSegmentContainer
    headerTextKey="tracks"
    scope="tracks"
    :clientPageLimit="10"
    :responsePageLimit="10"
    :profileId="profileId"
    :artistId="artistId"
    :formatHeaderLink="formatProfileLibraryArtistTracksLink"
  >
    <template #default="slotProps">
      <BaseTracksSimpleList
        :tracks="slotProps.tracks"
        :profileId="profileId"
        :artistId="artistId"
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
  from '@/containers/pages/profile/library/artist/BaseProfileLibraryArtistPaginatedSegmentContainer.vue'
import BaseTracksSimpleList from '@/lists/tracks/BaseTracksSimpleList.vue'
import {
  tracks as formatProfileLibraryArtistTracksLink
} from '#/formatters/links/profile/library/artist'

export default {
  name: 'AlbumsSegment',
  components: {
    BaseProfileLibraryArtistPaginatedSegmentContainer,
    BaseTracksSimpleList
  },
  props: {
    profileId: String,
    artistId: String,
    artistName: String,
    isWithFavoriteOption: Boolean,
    isWithDeleteOption: Boolean
  },
  methods: {
    formatProfileLibraryArtistTracksLink
  }
}
</script>

<style lang="sass" scoped></style>
