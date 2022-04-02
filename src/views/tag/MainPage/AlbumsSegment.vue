<template>
  <BaseTagPaginatedSegmentContainer
    scope="albums"
    :clientPageLimit="limit"
    :responsePageLimit="20"
    :tagName="tagName"
    :headerLink="headerLink"
  >
    <template #default="slotProps">
      <BaseAlbumsTableList
        :itemsInRow="4"
        :albums="slotProps.albums"
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
      limit: 4
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
