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
        is-with-share-option
        is-with-delete-option
      />
    </template>
  </BaseProfileLibraryTrackPaginatedPageContainer>
</template>

<script>
import BaseProfileLibraryTrackPaginatedPageContainer
  from '@/components/containers/pages/profile/library/track/BaseProfileLibraryTrackPaginatedPageContainer.vue'
import BasePlaylistsSimpleList
  from '@/components/lists/playlists/BasePlaylistsSimpleList.vue'

export default {
  name: 'PlaylistsPage',
  components: {
    BaseProfileLibraryTrackPaginatedPageContainer,
    BasePlaylistsSimpleList
  },
  props: {
    profileId: String,
    libraryTrackId: String
  },
  data () {
    return {
      limit: 50,
      scope: 'playlists'
    }
  }
}
</script>

<style lang="sass" scoped></style>
