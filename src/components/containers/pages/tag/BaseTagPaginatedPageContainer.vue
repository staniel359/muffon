<template>
  <BaseTagPageContainer
    :pageNameKey="pageNameKey"
    :scope="scope"
    :responsePageLimit="responsePageLimit"
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
        <BasePaginatedContainer
          :isLoading="pageSlotProps.isLoading"
          :error="pageSlotProps.error"
          :responseData="pageSlotProps.tagData"
          :scope="scope"
          :clientPageLimit="clientPageLimit"
          :responsePageLimit="responsePageLimit"
          @fetchData="pageSlotProps.fetchData"
          @refresh="pageSlotProps.handleRefresh"
          @focus="handleFocus"
        >
          <template #default="slotProps">
            <slot :[scope]="slotProps[scope]"></slot>
          </template>
        </BasePaginatedContainer>
      </BaseSegmentContainer>
    </template>
  </BaseTagPageContainer>
</template>

<script>
import BaseTagPageContainer from './BaseTagPageContainer.vue'
import BaseSegmentContainer from '@/containers/BaseSegmentContainer.vue'
import BasePaginatedContainer from '@/containers/BasePaginatedContainer.vue'

export default {
  name: 'BaseTagPaginatedPageContainer',
  components: {
    BaseTagPageContainer,
    BaseSegmentContainer,
    BasePaginatedContainer
  },
  props: {
    pageNameKey: String,
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
