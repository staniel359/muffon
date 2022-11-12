<template>
  <BaseProfileLibraryAlbumPaginatedPageContainer
    model="playlist"
    :profile-id="profileId"
    :library-album-id="libraryAlbumId"
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
  </BaseProfileLibraryAlbumPaginatedPageContainer>
</template>

<script>
import BaseProfileLibraryAlbumPaginatedPageContainer
  from '@/components/containers/pages/profile/library/album/BaseProfileLibraryAlbumPaginatedPageContainer.vue'
import BasePlaylistsSimpleList
  from '@/components/lists/playlists/BasePlaylistsSimpleList.vue'
import orderChangeMixin from '@/mixins/orderChangeMixin'

export default {
  name: 'PlaylistsPage',
  components: {
    BaseProfileLibraryAlbumPaginatedPageContainer,
    BasePlaylistsSimpleList
  },
  mixins: [
    orderChangeMixin
  ],
  props: {
    profileId: String,
    libraryAlbumId: String
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
