<template>
  <BaseConversationPaginatedSegmentContainer
    scope="messages"
    :conversationId="conversationId"
    :limit="limit"
  >
    <template #default="slotProps">
      <BaseMessagesSimpleList
        :messages="slotProps.messages"
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
      limit: 50
    }
  }
}
</script>

<style lang="sass" scoped></style>
