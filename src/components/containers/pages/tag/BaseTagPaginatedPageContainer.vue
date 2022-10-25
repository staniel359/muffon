<template>
  <BaseTagPageContainer
    ref="page"
    :tag-name="tagName"
    :scope="scope"
    :limit="limit"
  >
    <template #default="pageSlotProps">
      <BasePaginatedPageContainer
        :response-data="pageSlotProps.tagData"
        :is-loading="pageSlotProps.isLoading"
        :error="pageSlotProps.error"
        :scope="scope"
        :limit="limit"
        :response-page-limit="responsePageLimit"
        :is-with-top-segment="isWithTopSegment"
        :is-with-view-change="isWithViewChange"
        :view-id="viewId"
      >
        <template #default="slotProps">
          <slot
            :[scope]="slotProps[scope]"
          />
        </template>
      </BasePaginatedPageContainer>
    </template>
  </BaseTagPageContainer>
</template>

<script>
import BaseTagPageContainer from './BaseTagPageContainer.vue'
import BasePaginatedPageContainer
  from '@/components/containers/pages/BasePaginatedPageContainer.vue'
import paginatedPageMixin from '@/mixins/paginatedPageMixin'

export default {
  name: 'BaseTagPaginatedPageContainer',
  components: {
    BaseTagPageContainer,
    BasePaginatedPageContainer
  },
  mixins: [
    paginatedPageMixin
  ],
  props: {
    tagName: String,
    scope: String,
    limit: Number,
    responsePageLimit: Number,
    isWithTopSegment: Boolean,
    isWithViewChange: Boolean,
    viewId: String
  }
}
</script>

<style lang="sass" scoped></style>
