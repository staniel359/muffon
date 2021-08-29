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
        <BasePaginatedContainer
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
        </BasePaginatedContainer>
      </BaseSegmentContainer>
    </template>
  </BaseProfilesPageContainer>
</template>

<script>
import BaseProfilesPageContainer
  from '@/containers/pages/profiles/BaseProfilesPageContainer.vue'
import BaseSegmentContainer from '@/containers/BaseSegmentContainer.vue'
import BasePaginatedContainer from '@/containers/BasePaginatedContainer.vue'
import BaseProfilesSimpleList from '@/lists/profiles/BaseProfilesSimpleList.vue'

export default {
  name: 'ProfilesPage',
  components: {
    BaseProfilesPageContainer,
    BaseSegmentContainer,
    BasePaginatedContainer,
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
