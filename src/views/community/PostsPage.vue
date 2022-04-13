<template>
  <BaseCommunityPostsPageContainer
    :community-id="communityId"
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
            :community-creator-id="pageSlotProps.communityCreatorId"
          />
        </template>
      </BasePaginatedPageContainer>
    </template>
  </BaseCommunityPostsPageContainer>
</template>

<script>
import BaseCommunityPostsPageContainer
  from '*/components/containers/pages/community/posts/BaseCommunityPostsPageContainer.vue'
import BasePaginatedPageContainer
  from '*/components/containers/pages/BasePaginatedPageContainer.vue'
import BasePostsSimpleList
  from '*/components/lists/posts/BasePostsSimpleList.vue'

export default {
  name: 'PostsPage',
  components: {
    BaseCommunityPostsPageContainer,
    BasePaginatedPageContainer,
    BasePostsSimpleList
  },
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
