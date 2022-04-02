<template>
  <BaseTagSegmentContainer
    ref="segment"
    :tagName="tagName"
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
          :responseData="segmentSlotProps.tagData"
          :scope="scope"
          :clientPageLimit="clientPageLimit"
          :responsePageLimit="responsePageLimit"
          @fetchData="segmentSlotProps.fetchData"
          @refresh="segmentSlotProps.handleRefresh"
          @focus="handleFocus"
        >
          <template #default="slotProps">
            <slot
              :[scope]="slotProps[scope]"
              :profileId="segmentSlotProps.profileId"
            ></slot>
          </template>
        </BasePaginatedListContainer>
      </BaseSegmentContainer>
    </template>
  </BaseTagSegmentContainer>
</template>

<script>
import BaseTagSegmentContainer from './BaseTagSegmentContainer.vue'
import BaseSegmentContainer
  from '*/components/containers/segments/BaseSegmentContainer.vue'
import BasePaginatedListContainer
  from '*/components/containers/lists/BasePaginatedListContainer.vue'

export default {
  name: 'BaseTagPaginatedSegmentContainer',
  components: {
    BaseTagSegmentContainer,
    BaseSegmentContainer,
    BasePaginatedListContainer
  },
  props: {
    tagName: String,
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
