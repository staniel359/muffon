<template>
  <BasePostsPageContainer
    :profileId="profileId"
    :responsePageLimit="limit"
  >
    <template #default="pageSlotProps">
      <BaseSegmentContainer
        :class="[
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
          :responseData="pageSlotProps.profileData"
          :clientPageLimit="limit"
          :responsePageLimit="limit"
          @focus="handleFocus"
          @fetchData="pageSlotProps.fetchData"
          @refresh="pageSlotProps.handleRefresh"
        >
          <template #default="slotProps">
            <BasePostsSimpleList
              :posts="slotProps.posts"
              :profileId="profileId"
            />
          </template>
        </BasePaginatedListContainer>
      </BaseSegmentContainer>
    </template>
  </BasePostsPageContainer>
</template>

<script>
import { mapState } from 'vuex'
import BasePostsPageContainer
  from '@/containers/pages/profile/posts/BasePostsPageContainer.vue'
import BaseSegmentContainer
  from '@/containers/segments/BaseSegmentContainer.vue'
import BasePaginatedListContainer
  from '@/containers/lists/BasePaginatedListContainer.vue'
import BasePostsSimpleList from '@/lists/posts/BasePostsSimpleList.vue'

export default {
  name: 'PostsPage',
  components: {
    BasePostsPageContainer,
    BaseSegmentContainer,
    BasePaginatedListContainer,
    BasePostsSimpleList
  },
  data () {
    return {
      limit: 50
    }
  },
  computed: {
    ...mapState('profile', {
      profileInfo: 'info'
    }),
    profileId () {
      return this.profileInfo.id.toString()
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
