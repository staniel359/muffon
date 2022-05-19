<template>
  <BaseProfilePageContainer
    ref="page"
    :profile-id="profileId"
    :scope="scope"
    :limit="limit"
  >
    <template #default="pageSlotProps">
      <BasePaginatedPageContainer
        :response-data="pageSlotProps.profileData"
        :is-loading="pageSlotProps.isLoading"
        :error="pageSlotProps.error"
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
  </BaseProfilePageContainer>
</template>

<script>
import BaseProfilePageContainer
  from '*/components/containers/pages/profile/BaseProfilePageContainer.vue'
import BasePaginatedPageContainer
  from '*/components/containers/pages/BasePaginatedPageContainer.vue'
import BasePostsSimpleList
  from '*/components/lists/posts/BasePostsSimpleList.vue'
import paginatedPageMixin from '*/mixins/paginatedPageMixin'

export default {
  name: 'PostsPage',
  components: {
    BaseProfilePageContainer,
    BasePaginatedPageContainer,
    BasePostsSimpleList
  },
  mixins: [
    paginatedPageMixin
  ],
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
