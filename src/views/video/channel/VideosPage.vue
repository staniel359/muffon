<template>
  <BaseVideoChannelPageContainer
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
          scope="videos"
          :isLoading="pageSlotProps.isLoading"
          :error="pageSlotProps.error"
          :responseData="pageSlotProps.channelData"
          :clientPageLimit="limit"
          :responsePageLimit="limit"
          isPaginationSimple
          isReset
          @fetchData="pageSlotProps.fetchData"
          @refresh="pageSlotProps.handleRefresh"
        >
          <template #default="slotProps">
            <BaseVideosTableList
              :videos="slotProps.videos"
            />
          </template>
        </BasePaginatedListContainer>
      </BaseSegmentContainer>
    </template>
  </BaseVideoChannelPageContainer>
</template>

<script>
import BaseVideoChannelPageContainer
  from '*/components/containers/pages/video/BaseVideoChannelPageContainer.vue'
import BaseSegmentContainer
  from '*/components/containers/segments/BaseSegmentContainer.vue'
import BasePaginatedListContainer
  from '*/components/containers/lists/BasePaginatedListContainer.vue'
import BaseVideosTableList
  from '*/components/lists/videos/BaseVideosTableList.vue'

export default {
  name: 'VideosPage',
  components: {
    BaseVideoChannelPageContainer,
    BaseSegmentContainer,
    BasePaginatedListContainer,
    BaseVideosTableList
  },
  data () {
    return {
      limit: 40
    }
  }
}
</script>

<style lang="sass" scoped></style>
