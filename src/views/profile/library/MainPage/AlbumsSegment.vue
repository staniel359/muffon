<template>
  <BaseProfileLibraryPaginatedSegmentContainer
    headerTextKey="albums"
    scope="albums"
    :clientPageLimit="4"
    :responsePageLimit="4"
    :profileId="profileId"
    :formatHeaderLink="formatProfileLibraryAlbumsLink"
  >
    <template #default="slotProps">
      <BaseAlbumsTableList
        :itemsInRow="4"
        :albums="slotProps.albums"
        :profileId="profileId"
        :isWithFavoriteOption="isWithFavoriteOption"
        :isWithDeleteOption="isWithDeleteOption"
        isWithArtistName
        isWithTracksCount
        isLinkToLibrary
      />
    </template>
  </BaseProfileLibraryPaginatedSegmentContainer>
</template>

<script>
import BaseProfileLibraryPaginatedSegmentContainer
  from '@/containers/pages/profile/library/BaseProfileLibraryPaginatedSegmentContainer.vue'
import BaseAlbumsTableList from '@/lists/albums/BaseAlbumsTableList.vue'
import {
  albums as formatProfileLibraryAlbumsLink
} from '#/formatters/links/profile/library'

export default {
  name: 'AlbumsSegment',
  components: {
    BaseProfileLibraryPaginatedSegmentContainer,
    BaseAlbumsTableList
  },
  props: {
    profileId: String,
    isWithFavoriteOption: Boolean,
    isWithDeleteOption: Boolean
  },
  methods: {
    formatProfileLibraryAlbumsLink
  }
}
</script>

<style lang="sass" scoped></style>
