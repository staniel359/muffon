<template>
  <BaseFeedPageContainer
    ref="page"
    :limit="limit"
  >
    <template #default="pageSlotProps">
      <BasePaginatedPageContainer
        :response-data="pageSlotProps.feedData"
        :is-loading="pageSlotProps.isLoading"
        :error="pageSlotProps.error"
        :scope="scope"
        :limit="limit"
      >
        <template #default="slotProps">
          <BasePostsSimpleList
            :posts="slotProps[scope]"
          />
        </template>
      </BasePaginatedPageContainer>
    </template>
  </BaseFeedPageContainer>
</template>

<script>
import BaseFeedPageContainer
  from '*/components/containers/pages/feed/BaseFeedPageContainer.vue'
import BasePaginatedPageContainer
  from '*/components/containers/pages/BasePaginatedPageContainer.vue'
import BasePostsSimpleList
  from '*/components/lists/posts/BasePostsSimpleList.vue'
import paginatedPageMixin from '*/mixins/paginatedPageMixin'

export default {
  name: 'FeedPage',
  components: {
    BaseFeedPageContainer,
    BasePaginatedPageContainer,
    BasePostsSimpleList
  },
  mixins: [
    paginatedPageMixin
  ],
  data () {
    return {
      limit: 50,
      scope: 'feed'
    }
  }
}
</script>

<style lang="sass" scoped></style>
