<template>
  <BaseProfileLibraryPaginatedSegmentContainer
    headerTextKey="artists"
    scope="artists"
    :clientPageLimit="5"
    :responsePageLimit="5"
    :profileId="profileId"
    :formatHeaderLink="formatProfileLibraryArtistsLink"
  >
    <template #default="slotProps">
      <BaseArtistsTableList
        :itemsInRow="5"
        :artists="slotProps.artists"
        :profileId="profileId"
        :isWithFavoriteOption="isWithFavoriteOption"
        :isWithDeleteOption="isWithDeleteOption"
        isWithTracksCount
        isWithAlbumsCount
        isLinkToLibrary
      />
    </template>
  </BaseProfileLibraryPaginatedSegmentContainer>
</template>

<script>
import BaseProfileLibraryPaginatedSegmentContainer
  from '@/containers/pages/profile/library/BaseProfileLibraryPaginatedSegmentContainer.vue'
import BaseArtistsTableList from '@/lists/artists/BaseArtistsTableList.vue'
import {
  artists as formatProfileLibraryArtistsLink
} from '#/formatters/links/profile/library'

export default {
  name: 'ArtistsSegment',
  components: {
    BaseProfileLibraryPaginatedSegmentContainer,
    BaseArtistsTableList
  },
  props: {
    profileId: String,
    isWithFavoriteOption: Boolean,
    isWithDeleteOption: Boolean
  },
  methods: {
    formatProfileLibraryArtistsLink
  }
}
</script>

<style lang="sass" scoped></style>
