<template>
  <BaseConversationSegmentContainer
    ref="segment"
    :conversationId="conversationId"
    :scope="scope"
    :responsePageLimit="responsePageLimit"
  >
    <template #default="segmentSlotProps">
      <BasePaginatedListContainer
        :isLoading="segmentSlotProps.isLoading"
        :error="segmentSlotProps.error"
        :responseData="segmentSlotProps.conversationData"
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
          ></slot>
        </template>
      </BasePaginatedListContainer>
    </template>
  </BaseConversationSegmentContainer>
</template>

<script>
import BaseConversationSegmentContainer
  from './BaseConversationSegmentContainer.vue'
import BasePaginatedListContainer
  from '*/components/containers/lists/BasePaginatedListContainer.vue'

export default {
  name: 'BaseConversationPaginatedSegmentContainer',
  components: {
    BaseConversationSegmentContainer,
    BasePaginatedListContainer
  },
  props: {
    conversationId: String,
    scope: String,
    clientPageLimit: Number,
    responsePageLimit: Number
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
