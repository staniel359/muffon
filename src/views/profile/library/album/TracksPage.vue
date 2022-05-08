<template>
  <BaseProfileLibraryAlbumPaginatedPageContainer
    :profile-id="profileId"
    :library-album-id="libraryAlbumId"
    :scope="scope"
    :limit="limit"
  >
    <template #default="slotProps">
      <BaseTracksSimpleList
        :tracks="slotProps[scope]"
        :profile-id="profileId"
        :artist-name="slotProps.artistName"
        :is-with-favorite-option="isSelf"
        :is-with-delete-option="isSelf"
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
    profileId: {
      type: String,
      required: true
    },
    libraryAlbumId: String
  },
  data () {
    return {
      limit: 50,
      scope: 'tracks'
    }
  },
  computed: {
    isSelf () {
      return isCurrentProfile(
        this.profileId
      )
    }
  }
}
</script>

<style lang="sass" scoped></style>
