<template>
  <BaseProfilesPageContainer
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
        :error="pageSlotProps.error"
        @refresh="pageSlotProps.handleRefresh"
      >
        <BasePaginatedListContainer
          scope="profiles"
          :isLoading="pageSlotProps.isLoading"
          :error="pageSlotProps.error"
          :responseData="pageSlotProps.profilesData"
          :responsePageLimit="limit"
          :clientPageLimit="limit"
          @fetchData="pageSlotProps.fetchData"
          @focus="handleFocus"
          @refresh="pageSlotProps.handleRefresh"
        >
          <template #default="slotProps">
            <BaseProfilesSimpleList
              :profiles="slotProps.profiles"
            />
          </template>
        </BasePaginatedListContainer>
      </BaseSegmentContainer>
    </template>
  </BaseProfilesPageContainer>
</template>

<script>
import BaseProfilesPageContainer
  from '@/containers/pages/profiles/BaseProfilesPageContainer.vue'
import BaseSegmentContainer
  from '@/containers/segments/BaseSegmentContainer.vue'
import BasePaginatedListContainer
  from '@/containers/lists/BasePaginatedListContainer.vue'
import BaseProfilesSimpleList from '@/lists/profiles/BaseProfilesSimpleList.vue'

export default {
  name: 'ProfilesPage',
  components: {
    BaseProfilesPageContainer,
    BaseSegmentContainer,
    BasePaginatedListContainer,
    BaseProfilesSimpleList
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
