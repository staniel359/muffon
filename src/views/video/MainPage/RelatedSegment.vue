<template>
  <div class="main-basic-segments-container related-segment">
    <BaseVideoPaginatedSegmentContainer
      ref="segment"
      :video-id="videoId"
      :scope="scope"
      :limit="limit"
      :client-page-limit="clientPageLimit"
      :header-link="headerLink"
      is-pagination-simple
    >
      <template
        #default="slotProps"
      >
        <BaseVideosTableList
          :videos="slotProps[scope]"
          is-with-share-option
        />
      </template>
    </BaseVideoPaginatedSegmentContainer>
  </div>
</template>

<script>
import BaseVideoPaginatedSegmentContainer
  from '@/components/containers/segments/video/BaseVideoPaginatedSegmentContainer.vue'
import BaseVideosTableList
  from '@/components/lists/videos/BaseVideosTableList.vue'
import {
  related as formatVideoRelatedLink
} from '@/helpers/formatters/links/video'

export default {
  name: 'RelatedSegment',
  components: {
    BaseVideoPaginatedSegmentContainer,
    BaseVideosTableList
  },
  props: {
    videoData: {
      type: Object,
      required: true
    }
  },
  data () {
    return {
      limit: 40,
      clientPageLimit: 4,
      scope: 'related'
    }
  },
  computed: {
    videoId () {
      return this.videoData.source.id
    },
    headerLink () {
      return formatVideoRelatedLink(
        {
          videoId: this.videoId
        }
      )
    }
  }
}
</script>

<style lang="sass" scoped>
.related-segment
  margin-top: 1.5em
</style>
