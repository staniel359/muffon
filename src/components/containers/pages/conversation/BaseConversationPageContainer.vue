<template>
  <BasePageContainer
    :isShowLoader="!conversationData"
    :isLoading="isLoading"
    :isError="!conversationData && !!error"
    :error="error"
    @refresh="handleRefresh"
  >
    <slot
      v-if="conversationData"
      :isLoading="isLoading"
      :error="error"
      :conversationData="conversationData"
      :profileId="profileIdFetched"
      :fetchData="fetchData"
      :handleRefresh="handleRefresh"
    ></slot>
  </BasePageContainer>
</template>

<script>
import BasePageContainer from '@/containers/pages/BasePageContainer.vue'
import navigationMixin from '*/mixins/navigationMixin'
import formatConversationsPageNavigation
  from '#/formatters/navigation/conversations'
import formatConversationsPageTab from '#/formatters/tabs/conversations'
import getConversation from '#/actions/api/conversation/get'

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
      return formatConversationsPageNavigation({
        conversationId: this.conversationId,
        profileNickname: this.profileNicknameFetched
      })
    },
    profileNicknameFetched () {
      return this.conversationData?.profile?.nickname
    },
    profileIdFetched () {
      return this.conversationData?.profile?.id?.toString()
    },
    tabData () {
      return formatConversationsPageTab({
        conversationId: this.conversationId,
        profileNickname: this.profileNicknameFetched
      })
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
    handleRefresh (page) {
      this.fetchData(page)
    },
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
