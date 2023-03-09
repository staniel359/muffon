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
      <BaseAlbumsTableList
        :albums="slotProps[scope]"
        :items-in-row="itemsInRow"
        is-with-artist-name
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
import BaseAlbumsTableList
  from '@/components/lists/albums/BaseAlbumsTableList.vue'
import {
  albums as formatTopAlbumsLink
} from '@/helpers/formatters/links/top'
import {
  albums as albumsLimits
} from '@/helpers/data/limits'

export default {
  name: 'AlbumsSegment',
  components: {
    BaseTopPaginatedSegmentContainer,
    BaseAlbumsTableList
  },
  props: {
    country: String
  },
  data () {
    return {
      limit:
        albumsLimits.table.small,
      itemsInRow: (
        albumsLimits.table.small / 2
      ),
      scope: 'albums'
    }
  },
  computed: {
    headerLink () {
      return formatTopAlbumsLink(
        {
          country: this.country
        }
      )
    }
  }
}
</script>

<style lang="sass" scoped></style>
