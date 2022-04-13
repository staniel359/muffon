<template>
  <BaseProfileLibraryPaginatedSegmentContainer
    :profile-id="profileId"
    :scope="scope"
    :limit="limit"
    :header-link="headerLink"
  >
    <template #default="slotProps">
      <BaseArtistsTableList
        :artists="slotProps[scope]"
        :profile-id="profileId"
        :items-in-row="itemsInRow"
        :is-with-favorite-option="isWithFavoriteOption"
        is-with-library
        is-link-to-library
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
      limit: 5,
      itemsInRow: 5,
      scope: 'artists'
    }
  },
  computed: {
    headerLink () {
      return formatProfileLibraryArtistsLink(
        {
          profileId: this.profileId
        }
      )
    }
  }
}
</script>

<style lang="sass" scoped></style>
