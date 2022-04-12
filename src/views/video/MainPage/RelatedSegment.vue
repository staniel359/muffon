<template>
  <BaseVideoSegmentContainer
    ref="segment"
    :videoId="videoId"
    :scope="scope"
    :limit="limit"
    :headerLink="headerLink"
  >
    <template #default="pageSlotProps">
      <BasePaginatedSegmentContainer
        responseDataName="videoData"
        :slotPropsData="pageSlotProps"
        :scope="scope"
        :limit="limit"
        :clientPageLimit="clientPageLimit"
        @focus="handleFocus"
      >
        <template #default="slotProps">
          <BaseVideosTableList
            :videos="slotProps[scope]"
          />
        </template>
      </BasePaginatedSegmentContainer>
    </template>
  </BaseVideoSegmentContainer>
</template>

<script>
import BaseVideoSegmentContainer
  from '*/components/containers/segments/video/BaseVideoSegmentContainer.vue'
import BasePaginatedSegmentContainer
  from '*/components/containers/segments/BasePaginatedSegmentContainer.vue'
import BaseVideosTableList
  from '*/components/lists/videos/BaseVideosTableList.vue'
import {
  related as formatVideoRelatedLink
} from '*/helpers/formatters/links/video'

export default {
  name: 'RelatedSegment',
  components: {
    BaseVideoSegmentContainer,
    BasePaginatedSegmentContainer,
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

<style lang="sass" scoped></style>
