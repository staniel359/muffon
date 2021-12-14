<template>
  <BaseMessage
    class="success"
    :icons="['check']"
    :header="headerText"
    :content="contentText"
    :link="conversationLink"
    isContentLink
    @linkClick="handleLinkClick"
  />
</template>

<script>
import BaseMessage from '@/messages/BaseMessage.vue'
import {
  conversation as formatConversationLink
} from '#/formatters/links/conversations'

export default {
  name: 'SuccessMessage',
  components: {
    BaseMessage
  },
  props: {
    conversationId: {
      type: String,
      required: true
    }
  },
  emits: [
    'linkClick'
  ],
  computed: {
    headerText () {
      return this.$t(
        'shared.message.sent.header'
      )
    },
    contentText () {
      return this.$t(
        'shared.message.sent.content'
      )
    },
    conversationLink () {
      return formatConversationLink({
        conversationId: this.conversationId
      })
    }
  },
  methods: {
    handleLinkClick () {
      this.$emit('linkClick')
    }
  }
}
</script>

<style lang="sass" scoped></style>
