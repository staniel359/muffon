<template>
  <BaseProfileLibraryAlbumPaginatedSegmentContainer
    scope="tracks"
    :clientPageLimit="limit"
    :responsePageLimit="limit"
    :profileId="profileId"
    :albumId="albumId"
    :headerLink="headerLink"
  >
    <template #default="slotProps">
      <BaseTracksSimpleList
        :tracks="slotProps.tracks"
        :profileId="profileId"
        :artistName="slotProps.artistName"
        :isWithFavoriteOption="isWithFavoriteOption"
        :isWithDeleteOption="isWithDeleteOption"
        isWithCreated
        isLinkToLibrary
        isWithPlaylistOption
      />
    </template>
  </BaseProfileLibraryAlbumPaginatedSegmentContainer>
</template>

<script>
import BaseProfileLibraryAlbumPaginatedSegmentContainer
  from '*/components/containers/segments/profile/library/album/BaseProfileLibraryAlbumPaginatedSegmentContainer.vue'
import BaseTracksSimpleList
  from '*/components/lists/tracks/BaseTracksSimpleList.vue'
import {
  tracks as formatProfileLibraryAlbumTracksLink
} from '*/helpers/formatters/links/profile/library/album'

export default {
  name: 'AlbumsSegment',
  components: {
    BaseProfileLibraryAlbumPaginatedSegmentContainer,
    BaseTracksSimpleList
  },
  props: {
    profileId: {
      type: String,
      required: true
    },
    albumId: {
      type: String,
      required: true
    },
    isWithFavoriteOption: Boolean,
    isWithDeleteOption: Boolean
  },
  data () {
    return {
      limit: 10
    }
  },
  computed: {
    headerLink () {
      return formatProfileLibraryAlbumTracksLink({
        profileId: this.profileId,
        albumId: this.albumId
      })
    }
  }
}
</script>

<style lang="sass" scoped></style>
