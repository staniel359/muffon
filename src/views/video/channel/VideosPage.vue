<template>
  <BaseVideoChannelPageContainer
    :limit="limit"
  >
    <template #default="pageSlotProps">
      <BasePaginatedPageContainer
        responseDataName="channelData"
        :slotPropsData="pageSlotProps"
        :scope="scope"
        :limit="limit"
        isPaginationSimple
        isReset
      >
        <template #default="slotProps">
          <BaseVideosTableList
            :videos="slotProps[scope]"
          />
        </template>
      </BasePaginatedPageContainer>
    </template>
  </BaseVideoChannelPageContainer>
</template>

<script>
import BaseVideoChannelPageContainer
  from '*/components/containers/pages/video/BaseVideoChannelPageContainer.vue'
import BasePaginatedPageContainer
  from '*/components/containers/pages/BasePaginatedPageContainer.vue'
import BaseVideosTableList
  from '*/components/lists/videos/BaseVideosTableList.vue'

export default {
  name: 'VideosPage',
  components: {
    BaseVideoChannelPageContainer,
    BasePaginatedPageContainer,
    BaseVideosTableList
  },
  data () {
    return {
      limit: 40,
      scope: 'videos'
    }
  }
}
</script>

<style lang="sass" scoped></style>
