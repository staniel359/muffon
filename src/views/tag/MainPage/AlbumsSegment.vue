<template>
  <BaseTagPaginatedSegmentContainer
    :tag-name="tagName"
    :scope="scope"
    :limit="limit"
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
  </BaseTagPaginatedSegmentContainer>
</template>

<script>
import BaseTagPaginatedSegmentContainer
  from '@/components/containers/segments/tag/BaseTagPaginatedSegmentContainer.vue'
import BaseAlbumsTableList
  from '@/components/lists/albums/BaseAlbumsTableList.vue'
import {
  albums as formatTagAlbumsLink
} from '@/helpers/formatters/links/tag'
import {
  albums as albumsLimits
} from '@/helpers/data/limits'

export default {
  name: 'AlbumsSegment',
  components: {
    BaseTagPaginatedSegmentContainer,
    BaseAlbumsTableList
  },
  props: {
    tagName: {
      type: String,
      required: true
    }
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
      return formatTagAlbumsLink(
        {
          tagName: this.tagName
        }
      )
    }
  }
}
</script>

<style lang="sass" scoped></style>
