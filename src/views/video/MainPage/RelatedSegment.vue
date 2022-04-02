<template>
  <BaseVideoSegmentContainer
    ref="segment"
    scope="related"
    :videoId="videoId"
    :responsePageLimit="limit"
    :headerLink="headerLink"
  >
    <template #default="pageSlotProps">
      <BaseSegmentContainer
        :isLoading="pageSlotProps.isLoading"
      >
        <BasePaginatedListContainer
          scope="related"
          :isLoading="pageSlotProps.isLoading"
          :error="pageSlotProps.error"
          :responseData="pageSlotProps.videoData"
          :clientPageLimit="4"
          :responsePageLimit="limit"
          @fetchData="pageSlotProps.fetchData"
          @refresh="pageSlotProps.handleRefresh"
        >
          <template #default="slotProps">
            <BaseVideosTableList
              :videos="slotProps.related"
            />
          </template>
        </BasePaginatedListContainer>
      </BaseSegmentContainer>
    </template>
  </BaseVideoSegmentContainer>
</template>

<script>
import BaseVideoSegmentContainer
  from '*/components/containers/segments/video/BaseVideoSegmentContainer.vue'
import BaseSegmentContainer
  from '*/components/containers/segments/BaseSegmentContainer.vue'
import BasePaginatedListContainer
  from '*/components/containers/lists/BasePaginatedListContainer.vue'
import BaseVideosTableList
  from '*/components/lists/videos/BaseVideosTableList.vue'
import {
  related as formatVideoRelatedLink
} from '*/helpers/formatters/links/video'

export default {
  name: 'RelatedSegment',
  components: {
    BaseVideoSegmentContainer,
    BaseSegmentContainer,
    BasePaginatedListContainer,
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
      limit: 40
    }
  },
  computed: {
    videoId () {
      return this.videoData.youtube_id.toString()
    },
    headerLink () {
      return formatVideoRelatedLink({
        videoId: this.videoId
      })
    }
  },
  methods: {
    handleFocus () {
      this.$refs.segment.focus()
    }
  }
}
</script>

<style lang="sass" scoped>
.segment-container
  @extend .d-flex
</style>
