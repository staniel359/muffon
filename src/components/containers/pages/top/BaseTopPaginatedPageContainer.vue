<template>
  <BaseTopPageContainer
    :scope="scope"
    :limit="limit"
  >
    <template #default="pageSlotProps">
      <BasePaginatedPageContainer
        response-data-name="topData"
        :slot-props-data="pageSlotProps"
        :scope="scope"
        :limit="limit"
        :is-with-view-change="isWithViewChange"
        :view-index="viewIndex"
      >
        <template #default="slotProps">
          <slot
            :[scope]="slotProps[scope]"
          />
        </template>
      </BasePaginatedPageContainer>
    </template>
  </BaseTopPageContainer>
</template>

<script>
import BaseTopPageContainer from './BaseTopPageContainer.vue'
import BasePaginatedPageContainer
  from '*/components/containers/pages/BasePaginatedPageContainer.vue'

export default {
  name: 'BaseTopPaginatedPageContainer',
  components: {
    BaseTopPageContainer,
    BasePaginatedPageContainer
  },
  props: {
    scope: String,
    limit: Number,
    isWithViewChange: Boolean,
    viewIndex: Number
  }
}
</script>

<style lang="sass" scoped></style>
