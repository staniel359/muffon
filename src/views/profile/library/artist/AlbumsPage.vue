<template>
  <BaseProfileLibraryArtistPaginatedPageContainer
    pageNameKey="albums"
    scope="albums"
    :clientPageLimit="limit"
    :responsePageLimit="limit"
    :profileId="profileId"
    :artistId="artistId"
  >
    <template #default="slotProps">
      <BaseAlbumsTableList
        :itemsInRow="4"
        :albums="slotProps.albums"
        :profileId="profileId"
        :artistName="slotProps.artistName"
        :isWithFavoriteOption="isWithFavoriteOption"
        isWithLibrary
        isLinkToLibrary
      />
    </template>
  </BaseProfileLibraryArtistPaginatedPageContainer>
</template>

<script>
import BaseProfileLibraryArtistPaginatedPageContainer
  from '*/components/containers/pages/profile/library/artist/BaseProfileLibraryArtistPaginatedPageContainer.vue'
import BaseAlbumsTableList
  from '*/components/lists/albums/BaseAlbumsTableList.vue'
import { isCurrentProfile } from '*/helpers/utils'

export default {
  name: 'AlbumsPage',
  components: {
    BaseProfileLibraryArtistPaginatedPageContainer,
    BaseAlbumsTableList
  },
  props: {
    profileId: String,
    artistId: String
  },
  data () {
    return {
      limit: 20
    }
  },
  computed: {
    isWithFavoriteOption () {
      return isCurrentProfile(
        this.profileId
      )
    }
  }
}
</script>

<style lang="sass" scoped></style>
