<template>
  <BaseBookmarksPageContainer
    :scope="scope"
    :limit="limit"
  >
    <template #default="pageSlotProps">
      <BasePaginatedPageContainer
        responseDataName="bookmarksData"
        :slotPropsData="pageSlotProps"
        :scope="scope"
        :limit="limit"
      >
        <template #default="slotProps">
          <slot
            :[scope]="slotProps[scope]"
          ></slot>
        </template>
      </BasePaginatedPageContainer>
    </template>
  </BaseBookmarksPageContainer>
</template>

<script>
import BaseBookmarksPageContainer from './BaseBookmarksPageContainer.vue'
import BasePaginatedPageContainer
  from '*/components/containers/pages/BasePaginatedPageContainer.vue'

export default {
  name: 'BaseBookmarksPaginatedPageContainer',
  components: {
    BaseBookmarksPageContainer,
    BasePaginatedPageContainer
  },
  props: {
    scope: String,
    limit: Number
  }
}
</script>

<style lang="sass" scoped></style>
