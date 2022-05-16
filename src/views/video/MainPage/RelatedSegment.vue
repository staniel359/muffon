<template>
  <div
    :class="[
      'related-segment',
      'main-basic-segments-container'
    ]"
  >
    <BaseVideoSegmentContainer
      ref="segment"
      :video-id="videoId"
      :scope="scope"
      :limit="limit"
      :header-link="headerLink"
    >
      <template #default="pageSlotProps">
        <BasePaginatedSegmentContainer
          response-data-name="videoData"
          :slot-props-data="pageSlotProps"
          :scope="scope"
          :limit="limit"
          :client-page-limit="clientPageLimit"
          @focus="handleFocus"
        >
          <template #default="slotProps">
            <BaseVideosTableList
              :videos="slotProps[scope]"
              is-with-share-option
            />
          </template>
        </BasePaginatedSegmentContainer>
      </template>
    </BaseVideoSegmentContainer>
  </div>
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
import paginatedSegmentMixin from '*/mixins/paginatedSegmentMixin'

export default {
  name: 'RelatedSegment',
  components: {
    BaseVideoSegmentContainer,
    BasePaginatedSegmentContainer,
    BaseVideosTableList
  },
  mixins: [
    paginatedSegmentMixin
  ],
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
