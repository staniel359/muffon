<template>
  <BaseConversationsPageContainer
    :limit="limit"
  >
    <template #default="pageSlotProps">
      <BasePaginatedPageContainer
        responseDataName="conversationsData"
        :slotPropsData="pageSlotProps"
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
  from '*/components/containers/pages/conversations/BaseConversationsPageContainer.vue'
import BasePaginatedPageContainer
  from '*/components/containers/pages/BasePaginatedPageContainer.vue'
import BaseConversationsSimpleList
  from '*/components/lists/conversations/BaseConversationsSimpleList.vue'

export default {
  name: 'MainPage',
  components: {
    BaseConversationsPageContainer,
    BasePaginatedPageContainer,
    BaseConversationsSimpleList
  },
  data () {
    return {
      limit: 10,
      scope: 'conversations'
    }
  }
}
</script>

<style lang="sass" scoped></style>
