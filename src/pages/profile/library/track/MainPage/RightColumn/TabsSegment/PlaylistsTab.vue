<template>
  <BaseProfileLibraryTrackTabContainer
    :profile-id="profileId"
    :library-track-id="libraryTrackId"
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
  </BaseProfileLibraryTrackTabContainer>
</template>

<script>
import BaseProfileLibraryTrackTabContainer
  from '@/components/containers/tabs/profile/library/track/BaseProfileLibraryTrackTabContainer.vue'
import BasePlaylistsSimpleList
  from '@/components/lists/playlists/BasePlaylistsSimpleList.vue'
import {
  playlists as playlistsLimits
} from '@/helpers/data/limits'
import tabMixin from '@/mixins/tabMixin'

export default {
  name: 'PlaylistsTab',
  components: {
    BaseProfileLibraryTrackTabContainer,
    BasePlaylistsSimpleList
  },
  mixins: [
    tabMixin
  ],
  props: {
    profileId: Number,
    libraryTrackId: Number,
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
