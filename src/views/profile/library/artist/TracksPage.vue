<template>
  <BaseProfileLibraryArtistPaginatedPageContainer
    pageNameKey="tracks"
    scope="tracks"
    :clientPageLimit="50"
    :responsePageLimit="50"
    :profileId="profileId"
    :artistId="artistId"
  >
    <template #default="slotProps">
      <BaseTracksSimpleList
        :tracks="slotProps.tracks"
        :profileId="profileId"
        :artistId="artistId"
        :artistName="slotProps.artistName"
        :isWithFavoriteOption="isWithFavoriteOption"
        :isWithDeleteOption="isWithDeleteOption"
        isWithImage
        isWithAlbumTitle
        isWithCreated
        isLinkToLibrary
        isWithPlaylistOption
      />
    </template>
  </BaseProfileLibraryArtistPaginatedPageContainer>
</template>

<script>
import BaseProfileLibraryArtistPaginatedPageContainer
  from '@/containers/pages/profile/library/artist/BaseProfileLibraryArtistPaginatedPageContainer.vue'
import BaseTracksSimpleList from '@/lists/tracks/BaseTracksSimpleList.vue'
import { isCurrentProfile } from '#/utils'

export default {
  name: 'TracksPage',
  components: {
    BaseProfileLibraryArtistPaginatedPageContainer,
    BaseTracksSimpleList
  },
  props: {
    profileId: String,
    artistId: String
  },
  computed: {
    isWithFavoriteOption () {
      return isCurrentProfile(
        this.profileId
      )
    },
    isWithDeleteOption () {
      return isCurrentProfile(
        this.profileId
      )
    }
  }
}
</script>

<style lang="sass" scoped></style>
