<template>
  <BaseBookmarksPageContainer
    ref="page"
    :scope="scope"
    :limit="limit"
  >
    <template #default="pageSlotProps">
      <BasePaginatedPageContainer
        :response-data="pageSlotProps.bookmarksData"
        :is-loading="pageSlotProps.isLoading"
        :error="pageSlotProps.error"
        :scope="scope"
        :limit="limit"
      >
        <template #default="slotProps">
          <slot
            :[scope]="slotProps[scope]"
          />
        </template>
      </BasePaginatedPageContainer>
    </template>
  </BaseBookmarksPageContainer>
</template>

<script>
import BaseBookmarksPageContainer from './BaseBookmarksPageContainer.vue'
import BasePaginatedPageContainer
  from '*/components/containers/pages/BasePaginatedPageContainer.vue'
import paginatedPageMixin from '*/mixins/paginatedPageMixin'

export default {
  name: 'BaseBookmarksPaginatedPageContainer',
  components: {
    BaseBookmarksPageContainer,
    BasePaginatedPageContainer
  },
  mixins: [
    paginatedPageMixin
  ],
  props: {
    scope: String,
    limit: Number
  }
}
</script>

<style lang="sass" scoped></style>
