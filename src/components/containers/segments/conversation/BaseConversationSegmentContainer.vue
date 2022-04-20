<template>
  <BaseSegmentContainer
    ref="segment"
    :response-data="conversationData"
    :is-loading="isLoading"
    :error="error"
    @refresh="handleRefresh"
  >
    <slot
      v-if="conversationData"
      :conversation-data="conversationData"
      :is-loading="isLoading"
      :error="error"
      :fetch-data="fetchData"
      :refresh="refresh"
    />
  </BaseSegmentContainer>
</template>

<script>
import BaseSegmentContainer
  from '*/components/containers/segments/BaseSegmentContainer.vue'
import getConversation from '*/helpers/actions/api/conversation/get'

export default {
  name: 'BaseConversationSegmentContainer',
  components: {
    BaseSegmentContainer
  },
  props: {
    conversationId: {
      type: String,
      required: true
    },
    scope: String,
    limit: Number
  },
  data () {
    return {
      isLoading: false,
      error: null,
      conversationData: null
    }
  },
  computed: {
    conversationArgs () {
      return {
        conversationId: this.conversationId,
        scope: this.scope,
        limit: this.limit
      }
    }
  },
  mounted () {
    this.fetchData()
  },
  methods: {
    getConversation,
    handleRefresh () {
      this.refresh()
    },
    fetchData (
      page
    ) {
      this.getConversation(
        {
          ...this.conversationArgs,
          page
        }
      )
    },
    refresh (
      page
    ) {
      this.fetchData(
        page
      )
    },
    focus () {
      this.$refs
        .segment
        .focus()
    }
  }
}
</script>

<style lang="sass" scoped></style>
