<template>
  <BasePageContainer
    :responseData="conversationData"
    :isLoading="isLoading"
    :error="error"
  >
    <slot
      :conversationData="conversationData"
      :profileId="profileIdFetched"
    ></slot>
  </BasePageContainer>
</template>

<script>
import BasePageContainer
  from '*/components/containers/pages/BasePageContainer.vue'
import navigationMixin from '*/mixins/navigationMixin'
import formatConversationPageNavigation
  from '*/helpers/formatters/navigation/conversation'
import formatConversationsPageTab
  from '*/helpers/formatters/tabs/conversations'
import getConversation from '*/helpers/actions/api/conversation/get'

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
        profileNickname: this.profileNicknameFetched
      }
    },
    profileNicknameFetched () {
      return this.conversationData?.profile?.nickname
    },
    profileIdFetched () {
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
    this.fetchData()
  },
  methods: {
    getConversation,
    fetchData (page) {
      this.getConversation({
        ...this.conversationArgs,
        page
      })
    }
  }
}
</script>

<style lang="sass" scoped></style>
