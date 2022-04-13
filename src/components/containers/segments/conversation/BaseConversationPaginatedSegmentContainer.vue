<template>
  <BaseConversationSegmentContainer
    ref="segment"
    :conversation-id="conversationId"
    :scope="scope"
    :limit="limit"
  >
    <template #default="segmentSlotProps">
      <BasePaginatedListContainer
        :response-data="segmentSlotProps.conversationData"
        :scope="scope"
        :limit="limit"
        :is-loading="segmentSlotProps.isLoading"
        :error="segmentSlotProps.error"
        @fetch-data="segmentSlotProps.fetchData"
        @refresh="segmentSlotProps.refresh"
        @focus="handleFocus"
      >
        <template #default="slotProps">
          <slot
            :[scope]="slotProps[scope]"
          />
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
      this.$refs
        .segment
        .focus()
    }
  }
}
</script>

<style lang="sass" scoped></style>
