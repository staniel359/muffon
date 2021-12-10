<template>
  <BaseTagPaginatedSegmentContainer
    headerTextKey="artists"
    scope="artists"
    :clientPageLimit="limit"
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
        isWithLibraryOption
        isWithFavoriteOption
        isWithBookmarkOption
        isWithListenedOption
      />
    </template>
  </BaseTagPaginatedSegmentContainer>
</template>

<script>
import BaseTagPaginatedSegmentContainer
  from '@/containers/segments/tag/BaseTagPaginatedSegmentContainer.vue'
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
  data () {
    return {
      limit: 5
    }
  },
  methods: {
    formatTagArtistsLink
  }
}
</script>

<style lang="sass" scoped></style>
