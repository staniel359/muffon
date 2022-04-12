<template>
  <BaseBookmarksSegmentContainer
    ref="segment"
    :scope="scope"
    :limit="limit"
    :headerLink="headerLink"
  >
    <template #default="segmentSlotProps">
      <BasePaginatedSegmentContainer
        responseDataName="bookmarksData"
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
  </BaseBookmarksSegmentContainer>
</template>

<script>
import BaseBookmarksSegmentContainer
  from './BaseBookmarksSegmentContainer.vue'
import BasePaginatedSegmentContainer
  from '*/components/containers/segments/BasePaginatedSegmentContainer.vue'

export default {
  name: 'BaseBookmarksPaginatedSegmentContainer',
  components: {
    BaseBookmarksSegmentContainer,
    BasePaginatedSegmentContainer
  },
  props: {
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
