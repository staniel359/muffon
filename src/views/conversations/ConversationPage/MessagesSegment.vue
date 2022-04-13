<template>
  <BaseConversationPaginatedSegmentContainer
    class="main-paginated-page-segment-container"
    :conversation-id="conversationId"
    :scope="scope"
    :limit="limit"
  >
    <template #default="slotProps">
      <BaseMessagesSimpleList
        :messages="slotProps[scope]"
      />
    </template>
  </BaseConversationPaginatedSegmentContainer>
</template>

<script>
import BaseConversationPaginatedSegmentContainer
  from '*/components/containers/segments/conversation/BaseConversationPaginatedSegmentContainer.vue'
import BaseMessagesSimpleList
  from '*/components/lists/messages/BaseMessagesSimpleList.vue'

export default {
  name: 'MessagesSegment',
  components: {
    BaseConversationPaginatedSegmentContainer,
    BaseMessagesSimpleList
  },
  props: {
    conversationId: String
  },
  data () {
    return {
      limit: 20,
      scope: 'messages'
    }
  }
}
</script>

<style lang="sass" scoped></style>
