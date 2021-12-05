<template>
  <BaseProfileLibraryArtistPaginatedSegmentContainer
    headerTextKey="albums"
    scope="albums"
    :clientPageLimit="limit"
    :responsePageLimit="limit"
    :profileId="profileId"
    :artistId="artistId"
    :formatHeaderLink="formatProfileLibraryArtistAlbumsLink"
  >
    <template #default="slotProps">
      <BaseAlbumsTableList
        :itemsInRow="3"
        :albums="slotProps.albums"
        :profileId="profileId"
        :artistName="slotProps.artistName"
        :isWithFavoriteOption="isWithFavoriteOption"
        isWithTracksCount
        isLinkToLibrary
      />
    </template>
  </BaseProfileLibraryArtistPaginatedSegmentContainer>
</template>

<script>
import BaseProfileLibraryArtistPaginatedSegmentContainer
  from '@/containers/pages/profile/library/artist/BaseProfileLibraryArtistPaginatedSegmentContainer.vue'
import BaseAlbumsTableList from '@/lists/albums/BaseAlbumsTableList.vue'
import {
  albums as formatProfileLibraryArtistAlbumsLink
} from '#/formatters/links/profile/library/artist'

export default {
  name: 'AlbumsSegment',
  components: {
    BaseProfileLibraryArtistPaginatedSegmentContainer,
    BaseAlbumsTableList
  },
  props: {
    profileId: String,
    artistId: String,
    isWithFavoriteOption: Boolean
  },
  data () {
    return {
      limit: 3
    }
  },
  methods: {
    formatProfileLibraryArtistAlbumsLink
  }
}
</script>

<style lang="sass" scoped></style>
