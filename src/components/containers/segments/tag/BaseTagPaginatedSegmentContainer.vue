<template>
  <BaseTagSegmentContainer
    ref="segment"
    :tagName="tagName"
    :scope="scope"
    :limit="limit"
    :headerLink="headerLink"
  >
    <template #default="segmentSlotProps">
      <BasePaginatedSegmentContainer
        responseDataName="tagData"
        :slotPropsData="segmentSlotProps"
        :scope="scope"
        :limit="limit"
        :responsePageLimit="responsePageLimit"
        @focus="handleFocus"
      >
        <template #default="slotProps">
          <slot
            :[scope]="slotProps[scope]"
            :profileId="segmentSlotProps.profileId"
          ></slot>
        </template>
      </BasePaginatedSegmentContainer>
    </template>
  </BaseTagSegmentContainer>
</template>

<script>
import BaseTagSegmentContainer from './BaseTagSegmentContainer.vue'
import BasePaginatedSegmentContainer
  from '*/components/containers/segments/BasePaginatedSegmentContainer.vue'

export default {
  name: 'BaseTagPaginatedSegmentContainer',
  components: {
    BaseTagSegmentContainer,
    BasePaginatedSegmentContainer
  },
  props: {
    tagName: String,
    scope: String,
    limit: Number,
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

<style lang="sass" scoped></style>
