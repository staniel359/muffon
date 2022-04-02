<template>
  <BaseProfileLibrarySegmentContainer
    ref="segment"
    :profileId="profileId"
    :scope="scope"
    :responsePageLimit="responsePageLimit"
    :headerLink="headerLink"
  >
    <template #default="segmentSlotProps">
      <BaseSegmentContainer
        class="segment-container"
        :isLoading="segmentSlotProps.isLoading"
      >
        <BasePaginatedListContainer
          :isLoading="segmentSlotProps.isLoading"
          :error="segmentSlotProps.error"
          :responseData="segmentSlotProps.libraryData"
          :scope="scope"
          :clientPageLimit="clientPageLimit"
          :responsePageLimit="responsePageLimit"
          @fetchData="segmentSlotProps.fetchData"
          @refresh="segmentSlotProps.handleRefresh"
          @focus="handleFocus"
        >
          <template #default="slotProps">
            <slot :[scope]="slotProps[scope]"></slot>
          </template>
        </BasePaginatedListContainer>
      </BaseSegmentContainer>
    </template>
  </BaseProfileLibrarySegmentContainer>
</template>

<script>
import BaseProfileLibrarySegmentContainer
  from './BaseProfileLibrarySegmentContainer.vue'
import BaseSegmentContainer
  from '*/components/containers/segments/BaseSegmentContainer.vue'
import BasePaginatedListContainer
  from '*/components/containers/lists/BasePaginatedListContainer.vue'

export default {
  name: 'BaseProfileLibraryPaginatedSegmentContainer',
  components: {
    BaseProfileLibrarySegmentContainer,
    BaseSegmentContainer,
    BasePaginatedListContainer
  },
  props: {
    profileId: String,
    scope: String,
    clientPageLimit: Number,
    responsePageLimit: Number,
    headerLink: Object
  },
  methods: {
    handleFocus () {
      this.$refs.segment.focus()
    }
  }
}
</script>

<style lang="sass" scoped>
.segment-container
  @extend .d-flex
</style>
