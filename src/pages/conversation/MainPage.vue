<template>
  <BaseConversationPageContainer
    :key="refreshKey"
    :conversation-id="conversationId"
  >
    <template
      #default="slotProps"
    >
      <BaseSegmentsContainer
        class="main-page-segment-container"
      >
        <ProfileSegment
          :conversation-data="slotProps.conversationData"
        />

        <FormSegment
          v-if="slotProps.profileId"
          :key="key"
          :profile-id="slotProps.profileId"
          @success="handleSuccess"
        />

        <MessagesSegment
          :key="key"
          :conversation-id="conversationId"
        />
      </BaseSegmentsContainer>
    </template>
  </BaseConversationPageContainer>
</template>

<script>
import BaseConversationPageContainer
  from '@/components/containers/pages/conversation/BaseConversationPageContainer.vue'
import BaseSegmentsContainer
  from '@/components/containers/segments/BaseSegmentsContainer.vue'
import ProfileSegment from './MainPage/ProfileSegment.vue'
import FormSegment from './MainPage/FormSegment.vue'
import MessagesSegment from './MainPage/MessagesSegment.vue'
import {
  generateKey
} from '@/helpers/utils'
import pageMixin from '@/mixins/pageMixin'

export default {
  name: 'MainPage',
  components: {
    BaseConversationPageContainer,
    BaseSegmentsContainer,
    ProfileSegment,
    FormSegment,
    MessagesSegment
  },
  mixins: [
    pageMixin
  ],
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
