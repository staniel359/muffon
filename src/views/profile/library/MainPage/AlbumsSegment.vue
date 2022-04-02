<template>
  <BaseProfileLibraryPaginatedSegmentContainer
    scope="albums"
    :clientPageLimit="limit"
    :responsePageLimit="limit"
    :profileId="profileId"
    :headerLink="headerLink"
  >
    <template #default="slotProps">
      <BaseAlbumsTableList
        :itemsInRow="4"
        :albums="slotProps.albums"
        :profileId="profileId"
        :isWithFavoriteOption="isWithFavoriteOption"
        isWithArtistName
        isWithLibrary
        isLinkToLibrary
      />
    </template>
  </BaseProfileLibraryPaginatedSegmentContainer>
</template>

<script>
import BaseProfileLibraryPaginatedSegmentContainer
  from '*/components/containers/segments/profile/library/BaseProfileLibraryPaginatedSegmentContainer.vue'
import BaseAlbumsTableList
  from '*/components/lists/albums/BaseAlbumsTableList.vue'
import {
  albums as formatProfileLibraryAlbumsLink
} from '*/helpers/formatters/links/profile/library'

export default {
  name: 'AlbumsSegment',
  components: {
    BaseProfileLibraryPaginatedSegmentContainer,
    BaseAlbumsTableList
  },
  props: {
    profileId: {
      type: String,
      required: true
    },
    isWithFavoriteOption: Boolean
  },
  data () {
    return {
      limit: 4
    }
  },
  computed: {
    headerLink () {
      return formatProfileLibraryAlbumsLink({
        profileId: this.profileId
      })
    }
  }
}
</script>

<style lang="sass" scoped></style>
