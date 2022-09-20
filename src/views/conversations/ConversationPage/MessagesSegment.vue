<template>
  <BasePaginatedSegmentContainer
    ref="segment"
    class="main-paginated-page-segment-container"
    :response-data="conversationData"
    :is-loading="isLoading"
    :error="error"
    :scope="scope"
    :limit="limit"
    @focus="handleFocus"
  >
    <template #default="slotProps">
      <BaseMessagesSimpleList
        :messages="slotProps[scope]"
      />
    </template>
  </BasePaginatedSegmentContainer>
</template>

<script>
import BasePaginatedSegmentContainer
  from '@/components/containers/segments/BasePaginatedSegmentContainer.vue'
import BaseMessagesSimpleList
  from '@/components/lists/messages/BaseMessagesSimpleList.vue'
import getConversation from '@/helpers/actions/api/conversation/get'
import paginatedSegmentMixin from '@/mixins/paginatedSegmentMixin'

export default {
  name: 'MessagesSegment',
  components: {
    BasePaginatedSegmentContainer,
    BaseMessagesSimpleList
  },
  mixins: [
    paginatedSegmentMixin
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
      isLoading: false,
      limit: 20,
      scope: 'messages'
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
    this.getData()
  },
  methods: {
    getConversation,
    getData (
      {
        page
      } = {}
    ) {
      this.getConversation(
        {
          ...this.conversationArgs,
          page
        }
      )
    }
  }
}
</script>

<style lang="sass" scoped></style>
