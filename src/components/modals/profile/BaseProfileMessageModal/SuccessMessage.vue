<template>
  <BaseMessage
    :header="headerText"
    :content="contentText"
    :link="conversationLink"
    is-content-link
    is-success
    @link-click="handleLinkClick"
  />
</template>

<script>
import BaseMessage from '@/components/messages/BaseMessage.vue'
import {
  main as formatConversationLink
} from '@/helpers/formatters/links/conversation'

export default {
  name: 'SuccessMessage',
  components: {
    BaseMessage
  },
  props: {
    conversationId: {
      type: Number,
      required: true
    }
  },
  emits: [
    'linkClick'
  ],
  computed: {
    headerText () {
      return this.$t(
        'message.sent.header'
      )
    },
    contentText () {
      return this.$t(
        'message.sent.content'
      )
    },
    conversationLink () {
      return formatConversationLink(
        {
          conversationId: this.conversationId
        }
      )
    }
  },
  methods: {
    handleLinkClick () {
      this.$emit(
        'linkClick'
      )
    }
  }
}
</script>

<style lang="sass" scoped></style>
