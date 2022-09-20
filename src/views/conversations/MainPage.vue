<template>
  <BaseConversationsPageContainer
    ref="page"
    :limit="limit"
  >
    <template #default="pageSlotProps">
      <BasePaginatedPageContainer
        :response-data="pageSlotProps.conversationsData"
        :is-loading="pageSlotProps.isLoading"
        :error="pageSlotProps.error"
        :scope="scope"
        :limit="limit"
      >
        <template #default="slotProps">
          <BaseConversationsSimpleList
            :conversations="slotProps[scope]"
          />
        </template>
      </BasePaginatedPageContainer>
    </template>
  </BaseConversationsPageContainer>
</template>

<script>
import BaseConversationsPageContainer
  from '@/components/containers/pages/conversations/BaseConversationsPageContainer.vue'
import BasePaginatedPageContainer
  from '@/components/containers/pages/BasePaginatedPageContainer.vue'
import BaseConversationsSimpleList
  from '@/components/lists/conversations/BaseConversationsSimpleList.vue'
import paginatedPageMixin from '@/mixins/paginatedPageMixin'

export default {
  name: 'MainPage',
  components: {
    BaseConversationsPageContainer,
    BasePaginatedPageContainer,
    BaseConversationsSimpleList
  },
  mixins: [
    paginatedPageMixin
  ],
  data () {
    return {
      limit: 10,
      scope: 'conversations'
    }
  }
}
</script>

<style lang="sass" scoped></style>
