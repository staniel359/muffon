<template>
  <BaseVideoChannelPaginatedSegmentContainer
    :channel-id="channelId"
    :scope="scope"
    :limit="limit"
    :header-link="headerLink"
    :client-page-limit="clientPageLimit"
    is-pagination-simple
  >
    <template
      #default="slotProps"
    >
      <BaseVideosTableList
        :videos="slotProps[scope]"
        is-with-watched-option
        is-with-share-option
      />
    </template>
  </BaseVideoChannelPaginatedSegmentContainer>
</template>

<script>
import BaseVideoChannelPaginatedSegmentContainer
  from '@/components/containers/segments/videoChannel/BaseVideoChannelPaginatedSegmentContainer.vue'
import BaseVideosTableList
  from '@/components/lists/videos/BaseVideosTableList.vue'
import {
  videos as formatVideoChannelVideosLink
} from '@/helpers/formatters/links/videoChannel'

export default {
  name: 'VideosSegment',
  components: {
    BaseVideoChannelPaginatedSegmentContainer,
    BaseVideosTableList
  },
  props: {
    channelId: {
      type: String,
      required: true
    }
  },
  data () {
    return {
      limit: 8,
      clientPageLimit: 4,
      scope: 'videos'
    }
  },
  computed: {
    headerLink () {
      return formatVideoChannelVideosLink(
        {
          channelId: this.channelId
        }
      )
    }
  }
}
</script>

<style lang="sass" scoped></style>
