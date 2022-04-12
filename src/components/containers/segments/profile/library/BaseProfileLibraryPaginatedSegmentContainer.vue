<template>
  <BaseProfileLibrarySegmentContainer
    ref="segment"
    :profileId="profileId"
    :scope="scope"
    :limit="limit"
    :headerLink="headerLink"
  >
    <template #default="segmentSlotProps">
      <BasePaginatedSegmentContainer
        responseDataName="libraryData"
        :slotPropsData="segmentSlotProps"
        :scope="scope"
        :limit="limit"
        @focus="handleFocus"
      >
        <template #default="slotProps">
          <slot
            :[scope]="slotProps[scope]"
          ></slot>
        </template>
      </BasePaginatedSegmentContainer>
    </template>
  </BaseProfileLibrarySegmentContainer>
</template>

<script>
import BaseProfileLibrarySegmentContainer
  from './BaseProfileLibrarySegmentContainer.vue'
import BasePaginatedSegmentContainer
  from '*/components/containers/segments/BasePaginatedSegmentContainer.vue'

export default {
  name: 'BaseProfileLibraryPaginatedSegmentContainer',
  components: {
    BaseProfileLibrarySegmentContainer,
    BasePaginatedSegmentContainer
  },
  props: {
    profileId: String,
    scope: String,
    limit: Number,
    headerLink: Object
  },
  methods: {
    handleFocus () {
      this.$refs.segment.focus()
    }
  }
}
</script>

<style lang="sass" scoped></style>
