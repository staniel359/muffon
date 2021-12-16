<template>
  <BaseProfilePageContainer
    scope="posts"
    pageNameKey="posts"
    :profileId="profileId"
    :responsePageLimit="limit"
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
  </BaseProfilePageContainer>
</template>

<script>
import { mapState } from 'vuex'
import BaseProfilePageContainer
  from '@/containers/pages/profile/BaseProfilePageContainer.vue'
import BaseSegmentContainer
  from '@/containers/segments/BaseSegmentContainer.vue'
import BasePaginatedListContainer
  from '@/containers/lists/BasePaginatedListContainer.vue'
import BasePostsSimpleList from '@/lists/posts/BasePostsSimpleList.vue'

export default {
  name: 'PostsPage',
  components: {
    BaseProfilePageContainer,
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
