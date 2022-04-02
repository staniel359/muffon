<template>
  <BaseProfileLibraryAlbumPaginatedPageContainer
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
        :isWithFavoriteOption="isWithFavoriteOption"
        :isWithDeleteOption="isWithDeleteOption"
        isWithCreated
        isLinkToLibrary
        isWithPlaylistOption
      />
    </template>
  </BaseProfileLibraryAlbumPaginatedPageContainer>
</template>

<script>
import BaseProfileLibraryAlbumPaginatedPageContainer
  from '*/components/containers/pages/profile/library/album/BaseProfileLibraryAlbumPaginatedPageContainer.vue'
import BaseTracksSimpleList
  from '*/components/lists/tracks/BaseTracksSimpleList.vue'
import { isCurrentProfile } from '*/helpers/utils'

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
