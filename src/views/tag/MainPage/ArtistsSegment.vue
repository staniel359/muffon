<template>
  <BaseTagPaginatedSegmentContainer
    scope="artists"
    :clientPageLimit="limit"
    :responsePageLimit="21"
    :tagName="tagName"
    :headerLink="headerLink"
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
      limit: 5
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
