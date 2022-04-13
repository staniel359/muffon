<template>
  <BaseProfileLibraryPaginatedSegmentContainer
    :profile-id="profileId"
    :scope="scope"
    :limit="limit"
    :header-link="headerLink"
  >
    <template #default="slotProps">
      <BaseAlbumsTableList
        :albums="slotProps[scope]"
        :profile-id="profileId"
        :items-in-row="itemsInRow"
        :is-with-favorite-option="isWithFavoriteOption"
        is-with-artist-name
        is-with-library
        is-link-to-library
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
      limit: 4,
      itemsInRow: 4,
      scope: 'albums'
    }
  },
  computed: {
    headerLink () {
      return formatProfileLibraryAlbumsLink(
        {
          profileId: this.profileId
        }
      )
    }
  }
}
</script>

<style lang="sass" scoped></style>
