<template>
  <BaseCommunityPaginatedPageContainer
    model="post"
    :community-id="communityId"
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
        :is-community-creator="slotProps.isCommunityCreator"
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

export default {
  name: 'PostsPage',
  components: {
    BaseCommunityPaginatedPageContainer,
    BasePostsSimpleList
  },
  mixins: [
    orderChangeMixin
  ],
  props: {
    communityId: String
  },
  data () {
    return {
      limit: 20,
      scope: 'posts',
      order: 'createdDesc'
    }
  }
}
</script>

<style lang="sass" scoped></style>
