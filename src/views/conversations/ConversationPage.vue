<template>
  <BaseConversationPageContainer
    :conversation-id="conversationId"
  >
    <template #default="slotProps">
      <div
        :class="[
          'ui raised segments',
          'main-segment-container',
          'main-page-segment-container'
        ]"
      >
        <ProfileSegment
          :conversation-data="slotProps.conversationData"
        />

        <FormSegment
          :key="key"
          :profile-id="slotProps.profileId"
          @success="handleSuccess"
        />

        <MessagesSegment
          :key="key"
          :conversation-id="conversationId"
        />
      </div>
    </template>
  </BaseConversationPageContainer>
</template>

<script>
import BaseConversationPageContainer
  from '*/components/containers/pages/conversation/BaseConversationPageContainer.vue'
import ProfileSegment from './ConversationPage/ProfileSegment.vue'
import FormSegment from './ConversationPage/FormSegment.vue'
import MessagesSegment from './ConversationPage/MessagesSegment.vue'
import {
  generateKey
} from '*/helpers/utils'

export default {
  name: 'ConversationPage',
  components: {
    BaseConversationPageContainer,
    ProfileSegment,
    FormSegment,
    MessagesSegment
  },
  props: {
    conversationId: String
  },
  data () {
    return {
      key: null
    }
  },
  methods: {
    handleSuccess () {
      this.key = generateKey()
    }
  }
}
</script>

<style lang="sass" scoped></style>
