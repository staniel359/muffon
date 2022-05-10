<template>
  <BaseTopPaginatedSegmentContainer
    :scope="scope"
    :limit="limit"
    :header-link="headerLink"
  >
    <template #default="slotProps">
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
  from '*/components/containers/segments/top/BaseTopPaginatedSegmentContainer.vue'
import BaseAlbumsTableList
  from '*/components/lists/albums/BaseAlbumsTableList.vue'
import {
  albums as formatTopAlbumsLink
} from '*/helpers/formatters/links/top'

export default {
  name: 'AlbumsSegment',
  components: {
    BaseTopPaginatedSegmentContainer,
    BaseAlbumsTableList
  },
  data () {
    return {
      limit: 4,
      itemsInRow: 4,
      scope: 'albums'
    }
  },
  computed: {
    headerLink () {
      return formatTopAlbumsLink()
    }
  }
}
</script>

<style lang="sass" scoped></style>
