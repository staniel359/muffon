<template>
  <BaseProfileLibraryArtistPaginatedSegmentContainer
    :profile-id="profileId"
    :artist-id="artistId"
    :scope="scope"
    :limit="limit"
    :header-link="headerLink"
  >
    <template #default="slotProps">
      <BaseTracksSimpleList
        :tracks="slotProps[scope]"
        :profile-id="profileId"
        :artist-name="artistName"
        :is-with-favorite-option="isWithFavoriteOption"
        :is-with-delete-option="isWithDeleteOption"
        is-with-image
        is-with-album-title
        is-with-created
        is-link-to-library
        is-with-playlist-option
      />
    </template>
  </BaseProfileLibraryArtistPaginatedSegmentContainer>
</template>

<script>
import BaseProfileLibraryArtistPaginatedSegmentContainer
  from '*/components/containers/segments/profile/library/artist/BaseProfileLibraryArtistPaginatedSegmentContainer.vue'
import BaseTracksSimpleList
  from '*/components/lists/tracks/BaseTracksSimpleList.vue'
import {
  tracks as formatProfileLibraryArtistTracksLink
} from '*/helpers/formatters/links/profile/library/artist'

export default {
  name: 'TracksSegment',
  components: {
    BaseProfileLibraryArtistPaginatedSegmentContainer,
    BaseTracksSimpleList
  },
  props: {
    profileId: {
      type: String,
      required: true
    },
    artistId: {
      type: String,
      required: true
    },
    artistName: String,
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
      return formatProfileLibraryArtistTracksLink(
        {
          profileId: this.profileId,
          artistId: this.artistId
        }
      )
    }
  }
}
</script>

<style lang="sass" scoped></style>
