<template>
  <BaseProfileLibraryAlbumPaginatedPageContainer
    pageNameKey="tracks"
    scope="tracks"
    :clientPageLimit="limit"
    :responsePageLimit="limit"
    :profileId="profileId"
    :albumId="albumId"
  >
    <template #default="slotProps">
      <BaseTracksSimpleList
        :tracks="slotProps.tracks"
        :profileId="profileId"
        :artistName="slotProps.artistName"
        :artistId="slotProps.artistId"
        :isWithFavoriteOption="isWithFavoriteOption"
        :isWithDeleteOption="isWithDeleteOption"
        isWithImage
        isWithCreated
        isLinkToLibrary
        isWithPlaylistOption
      />
    </template>
  </BaseProfileLibraryAlbumPaginatedPageContainer>
</template>

<script>
import BaseProfileLibraryAlbumPaginatedPageContainer
  from '@/containers/pages/profile/library/album/BaseProfileLibraryAlbumPaginatedPageContainer.vue'
import BaseTracksSimpleList from '@/lists/tracks/BaseTracksSimpleList.vue'
import { isCurrentProfile } from '#/utils'

export default {
  name: 'TracksPage',
  components: {
    BaseProfileLibraryAlbumPaginatedPageContainer,
    BaseTracksSimpleList
  },
  props: {
    profileId: String,
    albumId: String
  },
  data () {
    return {
      limit: 50
    }
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
