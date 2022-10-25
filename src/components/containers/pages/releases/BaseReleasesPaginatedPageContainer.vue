<template>
  <BaseReleasesPageContainer
    ref="page"
    :scope="scope"
    :limit="limit"
  >
    <template #default="pageSlotProps">
      <BasePaginatedPageContainer
        :response-data="pageSlotProps.releasesData"
        :is-loading="pageSlotProps.isLoading"
        :error="pageSlotProps.error"
        :scope="listScope"
        :limit="limit"
        :response-page-limit="responsePageLimit"
        :is-with-top-segment="isWithTopSegment"
        :is-with-view-change="isWithViewChange"
        :view-id="viewId"
      >
        <template #default="slotProps">
          <slot
            :[listScope]="slotProps[listScope]"
          />
        </template>
      </BasePaginatedPageContainer>
    </template>
  </BaseReleasesPageContainer>
</template>

<script>
import BaseReleasesPageContainer from './BaseReleasesPageContainer.vue'
import BasePaginatedPageContainer
  from '@/components/containers/pages/BasePaginatedPageContainer.vue'
import paginatedPageMixin from '@/mixins/paginatedPageMixin'

export default {
  name: 'BaseReleasesPaginatedPageContainer',
  components: {
    BaseReleasesPageContainer,
    BasePaginatedPageContainer
  },
  mixins: [
    paginatedPageMixin
  ],
  props: {
    listScope: {
      type: String,
      required: true
    },
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
