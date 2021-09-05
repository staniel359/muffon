<template>
  <BaseTagPaginatedSegmentContainer
    headerTextKey="artists"
    scope="artists"
    :clientPageLimit="5"
    :responsePageLimit="21"
    :tagName="tagName"
    :formatHeaderLink="formatTagArtistsLink"
  >
    <template #default="slotProps">
      <BaseArtistsTableList
        :itemsInRow="5"
        :artists="slotProps.artists"
        :profileId="slotProps.profileId"
        isWithListenersCount
        isWithLibraryLink
        isWithListenedButton
        isWithBookmarkButton
      />
    </template>
  </BaseTagPaginatedSegmentContainer>
</template>

<script>
import BaseTagPaginatedSegmentContainer
  from '@/containers/pages/tag/BaseTagPaginatedSegmentContainer.vue'
import BaseArtistsTableList from '@/lists/artists/BaseArtistsTableList.vue'
import { artists as formatTagArtistsLink } from '#/formatters/links/tag'

export default {
  name: 'ArtistsSegment',
  components: {
    BaseTagPaginatedSegmentContainer,
    BaseArtistsTableList
  },
  props: {
    tagName: String
  },
  methods: {
    formatTagArtistsLink
  }
}
</script>

<style lang="sass" scoped></style>
