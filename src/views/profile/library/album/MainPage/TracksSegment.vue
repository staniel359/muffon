<template>
  <BaseProfileLibraryAlbumPaginatedSegmentContainer
    :profile-id="profileId"
    :album-id="albumId"
    :scope="scope"
    :limit="limit"
    :header-link="headerLink"
  >
    <template #default="slotProps">
      <BaseTracksSimpleList
        :tracks="slotProps[scope]"
        :profile-id="profileId"
        :artist-name="slotProps.artistName"
        :is-with-favorite-option="isWithFavoriteOption"
        :is-with-delete-option="isWithDeleteOption"
        is-with-created
        is-link-to-library
        is-with-playlist-option
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
  name: 'TracksSegment',
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
      limit: 10,
      scope: 'tracks'
    }
  },
  computed: {
    headerLink () {
      return formatProfileLibraryAlbumTracksLink(
        {
          profileId: this.profileId,
          albumId: this.albumId
        }
      )
    }
  }
}
</script>

<style lang="sass" scoped></style>
