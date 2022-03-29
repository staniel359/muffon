<template>
  <BaseLinkContainer
    class="item conversation-item"
    :link="conversationLink"
  >
    <OtherProfileSection
      :otherProfileData="otherProfileData"
    />

    <LastMessageSegment
      :lastMessageData="lastMessageData"
    />
  </BaseLinkContainer>
</template>

<script>
import BaseLinkContainer
  from '*/components/containers/links/BaseLinkContainer.vue'
import OtherProfileSection from './ConversationItem/OtherProfileSection.vue'
import LastMessageSegment from './ConversationItem/LastMessageSegment.vue'
import {
  conversation as formatConversationLink
} from '*/helpers/formatters/links/conversations'

export default {
  name: 'ConversationItem',
  components: {
    BaseLinkContainer,
    OtherProfileSection,
    LastMessageSegment
  },
  props: {
    conversationData: {
      type: Object,
      required: true
    }
  },
  computed: {
    conversationLink () {
      return formatConversationLink({
        conversationId: this.conversationId
      })
    },
    conversationId () {
      return this.conversationData.id
    },
    otherProfileData () {
      return this.conversationData.other_profile
    },
    lastMessageData () {
      return this.conversationData.last_message
    }
  }
}
</script>

<style lang="sass" scoped>
.ui.selection.list
  & > .item.conversation-item
    padding: 1em !important
</style>
