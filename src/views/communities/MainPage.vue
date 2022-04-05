<template>
  <BaseCommunitiesPageContainer
    :limit="limit"
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
            :limit="limit"
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
  from '*/components/containers/pages/communities/BaseCommunitiesPageContainer.vue'
import BaseSegmentContainer
  from '*/components/containers/segments/BaseSegmentContainer.vue'
import BaseCommunityCreateButton
  from '*/components/buttons/community/BaseCommunityCreateButton.vue'
import BasePaginatedListContainer
  from '*/components/containers/lists/BasePaginatedListContainer.vue'
import BaseCommunitiesSimpleList
  from '*/components/lists/communities/BaseCommunitiesSimpleList.vue'

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
