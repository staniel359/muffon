<template>
  <BaseProfileLibraryAlbumPaginatedPageContainer
    :key="refreshKey"
    model="playlist"
    :profile-id="profileId"
    :library-album-id="libraryAlbumId"
    :scope="scope"
    :limit="limit"
    :order="order"
    is-with-top-segment
    is-with-order-change
    is-with-reload-button
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
import pageMixin from '@/mixins/pageMixin'
import {
  playlists as playlistsLimits
} from '@/helpers/data/limits'

export default {
  name: 'PlaylistsPage',
  components: {
    BaseProfileLibraryAlbumPaginatedPageContainer,
    BasePlaylistsSimpleList
  },
  mixins: [
    orderChangeMixin,
    pageMixin
  ],
  props: {
    profileId: Number,
    libraryAlbumId: Number
  },
  data () {
    return {
      limit:
        playlistsLimits.simple.large,
      scope: 'playlists',
      order: 'createdDesc'
    }
  }
}
</script>

<style lang="sass" scoped></style>
