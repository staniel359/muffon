<template>
  <BaseConversationsPageContainer
    :limit="limit"
  >
    <template #default="pageSlotProps">
      <BaseSegmentContainer
        :class="[
          'raised',
          'main-segment-container',
          'main-page-segment-container',
          'main-paginated-page-segment-container'
        ]"
        :isLoading="pageSlotProps.isLoading"
      >
        <BasePaginatedListContainer
          ref="paginatedContainer"
          scope="conversations"
          :isLoading="pageSlotProps.isLoading"
          :error="pageSlotProps.error"
          :responseData="pageSlotProps.conversationsData"
          :limit="limit"
          @focus="handleFocus"
          @fetchData="pageSlotProps.fetchData"
          @refresh="pageSlotProps.handleRefresh"
        >
          <template #default="slotProps">
            <BaseConversationsSimpleList
              :conversations="slotProps.conversations"
            />
          </template>
        </BasePaginatedListContainer>
      </BaseSegmentContainer>
    </template>
  </BaseConversationsPageContainer>
</template>

<script>
import BaseConversationsPageContainer
  from '*/components/containers/pages/conversations/BaseConversationsPageContainer.vue'
import BaseSegmentContainer
  from '*/components/containers/segments/BaseSegmentContainer.vue'
import BasePaginatedListContainer
  from '*/components/containers/lists/BasePaginatedListContainer.vue'
import BaseConversationsSimpleList
  from '*/components/lists/conversations/BaseConversationsSimpleList.vue'

export default {
  name: 'MainPage',
  components: {
    BaseConversationsPageContainer,
    BaseSegmentContainer,
    BasePaginatedListContainer,
    BaseConversationsSimpleList
  },
  data () {
    return {
      limit: 50
    }
  },
  methods: {
    handleFocus () {
      window.scrollTo(0, 0)
    }
  }
}
</script>

<style lang="sass" scoped></style>
