<template>
  <BasePageContainer
    :response-data="conversationsData"
    :is-loading="isLoading"
    :error="error"
  >
    <slot
      :conversations-data="conversationsData"
      :is-loading="isLoading"
      :error="error"
    />
  </BasePageContainer>
</template>

<script>
import BasePageContainer
  from '@/components/containers/pages/BasePageContainer.vue'
import navigationMixin from '@/mixins/navigationMixin'
import {
  conversations as formatConversationsPageNavigation
} from '@/helpers/formatters/navigation'
import formatConversationsPageTab
  from '@/helpers/formatters/tabs/conversations'
import getConversations from '@/helpers/actions/api/conversations/get'

export default {
  name: 'BaseConversationsPageContainer',
  components: {
    BasePageContainer
  },
  mixins: [
    navigationMixin
  ],
  props: {
    limit: Number,
    order: String
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
        limit: this.limit,
        order: this.order
      }
    }
  },
  watch: {
    conversationsData: 'handleNavigationDataChange'
  },
  mounted () {
    this.getData()
  },
  methods: {
    getConversations,
    getData (
      {
        page
      } = {}
    ) {
      this.getConversations(
        {
          ...this.conversationsArgs,
          page
        }
      )
    }
  }
}
</script>

<style lang="sass" scoped></style>
