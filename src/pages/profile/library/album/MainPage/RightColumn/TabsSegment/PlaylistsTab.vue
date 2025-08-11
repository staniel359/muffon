<template>
  <BaseProfileLibraryAlbumTabContainer
    :profile-id="profileId"
    :library-album-id="libraryAlbumId"
    :scope="scope"
    :limit="limit"
    :is-active="isActive"
    @focus="handleFocus"
  >
    <template
      #default="slotProps"
    >
      <BasePlaylistsSimpleList
        :playlists="slotProps[scope]"
        :is-with-delete-option="isSelf"
        is-with-created
        is-with-share-option
      />
    </template>
  </BaseProfileLibraryAlbumTabContainer>
</template>

<script>
import BaseProfileLibraryAlbumTabContainer
  from '@/components/containers/tabs/profile/library/album/BaseProfileLibraryAlbumTabContainer.vue'
import BasePlaylistsSimpleList
  from '@/components/lists/playlists/BasePlaylistsSimpleList.vue'
import {
  playlists as playlistsLimits
} from '@/helpers/data/limits'
import tabMixin from '@/mixins/tabMixin'

export default {
  name: 'PlaylistsTab',
  components: {
    BaseProfileLibraryAlbumTabContainer,
    BasePlaylistsSimpleList
  },
  mixins: [
    tabMixin
  ],
  props: {
    profileId: Number,
    libraryAlbumId: Number,
    isSelf: Boolean
  },
  data () {
    return {
      limit:
        playlistsLimits.simple.small,
      scope: 'playlists'
    }
  }
}
</script>

<style lang="sass" scoped></style>
