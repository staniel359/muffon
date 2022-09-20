<template>
  <BaseVideoChannelPageContainer
    ref="page"
    :channel-id="channelId"
    :scope="scope"
    :limit="limit"
  >
    <template #default="pageSlotProps">
      <BasePaginatedPageContainer
        :response-data="pageSlotProps.channelData"
        :is-loading="pageSlotProps.isLoading"
        :error="pageSlotProps.error"
        :scope="scope"
        :limit="limit"
        is-pagination-simple
      >
        <template #default="slotProps">
          <BaseVideosTableList
            :videos="slotProps[scope]"
            is-with-share-option
          />
        </template>
      </BasePaginatedPageContainer>
    </template>
  </BaseVideoChannelPageContainer>
</template>

<script>
import BaseVideoChannelPageContainer
  from '@/components/containers/pages/video/BaseVideoChannelPageContainer.vue'
import BasePaginatedPageContainer
  from '@/components/containers/pages/BasePaginatedPageContainer.vue'
import BaseVideosTableList
  from '@/components/lists/videos/BaseVideosTableList.vue'
import paginatedPageMixin from '@/mixins/paginatedPageMixin'

export default {
  name: 'VideosPage',
  components: {
    BaseVideoChannelPageContainer,
    BasePaginatedPageContainer,
    BaseVideosTableList
  },
  mixins: [
    paginatedPageMixin
  ],
  props: {
    channelId: String
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
