<template>
  <BaseCommunityPaginatedPageContainer
    :key="refreshKey"
    model="post"
    :community-id="communityId"
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
  </BaseCommunityPaginatedPageContainer>
</template>

<script>
import BaseCommunityPaginatedPageContainer
  from '@/components/containers/pages/community/BaseCommunityPaginatedPageContainer.vue'
import BasePostsSimpleList
  from '@/components/lists/posts/BasePostsSimpleList.vue'
import orderChangeMixin from '@/mixins/orderChangeMixin'
import pageMixin from '@/mixins/pageMixin'
import {
  posts as postsLimits
} from '@/helpers/data/limits'

export default {
  name: 'PostsPage',
  components: {
    BaseCommunityPaginatedPageContainer,
    BasePostsSimpleList
  },
  mixins: [
    orderChangeMixin,
    pageMixin
  ],
  props: {
    communityId: String
  },
  data () {
    return {
      limit:
        postsLimits.simple.large,
      scope: 'posts',
      order: 'createdDesc'
    }
  }
}
</script>

<style lang="sass" scoped></style>
