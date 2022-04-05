<template>
  <BaseProfileLibraryArtistPaginatedSegmentContainer
    scope="albums"
    :limit="limit"
    :profileId="profileId"
    :artistId="artistId"
    :headerLink="headerLink"
  >
    <template #default="slotProps">
      <BaseAlbumsTableList
        :itemsInRow="3"
        :albums="slotProps.albums"
        :profileId="profileId"
        :artistName="slotProps.artistName"
        :isWithFavoriteOption="isWithFavoriteOption"
        isWithLibrary
        isLinkToLibrary
      />
    </template>
  </BaseProfileLibraryArtistPaginatedSegmentContainer>
</template>

<script>
import BaseProfileLibraryArtistPaginatedSegmentContainer
  from '*/components/containers/segments/profile/library/artist/BaseProfileLibraryArtistPaginatedSegmentContainer.vue'
import BaseAlbumsTableList
  from '*/components/lists/albums/BaseAlbumsTableList.vue'
import {
  albums as formatProfileLibraryArtistAlbumsLink
} from '*/helpers/formatters/links/profile/library/artist'

export default {
  name: 'AlbumsSegment',
  components: {
    BaseProfileLibraryArtistPaginatedSegmentContainer,
    BaseAlbumsTableList
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
    isWithFavoriteOption: Boolean
  },
  data () {
    return {
      limit: 3
    }
  },
  computed: {
    headerLink () {
      return formatProfileLibraryArtistAlbumsLink({
        profileId: this.profileId,
        artistId: this.artistId
      })
    }
  }
}
</script>

<style lang="sass" scoped></style>
