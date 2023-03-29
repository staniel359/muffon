<template>
  <BaseProfileLibraryArtistTabContainer
    :profile-id="profileId"
    :library-artist-id="libraryArtistId"
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
  </BaseProfileLibraryArtistTabContainer>
</template>

<script>
import BaseProfileLibraryArtistTabContainer
  from '@/components/containers/tabs/profile/library/artist/BaseProfileLibraryArtistTabContainer.vue'
import BasePlaylistsSimpleList
  from '@/components/lists/playlists/BasePlaylistsSimpleList.vue'
import {
  playlists as playlistsLimits
} from '@/helpers/data/limits'
import tabMixin from '@/mixins/tabMixin'

export default {
  name: 'PlaylistsTab',
  components: {
    BaseProfileLibraryArtistTabContainer,
    BasePlaylistsSimpleList
  },
  mixins: [
    tabMixin
  ],
  props: {
    profileId: String,
    libraryArtistId: String,
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
