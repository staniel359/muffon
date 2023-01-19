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
      <BaseTracksSimpleList
        :tracks="slotProps[scope]"
        is-with-artist-image
        is-with-artist-name
        is-with-source-option
        is-with-library-option
        is-with-favorite-option
        is-with-bookmark-option
        is-with-listened-option
        is-with-playlist-option
        is-with-share-option
        is-with-queue-option
      />
    </template>
  </BaseTopPaginatedSegmentContainer>
</template>

<script>
import BaseTopPaginatedSegmentContainer
  from '@/components/containers/segments/top/BaseTopPaginatedSegmentContainer.vue'
import BaseTracksSimpleList
  from '@/components/lists/tracks/BaseTracksSimpleList.vue'
import {
  tracks as formatTopTracksLink
} from '@/helpers/formatters/links/top'

export default {
  name: 'TracksSegment',
  components: {
    BaseTopPaginatedSegmentContainer,
    BaseTracksSimpleList
  },
  props: {
    country: String
  },
  data () {
    return {
      limit: 10,
      scope: 'tracks'
    }
  },
  computed: {
    headerLink () {
      return formatTopTracksLink(
        {
          country: this.country
        }
      )
    }
  }
}
</script>

<style lang="sass" scoped></style>
