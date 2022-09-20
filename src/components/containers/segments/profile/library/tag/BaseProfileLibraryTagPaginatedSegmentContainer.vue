<template>
  <BaseProfileLibraryTagSegmentContainer
    ref="segment"
    :profile-id="profileId"
    :library-tag-id="libraryTagId"
    :scope="scope"
    :limit="limit"
    :header-link="headerLink"
  >
    <template #default="segmentSlotProps">
      <BasePaginatedSegmentContainer
        :response-data="segmentSlotProps.tagData"
        :is-loading="segmentSlotProps.isLoading"
        :error="segmentSlotProps.error"
        :scope="scope"
        :limit="limit"
        @focus="handleFocus"
      >
        <template #default="slotProps">
          <slot
            :[scope]="slotProps[scope]"
          />
        </template>
      </BasePaginatedSegmentContainer>
    </template>
  </BaseProfileLibraryTagSegmentContainer>
</template>

<script>
import BaseProfileLibraryTagSegmentContainer
  from './BaseProfileLibraryTagSegmentContainer.vue'
import BasePaginatedSegmentContainer
  from '@/components/containers/segments/BasePaginatedSegmentContainer.vue'
import paginatedSegmentMixin from '@/mixins/paginatedSegmentMixin'

export default {
  name: 'BaseProfileLibraryTagPaginatedSegmentContainer',
  components: {
    BaseProfileLibraryTagSegmentContainer,
    BasePaginatedSegmentContainer
  },
  mixins: [
    paginatedSegmentMixin
  ],
  props: {
    profileId: String,
    libraryTagId: String,
    scope: String,
    limit: Number,
    headerLink: Object
  }
}
</script>

<style lang="sass" scoped></style>
