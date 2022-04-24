<template>
  <BaseVideoChannelPageContainer
    ref="page"
    :limit="limit"
  >
    <template #default="pageSlotProps">
      <BasePaginatedPageContainer
        response-data-name="channelData"
        :slot-props-data="pageSlotProps"
        :scope="scope"
        :limit="limit"
        is-pagination-simple
        is-reset
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
import paginatedPageMixin from '*/mixins/paginatedPageMixin'

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
  data () {
    return {
      limit: 40,
      scope: 'videos'
    }
  }
}
</script>

<style lang="sass" scoped></style>
