<template>
  <BaseTagPaginatedSegmentContainer
    headerTextKey="artists"
    scope="artists"
    :clientPageLimit="4"
    :responsePageLimit="21"
    :tagName="tagName"
    :formatHeaderLink="formatTagArtistsLink"
  >
    <template #default="slotProps">
      <BaseArtistsTableList
        :itemsInRow="4"
        :artists="slotProps.artists"
        isWithListenersCount
      />
    </template>
  </BaseTagPaginatedSegmentContainer>
</template>

<script>
import BaseTagPaginatedSegmentContainer
  from '@/containers/pages/tag/BaseTagPaginatedSegmentContainer.vue'
import BaseArtistsTableList from '@/lists/artists/BaseArtistsTableList.vue'
import { tagArtists as formatTagArtistsLink } from '#/formatters/links'

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
