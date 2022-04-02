<template>
  <BaseTrackPageContainer
    :scope="scope"
    :responsePageLimit="responsePageLimit"
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
          :isLoading="pageSlotProps.isLoading"
          :error="pageSlotProps.error"
          :responseData="pageSlotProps.trackData"
          :scope="scope"
          :clientPageLimit="clientPageLimit"
          :responsePageLimit="responsePageLimit"
          @fetchData="pageSlotProps.fetchData"
          @refresh="pageSlotProps.handleRefresh"
          @focus="handleFocus"
        >
          <template #default="slotProps">
            <slot
              :[scope]="slotProps[scope]"
              :profileId="pageSlotProps.profileId"
            ></slot>
          </template>
        </BasePaginatedListContainer>
      </BaseSegmentContainer>
    </template>
  </BaseTrackPageContainer>
</template>

<script>
import BaseTrackPageContainer from './BaseTrackPageContainer.vue'
import BaseSegmentContainer
  from '*/components/containers/segments/BaseSegmentContainer.vue'
import BasePaginatedListContainer
  from '*/components/containers/lists/BasePaginatedListContainer.vue'

export default {
  name: 'BaseTrackPaginatedPageContainer',
  components: {
    BaseTrackPageContainer,
    BaseSegmentContainer,
    BasePaginatedListContainer
  },
  props: {
    scope: String,
    clientPageLimit: Number,
    responsePageLimit: Number
  },
  methods: {
    handleFocus () {
      window.scrollTo(0, 0)
    }
  }
}
</script>

<style lang="sass" scoped></style>
