<template>
  <BaseBookmarksPaginatedSegmentContainer
    :scope="scope"
    :limit="limit"
    :header-link="headerLink"
  >
    <template
      #default="slotProps"
    >
      <BaseVideosSimpleList
        :videos="slotProps[scope]"
        is-with-channel-title
        is-with-created
        is-bookmark
        is-with-favorite-option
        is-with-watched-option
        is-with-share-option
        is-with-delete-option
      />
    </template>
  </BaseBookmarksPaginatedSegmentContainer>
</template>

<script>
import BaseBookmarksPaginatedSegmentContainer
  from '@/components/containers/segments/bookmarks/BaseBookmarksPaginatedSegmentContainer.vue'
import BaseVideosSimpleList
  from '@/components/lists/videos/BaseVideosSimpleList.vue'
import {
  videos as formatBookmarkVideosLink
} from '@/helpers/formatters/links/bookmarks'
import {
  videos as videosLimits
} from '@/helpers/data/limits'

export default {
  name: 'VideosSegment',
  components: {
    BaseBookmarksPaginatedSegmentContainer,
    BaseVideosSimpleList
  },
  data () {
    return {
      limit:
        videosLimits.simple.small,
      scope: 'videos'
    }
  },
  computed: {
    headerLink () {
      return formatBookmarkVideosLink()
    }
  }
}
</script>

<style lang="sass" scoped></style>
