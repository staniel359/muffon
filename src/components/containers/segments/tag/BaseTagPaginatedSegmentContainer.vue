<template>
  <BaseTagSegmentContainer
    ref="segment"
    :tag-name="tagName"
    :scope="scope"
    :limit="limit"
    :header-link="headerLink"
  >
    <template #default="segmentSlotProps">
      <BasePaginatedSegmentContainer
        response-data-name="tagData"
        :slot-props-data="segmentSlotProps"
        :scope="scope"
        :limit="limit"
        :response-page-limit="responsePageLimit"
        @focus="handleFocus"
      >
        <template #default="slotProps">
          <slot
            :[scope]="slotProps[scope]"
            :profile-id="segmentSlotProps.profileId"
          />
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
      this.$refs
        .segment
        .focus()
    }
  }
}
</script>

<style lang="sass" scoped></style>
