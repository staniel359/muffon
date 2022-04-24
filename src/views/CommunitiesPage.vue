<template>
  <BaseCommunitiesPageContainer
    ref="page"
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

        <BasePaginatedSegmentContainer
          ref="pagination"
          class="main-paginated-page-segment-container"
          response-data-name="communitiesData"
          :slot-props-data="pageSlotProps"
          :scope="scope"
          :limit="limit"
          @focus="handleFocus"
        >
          <template #default="slotProps">
            <BaseCommunitiesSimpleList
              :communities="slotProps[scope]"
            />
          </template>
        </BasePaginatedSegmentContainer>
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
import BasePaginatedSegmentContainer
  from '*/components/containers/segments/BasePaginatedSegmentContainer.vue'
import BaseCommunitiesSimpleList
  from '*/components/lists/communities/BaseCommunitiesSimpleList.vue'
import paginatedPageMixin from '*/mixins/paginatedPageMixin'

export default {
  name: 'CommunitiesPage',
  components: {
    BaseCommunitiesPageContainer,
    BaseSegmentContainer,
    BaseCommunityCreateButton,
    BasePaginatedSegmentContainer,
    BaseCommunitiesSimpleList
  },
  mixins: [
    paginatedPageMixin
  ],
  data () {
    return {
      limit: 50,
      scope: 'communities'
    }
  }
}
</script>

<style lang="sass" scoped></style>
