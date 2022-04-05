<template>
  <BaseTagPaginatedSegmentContainer
    scope="tracks"
    :limit="limit"
    :responsePageLimit="50"
    :tagName="tagName"
    :headerLink="headerLink"
  >
    <template #default="slotProps">
      <BaseTracksSimpleList
        :tracks="slotProps.tracks"
        :profileId="slotProps.profileId"
        isWithArtistName
        isWithLibraryOption
        isWithFavoriteOption
        isWithBookmarkOption
        isWithListenedOption
        isWithPlaylistOption
      />
    </template>
  </BaseTagPaginatedSegmentContainer>
</template>

<script>
import BaseTagPaginatedSegmentContainer
  from '*/components/containers/segments/tag/BaseTagPaginatedSegmentContainer.vue'
import BaseTracksSimpleList
  from '*/components/lists/tracks/BaseTracksSimpleList.vue'
import { tracks as formatTagTracksLink } from '*/helpers/formatters/links/tag'

export default {
  name: 'TracksSegment',
  components: {
    BaseTagPaginatedSegmentContainer,
    BaseTracksSimpleList
  },
  props: {
    tagName: {
      type: String,
      required: true
    }
  },
  data () {
    return {
      limit: 10
    }
  },
  computed: {
    headerLink () {
      return formatTagTracksLink({
        tagName: this.tagName
      })
    }
  }
}
</script>

<style lang="sass" scoped></style>
