<template>
  <BaseProfileLibraryTagSegmentContainer
    ref="segment"
    :profileId="profileId"
    :tagId="tagId"
    :scope="scope"
    :limit="limit"
    :headerLink="headerLink"
  >
    <template #default="segmentSlotProps">
      <BasePaginatedSegmentContainer
        responseDataName="libraryTagData"
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
  </BaseProfileLibraryTagSegmentContainer>
</template>

<script>
import BaseProfileLibraryTagSegmentContainer
  from './BaseProfileLibraryTagSegmentContainer.vue'
import BasePaginatedSegmentContainer
  from '*/components/containers/segments/BasePaginatedSegmentContainer.vue'

export default {
  name: 'BaseProfileLibraryTagPaginatedSegmentContainer',
  components: {
    BaseProfileLibraryTagSegmentContainer,
    BasePaginatedSegmentContainer
  },
  props: {
    profileId: String,
    tagId: String,
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
