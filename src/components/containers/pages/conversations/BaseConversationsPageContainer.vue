<template>
  <BasePageContainer
    :responseData="conversationsData"
    :isLoading="isLoading"
    :error="error"
  >
    <slot
      :conversationsData="conversationsData"
      :isLoading="isLoading"
      :error="error"
      :fetchData="fetchData"
      :handleRefresh="handleRefresh"
    ></slot>
  </BasePageContainer>
</template>

<script>
import BasePageContainer
  from '*/components/containers/pages/BasePageContainer.vue'
import navigationMixin from '*/mixins/navigationMixin'
import {
  conversations as formatConversationsPageNavigation
} from '*/helpers/formatters/navigation'
import formatConversationsPageTab
  from '*/helpers/formatters/tabs/conversations'
import getConversations from '*/helpers/actions/api/conversations/get'

export default {
  name: 'BaseConversationsPageContainer',
  components: {
    BasePageContainer
  },
  mixins: [
    navigationMixin
  ],
  props: {
    limit: Number
  },
  data () {
    return {
      conversationsData: null,
      error: null,
      isLoading: false
    }
  },
  computed: {
    navigationSections () {
      return formatConversationsPageNavigation()
    },
    tabData () {
      return formatConversationsPageTab()
    },
    conversationsArgs () {
      return {
        limit: this.limit
      }
    }
  },
  mounted () {
    this.setNavigation()

    this.fetchData()
  },
  methods: {
    handleRefresh (page) {
      this.fetchData(page)
    },
    getConversations,
    fetchData (page) {
      this.getConversations({
        ...this.conversationsArgs,
        page
      })
    }
  }
}
</script>

<style lang="sass" scoped></style>
