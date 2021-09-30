<template>
  <BaseProfileLibraryAlbumPaginatedSegmentContainer
    headerTextKey="tracks"
    scope="tracks"
    :clientPageLimit="10"
    :responsePageLimit="10"
    :profileId="profileId"
    :albumId="albumId"
    :formatHeaderLink="formatProfileLibraryAlbumTracksLink"
  >
    <template #default="slotProps">
      <BaseTracksSimpleList
        :tracks="slotProps.tracks"
        :profileId="profileId"
        :artistId="slotProps.artistId"
        :artistName="slotProps.artistName"
        :isWithFavoriteOption="isWithFavoriteOption"
        :isWithDeleteOption="isWithDeleteOption"
        isWithCreated
        isLinkToLibrary
        isWithPlaylistOption
      />
    </template>
  </BaseProfileLibraryAlbumPaginatedSegmentContainer>
</template>

<script>
import BaseProfileLibraryAlbumPaginatedSegmentContainer
  from '@/containers/pages/profile/library/album/BaseProfileLibraryAlbumPaginatedSegmentContainer.vue'
import BaseTracksSimpleList from '@/lists/tracks/BaseTracksSimpleList.vue'
import {
  tracks as formatProfileLibraryAlbumTracksLink
} from '#/formatters/links/profile/library/album'

export default {
  name: 'AlbumsSegment',
  components: {
    BaseProfileLibraryAlbumPaginatedSegmentContainer,
    BaseTracksSimpleList
  },
  props: {
    profileId: String,
    albumId: String,
    isWithFavoriteOption: Boolean,
    isWithDeleteOption: Boolean
  },
  methods: {
    formatProfileLibraryAlbumTracksLink
  }
}
</script>

<style lang="sass" scoped></style>
