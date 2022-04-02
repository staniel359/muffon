<template>
  <BaseTopPaginatedSegmentContainer
    scope="artists"
    :clientPageLimit="limit"
    :responsePageLimit="limit"
    :headerLink="headerLink"
  >
    <template #default="slotProps">
      <BaseArtistsTableList
        :itemsInRow="5"
        :artists="slotProps.artists"
        isWithListenersCount
        isWithLibraryOption
        isWithFavoriteOption
        isWithBookmarkOption
        isWithListenedOption
      />
    </template>
  </BaseTopPaginatedSegmentContainer>
</template>

<script>
import BaseTopPaginatedSegmentContainer
  from '*/components/containers/segments/top/BaseTopPaginatedSegmentContainer.vue'
import BaseArtistsTableList
  from '*/components/lists/artists/BaseArtistsTableList.vue'
import {
  artists as formatTopArtistsLink
} from '*/helpers/formatters/links/top'

export default {
  name: 'ArtistsSegment',
  components: {
    BaseTopPaginatedSegmentContainer,
    BaseArtistsTableList
  },
  data () {
    return {
      limit: 5
    }
  },
  computed: {
    headerLink () {
      return formatTopArtistsLink()
    }
  }
}
</script>

<style lang="sass" scoped></style>
