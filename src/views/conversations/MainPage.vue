<template>
  <BaseConversationsPaginatedPageContainer
    model="conversation"
    :scope="scope"
    :limit="limit"
    :order="order"
    is-with-top-segment
    is-with-order-change
  >
    <template
      #default="slotProps"
    >
      <BaseConversationsSimpleList
        :conversations="slotProps[scope]"
      />
    </template>
  </BaseConversationsPaginatedPageContainer>
</template>

<script>
import BaseConversationsPaginatedPageContainer
  from '@/components/containers/pages/conversations/BaseConversationsPaginatedPageContainer.vue'
import BaseConversationsSimpleList
  from '@/components/lists/conversations/BaseConversationsSimpleList.vue'
import orderChangeMixin from '@/mixins/orderChangeMixin'

export default {
  name: 'MainPage',
  components: {
    BaseConversationsPaginatedPageContainer,
    BaseConversationsSimpleList
  },
  mixins: [
    orderChangeMixin
  ],
  data () {
    return {
      limit: 10,
      scope: 'conversations',
      order: 'updatedDesc'
    }
  }
}
</script>

<style lang="sass" scoped></style>
