<template>
  <BaseConversationSegmentContainer
    ref="segment"
    :conversationId="conversationId"
    :scope="scope"
    :limit="limit"
  >
    <template #default="segmentSlotProps">
      <BasePaginatedListContainer
        :responseData="segmentSlotProps.conversationData"
        :scope="scope"
        :limit="limit"
        :isLoading="segmentSlotProps.isLoading"
        :error="segmentSlotProps.error"
        @fetchData="segmentSlotProps.fetchData"
        @refresh="segmentSlotProps.refresh"
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
    limit: Number
  },
  methods: {
    handleFocus () {
      this.$refs.segment.focus()
    }
  }
}
</script>

<style lang="sass" scoped></style>
