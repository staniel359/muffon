<template>
  <BaseFeedPaginatedPageContainer
    ref="page"
    :key="refreshKey"
    model="post"
    :scope="scope"
    :limit="limit"
    :order="order"
    is-with-top-segment
    is-with-order-change
    is-with-reload-button
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
import pageMixin from '@/mixins/pageMixin'
import {
  posts as postsLimits
} from '@/helpers/data/limits'

export default {
  name: 'MainPage',
  components: {
    BaseFeedPaginatedPageContainer,
    BasePostsSimpleList
  },
  mixins: [
    orderChangeMixin,
    pageMixin
  ],
  data () {
    return {
      limit:
        postsLimits.simple.large,
      scope: 'feed',
      order: 'createdDesc'
    }
  }
}
</script>

<style lang="sass" scoped></style>
