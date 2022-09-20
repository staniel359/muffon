<template>
  <BasePageContainer
    :response-data="conversationData"
    :is-loading="isLoading"
    :error="error"
  >
    <slot
      :conversation-data="conversationData"
      :profile-id="profileId"
    />
  </BasePageContainer>
</template>

<script>
import BasePageContainer
  from '@/components/containers/pages/BasePageContainer.vue'
import navigationMixin from '@/mixins/navigationMixin'
import formatConversationPageNavigation
  from '@/helpers/formatters/navigation/conversation'
import formatConversationsPageTab
  from '@/helpers/formatters/tabs/conversations'
import getConversation from '@/helpers/actions/api/conversation/get'

export default {
  name: 'BaseConversationPageContainer',
  components: {
    BasePageContainer
  },
  mixins: [
    navigationMixin
  ],
  props: {
    conversationId: {
      type: String,
      required: true
    }
  },
  data () {
    return {
      conversationData: null,
      error: null,
      isLoading: false
    }
  },
  computed: {
    navigationSections () {
      return formatConversationPageNavigation(
        this.navigationData
      )
    },
    navigationData () {
      return {
        conversationId: this.conversationId,
        profileNickname: this.profileNickname
      }
    },
    profileNickname () {
      return this.conversationData?.profile?.nickname
    },
    profileId () {
      return this.conversationData?.profile?.id?.toString()
    },
    tabData () {
      return formatConversationsPageTab(
        this.navigationData
      )
    },
    conversationArgs () {
      return {
        conversationId: this.conversationId
      }
    }
  },
  watch: {
    conversationData: 'handleNavigationDataChange'
  },
  mounted () {
    this.getData()
  },
  methods: {
    getConversation,
    getData () {
      this.getConversation(
        this.conversationArgs
      )
    }
  }
}
</script>

<style lang="sass" scoped></style>
