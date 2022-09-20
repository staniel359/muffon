<template>
  <BaseVideoPageContainer
    ref="page"
    :video-id="videoId"
    :scope="scope"
    :limit="limit"
  >
    <template #default="pageSlotProps">
      <BasePaginatedPageContainer
        :response-data="pageSlotProps.videoData"
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
  </BaseVideoPageContainer>
</template>

<script>
import BaseVideoPageContainer
  from '@/components/containers/pages/video/BaseVideoPageContainer.vue'
import BasePaginatedPageContainer
  from '@/components/containers/pages/BasePaginatedPageContainer.vue'
import BaseVideosTableList
  from '@/components/lists/videos/BaseVideosTableList.vue'
import paginatedPageMixin from '@/mixins/paginatedPageMixin'

export default {
  name: 'RelatedPage',
  components: {
    BaseVideoPageContainer,
    BasePaginatedPageContainer,
    BaseVideosTableList
  },
  mixins: [
    paginatedPageMixin
  ],
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
