<template>
  <BaseLinkContainer
    class="item conversation-item"
    :link="conversationLink"
  >
    <div class="content">
      <OtherProfileSection
        :other-profile-data="otherProfileData"
      />

      <LastMessageSegment
        :last-message-data="lastMessageData"
      />
    </div>
  </BaseLinkContainer>
</template>

<script>
import BaseLinkContainer
  from '@/components/containers/links/BaseLinkContainer.vue'
import OtherProfileSection from './ConversationItem/OtherProfileSection.vue'
import LastMessageSegment from './ConversationItem/LastMessageSegment.vue'
import {
  main as formatConversationLink
} from '@/helpers/formatters/links/conversation'

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
      return formatConversationLink(
        {
          conversationId: this.conversationId
        }
      )
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
.conversation-item
  padding: 2rem !important
</style>
