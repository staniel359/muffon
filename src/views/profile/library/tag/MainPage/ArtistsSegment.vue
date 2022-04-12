<template>
  <BaseProfileLibraryTagPaginatedSegmentContainer
    :profileId="profileId"
    :tagId="tagId"
    :scope="scope"
    :limit="limit"
    :headerLink="headerLink"
  >
    <template #default="slotProps">
      <BaseArtistsTableList
        :artists="slotProps[scope]"
        :profileId="profileId"
        :itemsInRow="itemsInRow"
        :isWithFavoriteOption="isWithFavoriteOption"
        isLinkToLibrary
        isWithLibrary
      />
    </template>
  </BaseProfileLibraryTagPaginatedSegmentContainer>
</template>

<script>
import BaseProfileLibraryTagPaginatedSegmentContainer
  from '*/components/containers/segments/profile/library/tag/BaseProfileLibraryTagPaginatedSegmentContainer.vue'
import BaseArtistsTableList
  from '*/components/lists/artists/BaseArtistsTableList.vue'
import {
  artists as formatProfileLibraryTagArtistsLink
} from '*/helpers/formatters/links/profile/library/tag'

export default {
  name: 'ArtistsSegment',
  components: {
    BaseProfileLibraryTagPaginatedSegmentContainer,
    BaseArtistsTableList
  },
  props: {
    profileId: {
      type: String,
      required: true
    },
    tagId: {
      type: String,
      required: true
    },
    isWithFavoriteOption: Boolean
  },
  data () {
    return {
      limit: 4,
      itemsInRow: 4,
      scope: 'artists'
    }
  },
  computed: {
    headerLink () {
      return formatProfileLibraryTagArtistsLink({
        profileId: this.profileId,
        tagId: this.tagId
      })
    }
  }
}
</script>

<style lang="sass" scoped></style>
