<template>
  <BaseTopSegmentContainer
    ref="segment"
    :scope="scope"
    :limit="limit"
    :header-link="headerLink"
  >
    <template #default="segmentSlotProps">
      <BasePaginatedSegmentContainer
        response-data-name="topData"
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
  </BaseTopSegmentContainer>
</template>

<script>
import BaseTopSegmentContainer from './BaseTopSegmentContainer.vue'
import BasePaginatedSegmentContainer
  from '*/components/containers/segments/BasePaginatedSegmentContainer.vue'

export default {
  name: 'BaseTopPaginatedSegmentContainer',
  components: {
    BaseTopSegmentContainer,
    BasePaginatedSegmentContainer
  },
  props: {
    scope: String,
    limit: Number,
    headerLink: Object
  },
  methods: {
    handleFocus () {
      this.$refs
        .segment
        .focus()
    }
  }
}
</script>

<style lang="sass" scoped></style>
