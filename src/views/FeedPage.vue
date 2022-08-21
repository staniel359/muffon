<template>
  <BaseFeedPageContainer
    ref="page"
    :limit="limit"
  >
    <template #default="pageSlotProps">
      <BasePaginatedPageContainer
        ref="pagination"
        :response-data="pageSlotProps.feedData"
        :is-loading="pageSlotProps.isLoading"
        :error="pageSlotProps.error"
        :scope="scope"
        :limit="limit"
        is-with-top-segment
      >
        <template #top>
          <div />

          <GlobalToggle
            @change="handleGlobalChange"
          />
        </template>

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
import GlobalToggle from './FeedPage/GlobalToggle.vue'
import BasePostsSimpleList
  from '*/components/lists/posts/BasePostsSimpleList.vue'
import paginatedPageMixin from '*/mixins/paginatedPageMixin'

export default {
  name: 'FeedPage',
  components: {
    BaseFeedPageContainer,
    BasePaginatedPageContainer,
    GlobalToggle,
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
  },
  methods: {
    handleGlobalChange () {
      this.reset()
    }
  }
}
</script>

<style lang="sass" scoped></style>
