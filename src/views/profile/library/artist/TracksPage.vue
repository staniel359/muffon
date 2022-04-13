<template>
  <BaseProfileLibraryArtistPaginatedPageContainer
    :profile-id="profileId"
    :artist-id="artistId"
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
        is-with-image
        is-with-album-title
        is-with-created
        is-link-to-library
        is-with-playlist-option
      />
    </template>
  </BaseProfileLibraryArtistPaginatedPageContainer>
</template>

<script>
import BaseProfileLibraryArtistPaginatedPageContainer
  from '*/components/containers/pages/profile/library/artist/BaseProfileLibraryArtistPaginatedPageContainer.vue'
import BaseTracksSimpleList
  from '*/components/lists/tracks/BaseTracksSimpleList.vue'
import {
  isCurrentProfile
} from '*/helpers/utils'

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
