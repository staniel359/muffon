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

        <BasePaginatedSegmentContainer
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

export default {
  name: 'CommunitiesPage',
  components: {
    BaseCommunitiesPageContainer,
    BaseSegmentContainer,
    BaseCommunityCreateButton,
    BasePaginatedSegmentContainer,
    BaseCommunitiesSimpleList
  },
  data () {
    return {
      limit: 50,
      scope: 'communities'
    }
  },
  methods: {
    handleFocus () {
      window.scrollTo(
        0,
        0
      )
    }
  }
}
</script>

<style lang="sass" scoped></style>
