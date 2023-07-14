<template>
  <BaseConversationPageContainer
    :key="refreshKey"
    :conversation-id="conversationId"
  >
    <template
      #default="slotProps"
    >
      <div
        :class="[
          'ui raised segments main-segments',
          'main-segment-container',
          'main-page-segment-container'
        ]"
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
      </div>
    </template>
  </BaseConversationPageContainer>
</template>

<script>
import BaseConversationPageContainer
  from '@/components/containers/pages/conversation/BaseConversationPageContainer.vue'
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
