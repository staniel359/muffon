<template>
  <BaseProfileLibraryAlbumPaginatedSegmentContainer
    :profile-id="profileId"
    :library-album-id="libraryAlbumId"
    :scope="scope"
    :limit="limit"
    :header-link="headerLink"
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
  </BaseProfileLibraryAlbumPaginatedSegmentContainer>
</template>

<script>
import BaseProfileLibraryAlbumPaginatedSegmentContainer
  from '@/components/containers/segments/profile/library/album/BaseProfileLibraryAlbumPaginatedSegmentContainer.vue'
import BasePlaylistsSimpleList
  from '@/components/lists/playlists/BasePlaylistsSimpleList.vue'
import {
  playlists as formatProfileLibraryAlbumPlaylistsLink
} from '@/helpers/formatters/links/profile/library/album'
import {
  playlists as playlistsLimits
} from '@/helpers/data/limits'

export default {
  name: 'PlaylistsSegment',
  components: {
    BaseProfileLibraryAlbumPaginatedSegmentContainer,
    BasePlaylistsSimpleList
  },
  props: {
    profileId: {
      type: String,
      required: true
    },
    libraryAlbumId: {
      type: String,
      required: true
    }
  },
  data () {
    return {
      limit:
        playlistsLimits.simple.extrasmall,
      scope: 'playlists'
    }
  },
  computed: {
    headerLink () {
      return formatProfileLibraryAlbumPlaylistsLink(
        {
          profileId: this.profileId,
          libraryAlbumId: this.libraryAlbumId
        }
      )
    }
  }
}
</script>

<style lang="sass" scoped></style>
