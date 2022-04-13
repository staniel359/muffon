<template>
  <BaseProfilePostsPageContainer
    :profile-id="profileId"
    :limit="limit"
  >
    <template #default="pageSlotProps">
      <BasePaginatedPageContainer
        response-data-name="profileData"
        :slot-props-data="pageSlotProps"
        :scope="scope"
        :limit="limit"
      >
        <template #default="slotProps">
          <BasePostsSimpleList
            :posts="slotProps[scope]"
            :profile-id="profileId"
          />
        </template>
      </BasePaginatedPageContainer>
    </template>
  </BaseProfilePostsPageContainer>
</template>

<script>
import BaseProfilePostsPageContainer
  from '*/components/containers/pages/profile/posts/BaseProfilePostsPageContainer.vue'
import BasePaginatedPageContainer
  from '*/components/containers/pages/BasePaginatedPageContainer.vue'
import BasePostsSimpleList
  from '*/components/lists/posts/BasePostsSimpleList.vue'

export default {
  name: 'PostsPage',
  components: {
    BaseProfilePostsPageContainer,
    BasePaginatedPageContainer,
    BasePostsSimpleList
  },
  props: {
    profileId: String
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
