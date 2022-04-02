<template>
  <BaseProfileLibraryPaginatedSegmentContainer
    scope="artists"
    :clientPageLimit="limit"
    :responsePageLimit="limit"
    :profileId="profileId"
    :headerLink="headerLink"
  >
    <template #default="slotProps">
      <BaseArtistsTableList
        :itemsInRow="5"
        :artists="slotProps.artists"
        :profileId="profileId"
        :isWithFavoriteOption="isWithFavoriteOption"
        isWithLibrary
        isLinkToLibrary
      />
    </template>
  </BaseProfileLibraryPaginatedSegmentContainer>
</template>

<script>
import BaseProfileLibraryPaginatedSegmentContainer
  from '*/components/containers/segments/profile/library/BaseProfileLibraryPaginatedSegmentContainer.vue'
import BaseArtistsTableList
  from '*/components/lists/artists/BaseArtistsTableList.vue'
import {
  artists as formatProfileLibraryArtistsLink
} from '*/helpers/formatters/links/profile/library'

export default {
  name: 'ArtistsSegment',
  components: {
    BaseProfileLibraryPaginatedSegmentContainer,
    BaseArtistsTableList
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
      limit: 5
    }
  },
  computed: {
    headerLink () {
      return formatProfileLibraryArtistsLink({
        profileId: this.profileId
      })
    }
  }
}
</script>

<style lang="sass" scoped></style>
