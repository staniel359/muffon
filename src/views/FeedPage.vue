<template>
  <BaseFeedPageContainer
    :limit="limit"
  >
    <template #default="pageSlotProps">
      <BasePaginatedPageContainer
        response-data-name="feedData"
        :slot-props-data="pageSlotProps"
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

export default {
  name: 'FeedPage',
  components: {
    BaseFeedPageContainer,
    BasePaginatedPageContainer,
    BasePostsSimpleList
  },
  data () {
    return {
      limit: 50,
      scope: 'feed'
    }
  }
}
</script>

<style lang="sass" scoped></style>
