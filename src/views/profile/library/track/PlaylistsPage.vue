<template>
  <BaseProfileLibraryTrackPaginatedPageContainer
    :profile-id="profileId"
    :library-track-id="libraryTrackId"
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
  </BaseProfileLibraryTrackPaginatedPageContainer>
</template>

<script>
import BaseProfileLibraryTrackPaginatedPageContainer
  from '*/components/containers/pages/profile/library/track/BaseProfileLibraryTrackPaginatedPageContainer.vue'
import BasePlaylistsSimpleList
  from '*/components/lists/playlists/BasePlaylistsSimpleList.vue'
import {
  isCurrentProfile
} from '*/helpers/utils'

export default {
  name: 'PlaylistsPage',
  components: {
    BaseProfileLibraryTrackPaginatedPageContainer,
    BasePlaylistsSimpleList
  },
  props: {
    profileId: {
      type: String,
      required: true
    },
    libraryTrackId: String
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
