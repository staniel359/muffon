<template>
  <BaseProfileLibraryArtistPaginatedPageContainer
    :profile-id="profileId"
    :library-artist-id="libraryArtistId"
    :scope="scope"
    :limit="limit"
  >
    <template #default="slotProps">
      <BasePlaylistsSimpleList
        :playlists="slotProps[scope]"
        :is-with-delete-option="isSelf"
        is-with-share-option
      />
    </template>
  </BaseProfileLibraryArtistPaginatedPageContainer>
</template>

<script>
import BaseProfileLibraryArtistPaginatedPageContainer
  from '*/components/containers/pages/profile/library/artist/BaseProfileLibraryArtistPaginatedPageContainer.vue'
import BasePlaylistsSimpleList
  from '*/components/lists/playlists/BasePlaylistsSimpleList.vue'
import {
  isCurrentProfile
} from '*/helpers/utils'

export default {
  name: 'PlaylistsPage',
  components: {
    BaseProfileLibraryArtistPaginatedPageContainer,
    BasePlaylistsSimpleList
  },
  props: {
    profileId: {
      type: String,
      required: true
    },
    libraryArtistId: String
  },
  data () {
    return {
      limit: 50,
      scope: 'playlists'
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
