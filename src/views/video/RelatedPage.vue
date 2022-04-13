<template>
  <BaseVideoPageContainer
    :video-id="videoId"
    :scope="scope"
    :limit="limit"
  >
    <template #default="pageSlotProps">
      <BasePaginatedPageContainer
        response-data-name="videoData"
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
  name: 'RelatedPage',
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
