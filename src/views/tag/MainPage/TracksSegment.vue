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
      <BaseTracksSimpleList
        :tracks="slotProps[scope]"
        is-with-artist-name
        is-with-artist-image
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
  </BaseTagPaginatedSegmentContainer>
</template>

<script>
import BaseTagPaginatedSegmentContainer
  from '@/components/containers/segments/tag/BaseTagPaginatedSegmentContainer.vue'
import BaseTracksSimpleList
  from '@/components/lists/tracks/BaseTracksSimpleList.vue'
import {
  tracks as formatTagTracksLink
} from '@/helpers/formatters/links/tag'
import {
  tracks as tracksLimits
} from '@/helpers/data/limits'

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
      limit:
        tracksLimits.simple.small,
      scope: 'tracks'
    }
  },
  computed: {
    headerLink () {
      return formatTagTracksLink(
        {
          tagName: this.tagName
        }
      )
    }
  }
}
</script>

<style lang="sass" scoped></style>
