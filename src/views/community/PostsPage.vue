<template>
  <BaseCommunityPostsPageContainer
    :communityId="communityId"
    :limit="limit"
  >
    <template #default="pageSlotProps">
      <BaseSegmentContainer
        :class="[
          'raised',
          'main-segment-container',
          'main-page-segment-container',
          'main-paginated-page-segment-container'
        ]"
        :isLoading="pageSlotProps.isLoading"
      >
        <BasePaginatedListContainer
          ref="paginatedContainer"
          scope="posts"
          :isLoading="pageSlotProps.isLoading"
          :error="pageSlotProps.error"
          :responseData="pageSlotProps.communityData"
          :limit="limit"
          @focus="handleFocus"
          @fetchData="pageSlotProps.fetchData"
          @refresh="pageSlotProps.handleRefresh"
        >
          <template #default="slotProps">
            <BasePostsSimpleList
              :posts="slotProps.posts"
              :communityCreatorId="pageSlotProps.communityCreatorId"
            />
          </template>
        </BasePaginatedListContainer>
      </BaseSegmentContainer>
    </template>
  </BaseCommunityPostsPageContainer>
</template>

<script>
import BaseCommunityPostsPageContainer
  from '*/components/containers/pages/community/posts/BaseCommunityPostsPageContainer.vue'
import BaseSegmentContainer
  from '*/components/containers/segments/BaseSegmentContainer.vue'
import BasePaginatedListContainer
  from '*/components/containers/lists/BasePaginatedListContainer.vue'
import BasePostsSimpleList
  from '*/components/lists/posts/BasePostsSimpleList.vue'

export default {
  name: 'PostsPage',
  components: {
    BaseCommunityPostsPageContainer,
    BaseSegmentContainer,
    BasePaginatedListContainer,
    BasePostsSimpleList
  },
  props: {
    communityId: String
  },
  data () {
    return {
      limit: 50
    }
  },
  methods: {
    handleFocus () {
      window.scrollTo(0, 0)
    }
  }
}
</script>

<style lang="sass" scoped></style>
