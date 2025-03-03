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
import formatConversationPageTab
  from '@/helpers/formatters/tabs/conversation'
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
      type: Number,
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
      return this.profileData?.nickname
    },
    profileData () {
      return this.conversationData?.profile
    },
    profileId () {
      return this.profileData?.id
    },
    tabData () {
      return formatConversationPageTab(
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
