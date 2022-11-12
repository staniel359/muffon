<template>
  <BaseProfileLibraryTrackPaginatedPageContainer
    model="playlist"
    :profile-id="profileId"
    :library-track-id="libraryTrackId"
    :scope="scope"
    :limit="limit"
    :order="order"
    is-with-top-segment
    is-with-order-change
  >
    <template
      #default="slotProps"
    >
      <BasePlaylistsSimpleList
        :playlists="slotProps[scope]"
        is-with-created
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
import orderChangeMixin from '@/mixins/orderChangeMixin'

export default {
  name: 'PlaylistsPage',
  components: {
    BaseProfileLibraryTrackPaginatedPageContainer,
    BasePlaylistsSimpleList
  },
  mixins: [
    orderChangeMixin
  ],
  props: {
    profileId: String,
    libraryTrackId: String
  },
  data () {
    return {
      limit: 50,
      scope: 'playlists',
      order: 'createdDesc'
    }
  }
}
</script>

<style lang="sass" scoped></style>
