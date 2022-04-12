<template>
  <BaseTagPaginatedSegmentContainer
    :scope="scope"
    :limit="limit"
    :responsePageLimit="responsePageLimit"
    :tagName="tagName"
    :headerLink="headerLink"
  >
    <template #default="slotProps">
      <BaseArtistsTableList
        :artists="slotProps[scope]"
        :profileId="slotProps.profileId"
        :itemsInRow="itemsInRow"
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
import BaseArtistsTableList
  from '*/components/lists/artists/BaseArtistsTableList.vue'
import {
  artists as formatTagArtistsLink
} from '*/helpers/formatters/links/tag'

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
      responsePageLimit: 21,
      itemsInRow: 5,
      scope: 'artists'
    }
  },
  computed: {
    headerLink () {
      return formatTagArtistsLink({
        tagName: this.tagName
      })
    }
  }
}
</script>

<style lang="sass" scoped></style>
