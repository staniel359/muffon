<template>
  <BaseProfileLibraryArtistPaginatedSegmentContainer
    :profile-id="profileId"
    :artist-id="artistId"
    :scope="scope"
    :limit="limit"
    :header-link="headerLink"
  >
    <template #default="slotProps">
      <BaseAlbumsTableList
        :albums="slotProps[scope]"
        :profile-id="profileId"
        :artist-name="slotProps.artistName"
        :items-in-row="itemsInRow"
        :is-with-favorite-option="isWithFavoriteOption"
        is-with-library
        is-link-to-library
      />
    </template>
  </BaseProfileLibraryArtistPaginatedSegmentContainer>
</template>

<script>
import BaseProfileLibraryArtistPaginatedSegmentContainer
  from '*/components/containers/segments/profile/library/artist/BaseProfileLibraryArtistPaginatedSegmentContainer.vue'
import BaseAlbumsTableList
  from '*/components/lists/albums/BaseAlbumsTableList.vue'
import {
  albums as formatProfileLibraryArtistAlbumsLink
} from '*/helpers/formatters/links/profile/library/artist'

export default {
  name: 'AlbumsSegment',
  components: {
    BaseProfileLibraryArtistPaginatedSegmentContainer,
    BaseAlbumsTableList
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
    isWithFavoriteOption: Boolean
  },
  data () {
    return {
      limit: 3,
      itemsInRow: 3,
      scope: 'albums'
    }
  },
  computed: {
    headerLink () {
      return formatProfileLibraryArtistAlbumsLink(
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
