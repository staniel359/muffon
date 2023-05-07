<template>
  <BaseConversationsPaginatedPageContainer
    :key="refreshKey"
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
import pageMixin from '@/mixins/pageMixin'
import {
  conversations as conversationsLimits
} from '@/helpers/data/limits'

export default {
  name: 'MainPage',
  components: {
    BaseConversationsPaginatedPageContainer,
    BaseConversationsSimpleList
  },
  mixins: [
    orderChangeMixin,
    pageMixin
  ],
  data () {
    return {
      limit:
        conversationsLimits.simple.large,
      scope: 'conversations',
      order: 'updatedDesc'
    }
  }
}
</script>

<style lang="sass" scoped></style>
