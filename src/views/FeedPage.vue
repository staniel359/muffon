<template>
  <BaseFeedPaginatedPageContainer
    ref="page"
    model="post"
    :scope="scope"
    :limit="limit"
    :order="order"
    is-with-top-segment
    is-with-order-change
  >
    <template
      #default="slotProps"
    >
      <BasePostsSimpleList
        :posts="slotProps[scope]"
      />
    </template>
  </BaseFeedPaginatedPageContainer>
</template>

<script>
import BaseFeedPaginatedPageContainer
  from '@/components/containers/pages/feed/BaseFeedPaginatedPageContainer.vue'
import BasePostsSimpleList
  from '@/components/lists/posts/BasePostsSimpleList.vue'
import orderChangeMixin from '@/mixins/orderChangeMixin'

export default {
  name: 'FeedPage',
  components: {
    BaseFeedPaginatedPageContainer,
    BasePostsSimpleList
  },
  mixins: [
    orderChangeMixin
  ],
  data () {
    return {
      limit: 50,
      scope: 'feed',
      order: 'createdDesc'
    }
  }
}
</script>

<style lang="sass" scoped></style>
