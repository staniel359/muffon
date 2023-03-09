<template>
  <BaseTopPaginatedSegmentContainer
    :scope="scope"
    :limit="limit"
    :country="country"
    :header-link="headerLink"
  >
    <template
      #default="slotProps"
    >
      <BaseArtistsTableList
        :artists="slotProps[scope]"
        :items-in-row="itemsInRow"
        is-with-listeners-count
        is-with-library-option
        is-with-favorite-option
        is-with-bookmark-option
        is-with-listened-option
        is-with-share-option
      />
    </template>
  </BaseTopPaginatedSegmentContainer>
</template>

<script>
import BaseTopPaginatedSegmentContainer
  from '@/components/containers/segments/top/BaseTopPaginatedSegmentContainer.vue'
import BaseArtistsTableList
  from '@/components/lists/artists/BaseArtistsTableList.vue'
import {
  artists as formatTopArtistsLink
} from '@/helpers/formatters/links/top'
import {
  artists as artistsLimits
} from '@/helpers/data/limits'

export default {
  name: 'ArtistsSegment',
  components: {
    BaseTopPaginatedSegmentContainer,
    BaseArtistsTableList
  },
  props: {
    country: String
  },
  data () {
    return {
      limit:
        artistsLimits.table.small,
      itemsInRow: (
        artistsLimits.table.small / 2
      ),
      scope: 'artists'
    }
  },
  computed: {
    headerLink () {
      return formatTopArtistsLink(
        {
          country: this.country
        }
      )
    }
  }
}
</script>

<style lang="sass" scoped></style>
