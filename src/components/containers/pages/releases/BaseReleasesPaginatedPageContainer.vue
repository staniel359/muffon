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
    responsePageLimit: Number
  }
}
</script>

<style lang="sass" scoped></style>
