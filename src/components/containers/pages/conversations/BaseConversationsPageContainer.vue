<template>
  <BasePageContainer
    :isShowLoader="!conversationsData"
    :isLoading="isLoading"
    :isError="!conversationsData && !!error"
    :error="error"
    @refresh="handleRefresh"
  >
    <slot
      v-if="conversationsData"
      :isLoading="isLoading"
      :error="error"
      :conversationsData="conversationsData"
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
import fetchConversationsData from '#/actions/api/conversations/fetchData'

export default {
  name: 'BaseConversationsPageContainer',
  components: {
    BasePageContainer
  },
  mixins: [
    navigationMixin
  ],
  props: {
    responsePageLimit: Number
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
    conversationsDataArgs () {
      return {
        limit: this.responsePageLimit
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
    fetchConversationsData,
    fetchData (page) {
      this.fetchConversationsData({
        ...this.conversationsDataArgs,
        page
      })
    }
  }
}
</script>

<style lang="sass" scoped></style>
