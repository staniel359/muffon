<template>
  <BaseVideoPageContainer
    :videoId="videoId"
    :scope="scope"
    :limit="limit"
  >
    <template #default="pageSlotProps">
      <BasePaginatedPageContainer
        responseDataName="videoData"
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
  </BaseVideoPageContainer>
</template>

<script>
import BaseVideoPageContainer
  from '*/components/containers/pages/video/BaseVideoPageContainer.vue'
import BasePaginatedPageContainer
  from '*/components/containers/pages/BasePaginatedPageContainer.vue'
import BaseVideosTableList
  from '*/components/lists/videos/BaseVideosTableList.vue'

export default {
  name: 'VideosPage',
  components: {
    BaseVideoPageContainer,
    BasePaginatedPageContainer,
    BaseVideosTableList
  },
  props: {
    videoId: String
  },
  data () {
    return {
      limit: 40,
      scope: 'related'
    }
  }
}
</script>

<style lang="sass" scoped></style>
