<template>
  <BaseTagPaginatedSegmentContainer
    headerTextKey="tracks"
    scope="tracks"
    :clientPageLimit="limit"
    :responsePageLimit="50"
    :tagName="tagName"
    :formatHeaderLink="formatTagTracksLink"
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
    tagName: String
  },
  data () {
    return {
      limit: 10
    }
  },
  methods: {
    formatTagTracksLink
  }
}
</script>

<style lang="sass" scoped></style>
