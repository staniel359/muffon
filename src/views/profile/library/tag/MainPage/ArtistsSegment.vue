<template>
  <BaseProfileLibraryTagPaginatedSegmentContainer
    headerTextKey="artists"
    scope="artists"
    :clientPageLimit="limit"
    :responsePageLimit="limit"
    :profileId="profileId"
    :tagId="tagId"
    :formatHeaderLink="formatProfileLibraryTagArtistsLink"
  >
    <template #default="slotProps">
      <BaseArtistsTableList
        :itemsInRow="4"
        :artists="slotProps.artists"
        :profileId="profileId"
        :isWithFavoriteOption="isWithFavoriteOption"
        isLinkToLibrary
        isWithLibrary
      />
    </template>
  </BaseProfileLibraryTagPaginatedSegmentContainer>
</template>

<script>
import BaseProfileLibraryTagPaginatedSegmentContainer
  from '@/containers/segments/profile/library/tag/BaseProfileLibraryTagPaginatedSegmentContainer.vue'
import BaseArtistsTableList from '@/lists/artists/BaseArtistsTableList.vue'
import {
  artists as formatProfileLibraryTagArtistsLink
} from '#/formatters/links/profile/library/tag'

export default {
  name: 'ArtistsSegment',
  components: {
    BaseProfileLibraryTagPaginatedSegmentContainer,
    BaseArtistsTableList
  },
  props: {
    profileId: String,
    tagId: String,
    isWithFavoriteOption: Boolean
  },
  data () {
    return {
      limit: 4
    }
  },
  methods: {
    formatProfileLibraryTagArtistsLink
  }
}
</script>

<style lang="sass" scoped></style>
