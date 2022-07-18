<template>
  <BaseProfileLibraryAlbumPaginatedPageContainer
    :profile-id="profileId"
    :library-album-id="libraryAlbumId"
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
  </BaseProfileLibraryAlbumPaginatedPageContainer>
</template>

<script>
import BaseProfileLibraryAlbumPaginatedPageContainer
  from '*/components/containers/pages/profile/library/album/BaseProfileLibraryAlbumPaginatedPageContainer.vue'
import BasePlaylistsSimpleList
  from '*/components/lists/playlists/BasePlaylistsSimpleList.vue'
import {
  isCurrentProfile
} from '*/helpers/utils'

export default {
  name: 'PlaylistsPage',
  components: {
    BaseProfileLibraryAlbumPaginatedPageContainer,
    BasePlaylistsSimpleList
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
