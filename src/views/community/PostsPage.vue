<template>
  <BaseCommunityPageContainer
    ref="page"
    :community-id="communityId"
    :scope="scope"
    :limit="limit"
  >
    <template #default="pageSlotProps">
      <BasePaginatedPageContainer
        response-data-name="communityData"
        :slot-props-data="pageSlotProps"
        :scope="scope"
        :limit="limit"
      >
        <template #default="slotProps">
          <BasePostsSimpleList
            :posts="slotProps[scope]"
            :is-community-creator="pageSlotProps.isCommunityCreator"
          />
        </template>
      </BasePaginatedPageContainer>
    </template>
  </BaseCommunityPageContainer>
</template>

<script>
import BaseCommunityPageContainer
  from '*/components/containers/pages/community/BaseCommunityPageContainer.vue'
import BasePaginatedPageContainer
  from '*/components/containers/pages/BasePaginatedPageContainer.vue'
import BasePostsSimpleList
  from '*/components/lists/posts/BasePostsSimpleList.vue'
import paginatedPageMixin from '*/mixins/paginatedPageMixin'

export default {
  name: 'PostsPage',
  components: {
    BaseCommunityPageContainer,
    BasePaginatedPageContainer,
    BasePostsSimpleList
  },
  mixins: [
    paginatedPageMixin
  ],
  props: {
    communityId: String
  },
  data () {
    return {
      limit: 20,
      scope: 'posts'
    }
  }
}
</script>

<style lang="sass" scoped></style>
