<template>
  <BaseSegmentContainer
    ref="segment"
    :isLoading="isLoading"
  >
    <slot
      :isLoading="isLoading"
      :error="error"
      :conversationData="conversationData"
      :fetchData="fetchData"
      :handleRefresh="handleRefresh"
    ></slot>
  </BaseSegmentContainer>
</template>

<script>
import BaseSegmentContainer
  from '@/containers/segments/BaseSegmentContainer.vue'
import fetchConversationData from '#/actions/api/conversation/fetchData'

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
    responsePageLimit: Number
  },
  data () {
    return {
      isLoading: false,
      error: null,
      conversationData: null
    }
  },
  computed: {
    conversationDataArgs () {
      return {
        conversationId: this.conversationId,
        scope: this.scope,
        limit: this.responsePageLimit
      }
    }
  },
  mounted () {
    this.fetchData()
  },
  methods: {
    handleRefresh (page) {
      this.fetchData(page)
    },
    fetchConversationData,
    fetchData (page) {
      this.fetchConversationData({
        ...this.conversationDataArgs,
        page
      })
    },
    focus () {
      this.$nextTick(() => {
        this.$refs.segment.focus()
      })
    }
  }
}
</script>

<style lang="sass" scoped></style>
