<template>
  <BaseTagPaginatedSegmentContainer
    :tagName="tagName"
    :scope="scope"
    :limit="limit"
    :responsePageLimit="responsePageLimit"
    :headerLink="headerLink"
  >
    <template #default="slotProps">
      <BaseAlbumsTableList
        :albums="slotProps[scope]"
        :itemsInRow="itemsInRow"
        isWithArtistName
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
  from '*/components/containers/segments/tag/BaseTagPaginatedSegmentContainer.vue'
import BaseAlbumsTableList
  from '*/components/lists/albums/BaseAlbumsTableList.vue'
import { albums as formatTagAlbumsLink } from '*/helpers/formatters/links/tag'

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
      limit: 4,
      responsePageLimit: 20,
      itemsInRow: 4,
      scope: 'albums'
    }
  },
  computed: {
    headerLink () {
      return formatTagAlbumsLink({
        tagName: this.tagName
      })
    }
  }
}
</script>

<style lang="sass" scoped></style>
