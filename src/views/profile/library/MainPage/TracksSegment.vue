<template>
  <BaseProfileLibraryPaginatedSegmentContainer
    headerTextKey="tracks"
    scope="tracks"
    :clientPageLimit="limit"
    :responsePageLimit="limit"
    :profileId="profileId"
    :formatHeaderLink="formatProfileLibraryTracksLink"
  >
    <template #default="slotProps">
      <BaseTracksSimpleList
        :tracks="slotProps.tracks"
        :profileId="profileId"
        :isWithFavoriteOption="isWithFavoriteOption"
        :isWithDeleteOption="isWithDeleteOption"
        isWithImage
        isWithArtistName
        isWithAlbumTitle
        isWithCreated
        isLinkToLibrary
        isWithPlaylistOption
      />
    </template>
  </BaseProfileLibraryPaginatedSegmentContainer>
</template>

<script>
import BaseProfileLibraryPaginatedSegmentContainer
  from '@/containers/segments/profile/library/BaseProfileLibraryPaginatedSegmentContainer.vue'
import BaseTracksSimpleList from '@/lists/tracks/BaseTracksSimpleList.vue'
import {
  tracks as formatProfileLibraryTracksLink
} from '#/formatters/links/profile/library'

export default {
  name: 'AlbumsSegment',
  components: {
    BaseProfileLibraryPaginatedSegmentContainer,
    BaseTracksSimpleList
  },
  props: {
    profileId: String,
    isWithFavoriteOption: Boolean,
    isWithDeleteOption: Boolean
  },
  data () {
    return {
      limit: 10
    }
  },
  methods: {
    formatProfileLibraryTracksLink
  }
}
</script>

<style lang="sass" scoped></style>
