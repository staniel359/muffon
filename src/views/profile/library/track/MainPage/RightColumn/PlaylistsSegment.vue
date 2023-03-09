<template>
  <BaseProfileLibraryTrackPaginatedSegmentContainer
    :profile-id="profileId"
    :library-track-id="libraryTrackId"
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
  </BaseProfileLibraryTrackPaginatedSegmentContainer>
</template>

<script>
import BaseProfileLibraryTrackPaginatedSegmentContainer
  from '@/components/containers/segments/profile/library/track/BaseProfileLibraryTrackPaginatedSegmentContainer.vue'
import BasePlaylistsSimpleList
  from '@/components/lists/playlists/BasePlaylistsSimpleList.vue'
import {
  playlists as formatProfileLibraryTrackPlaylistsLink
} from '@/helpers/formatters/links/profile/library/track'
import {
  playlists as playlistsLimits
} from '@/helpers/data/limits'

export default {
  name: 'PlaylistsSegment',
  components: {
    BaseProfileLibraryTrackPaginatedSegmentContainer,
    BasePlaylistsSimpleList
  },
  props: {
    profileId: {
      type: String,
      required: true
    },
    libraryTrackId: {
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
      return formatProfileLibraryTrackPlaylistsLink(
        {
          profileId: this.profileId,
          libraryTrackId: this.libraryTrackId
        }
      )
    }
  }
}
</script>

<style lang="sass" scoped></style>
