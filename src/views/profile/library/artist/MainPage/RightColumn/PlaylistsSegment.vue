<template>
  <BaseProfileLibraryArtistPaginatedSegmentContainer
    :profile-id="profileId"
    :library-artist-id="libraryArtistId"
    :scope="scope"
    :limit="limit"
    :header-link="headerLink"
  >
    <template #default="slotProps">
      <BasePlaylistsSimpleList
        :playlists="slotProps[scope]"
        :is-with-delete-option="isSelf"
        is-with-share-option
      />
    </template>
  </BaseProfileLibraryArtistPaginatedSegmentContainer>
</template>

<script>
import BaseProfileLibraryArtistPaginatedSegmentContainer
  from '@/components/containers/segments/profile/library/artist/BaseProfileLibraryArtistPaginatedSegmentContainer.vue'
import BasePlaylistsSimpleList
  from '@/components/lists/playlists/BasePlaylistsSimpleList.vue'
import {
  playlists as formatProfileLibraryArtistPlaylistsLink
} from '@/helpers/formatters/links/profile/library/artist'
import {
  isCurrentProfile
} from '@/helpers/utils'

export default {
  name: 'PlaylistsSegment',
  components: {
    BaseProfileLibraryArtistPaginatedSegmentContainer,
    BasePlaylistsSimpleList
  },
  props: {
    profileId: {
      type: String,
      required: true
    },
    libraryArtistId: {
      type: String,
      required: true
    }
  },
  data () {
    return {
      limit: 3,
      scope: 'playlists'
    }
  },
  computed: {
    headerLink () {
      return formatProfileLibraryArtistPlaylistsLink(
        {
          profileId: this.profileId,
          libraryArtistId: this.libraryArtistId
        }
      )
    },
    isSelf () {
      return isCurrentProfile(
        this.profileId
      )
    }
  }
}
</script>

<style lang="sass" scoped></style>
