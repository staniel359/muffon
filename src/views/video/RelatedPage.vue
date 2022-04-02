<template>
  <BaseVideoPageContainer
    scope="related"
    :videoId="videoId"
    :responsePageLimit="limit"
  >
    <template #default="pageSlotProps">
      <BaseSegmentContainer
        :class="[
          'raised',
          'main-segment-container',
          'main-page-segment-container'
        ]"
        :isLoading="pageSlotProps.isLoading"
      >
        <BasePaginatedListContainer
          scope="related"
          :isLoading="pageSlotProps.isLoading"
          :error="pageSlotProps.error"
          :responseData="pageSlotProps.videoData"
          :clientPageLimit="limit"
          :responsePageLimit="limit"
          isPaginationSimple
          isReset
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
  </BaseVideoPageContainer>
</template>

<script>
import BaseVideoPageContainer
  from '*/components/containers/pages/video/BaseVideoPageContainer.vue'
import BaseSegmentContainer
  from '*/components/containers/segments/BaseSegmentContainer.vue'
import BasePaginatedListContainer
  from '*/components/containers/lists/BasePaginatedListContainer.vue'
import BaseVideosTableList
  from '*/components/lists/videos/BaseVideosTableList.vue'

export default {
  name: 'VideosPage',
  components: {
    BaseVideoPageContainer,
    BaseSegmentContainer,
    BasePaginatedListContainer,
    BaseVideosTableList
  },
  props: {
    videoId: String
  },
  data () {
    return {
      limit: 40
    }
  }
}
</script>

<style lang="sass" scoped></style>
