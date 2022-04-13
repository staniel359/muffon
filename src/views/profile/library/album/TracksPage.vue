<template>
  <BaseProfileLibraryAlbumPaginatedPageContainer
    :profile-id="profileId"
    :album-id="albumId"
    :scope="scope"
    :limit="limit"
  >
    <template #default="slotProps">
      <BaseTracksSimpleList
        :tracks="slotProps[scope]"
        :profile-id="profileId"
        :artist-name="slotProps.artistName"
        :is-with-favorite-option="isWithFavoriteOption"
        :is-with-delete-option="isWithDeleteOption"
        is-with-created
        is-link-to-library
        is-with-playlist-option
      />
    </template>
  </BaseProfileLibraryAlbumPaginatedPageContainer>
</template>

<script>
import BaseProfileLibraryAlbumPaginatedPageContainer
  from '*/components/containers/pages/profile/library/album/BaseProfileLibraryAlbumPaginatedPageContainer.vue'
import BaseTracksSimpleList
  from '*/components/lists/tracks/BaseTracksSimpleList.vue'
import {
  isCurrentProfile
} from '*/helpers/utils'

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
      limit: 50,
      scope: 'tracks'
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
