<template>
  <BaseConversationPaginatedSegmentContainer
    scope="messages"
    :conversationId="conversationId"
    :clientPageLimit="limit"
    :responsePageLimit="limit"
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
  from '@/containers/segments/conversation/BaseConversationPaginatedSegmentContainer.vue'
import BaseMessagesSimpleList
  from '@/lists/messages/BaseMessagesSimpleList.vue'

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
