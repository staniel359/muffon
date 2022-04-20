<template>
  <BaseProfileLibraryTagSegmentContainer
    ref="segment"
    :profile-id="profileId"
    :tag-id="tagId"
    :scope="scope"
    :limit="limit"
    :header-link="headerLink"
  >
    <template #default="segmentSlotProps">
      <BasePaginatedSegmentContainer
        response-data-name="libraryTagData"
        :slot-props-data="segmentSlotProps"
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
      this.focus()
    },
    focus () {
      this.$refs
        .segment
        .focus()
    }
  }
}
</script>

<style lang="sass" scoped></style>
