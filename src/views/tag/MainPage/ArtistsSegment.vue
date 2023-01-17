<template>
  <BaseTagPaginatedSegmentContainer
    :scope="scope"
    :limit="limit"
    :tag-name="tagName"
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
  </BaseTagPaginatedSegmentContainer>
</template>

<script>
import BaseTagPaginatedSegmentContainer
  from '@/components/containers/segments/tag/BaseTagPaginatedSegmentContainer.vue'
import BaseArtistsTableList
  from '@/components/lists/artists/BaseArtistsTableList.vue'
import {
  artists as formatTagArtistsLink
} from '@/helpers/formatters/links/tag'

export default {
  name: 'ArtistsSegment',
  components: {
    BaseTagPaginatedSegmentContainer,
    BaseArtistsTableList
  },
  props: {
    tagName: {
      type: String,
      required: true
    }
  },
  data () {
    return {
      limit: 5,
      itemsInRow: 5,
      scope: 'artists'
    }
  },
  computed: {
    headerLink () {
      return formatTagArtistsLink(
        {
          tagName: this.tagName
        }
      )
    }
  }
}
</script>

<style lang="sass" scoped></style>
