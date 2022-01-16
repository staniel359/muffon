<template>
  <BaseCommunitiesPageContainer
    :responsePageLimit="limit"
  >
    <template #default="pageSlotProps">
      <div
        :class="[
          'ui raised segments',
          'main-segment-container',
          'main-page-segment-container'
        ]"
      >
        <BaseSegmentContainer>
          <BaseCommunityCreateButton />
        </BaseSegmentContainer>

        <BaseSegmentContainer
          class="main-paginated-page-segment-container"
          :isLoading="pageSlotProps.isLoading"
        >
          <BasePaginatedListContainer
            ref="paginatedContainer"
            scope="communities"
            :isLoading="pageSlotProps.isLoading"
            :error="pageSlotProps.error"
            :responseData="pageSlotProps.communitiesData"
            :clientPageLimit="limit"
            :responsePageLimit="limit"
            @focus="handleFocus"
            @fetchData="pageSlotProps.fetchData"
            @refresh="pageSlotProps.handleRefresh"
          >
            <template #default="slotProps">
              <BaseCommunitiesSimpleList
                :communities="slotProps.communities"
              />
            </template>
          </BasePaginatedListContainer>
        </BaseSegmentContainer>
      </div>
    </template>
  </BaseCommunitiesPageContainer>
</template>

<script>
import BaseCommunitiesPageContainer
  from '@/containers/pages/communities/BaseCommunitiesPageContainer.vue'
import BaseSegmentContainer
  from '@/containers/segments/BaseSegmentContainer.vue'
import BaseCommunityCreateButton
  from '@/buttons/community/BaseCommunityCreateButton.vue'
import BasePaginatedListContainer
  from '@/containers/lists/BasePaginatedListContainer.vue'
import BaseCommunitiesSimpleList
  from '@/lists/communities/BaseCommunitiesSimpleList.vue'

export default {
  name: 'MainPage',
  components: {
    BaseCommunitiesPageContainer,
    BaseSegmentContainer,
    BaseCommunityCreateButton,
    BasePaginatedListContainer,
    BaseCommunitiesSimpleList
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
