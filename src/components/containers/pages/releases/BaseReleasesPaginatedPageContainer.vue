<template>
  <BaseReleasesPageContainer
    :scope="scope"
    :limit="limit"
  >
    <template #default="pageSlotProps">
      <BasePaginatedPageContainer
        response-data-name="releasesData"
        :slot-props-data="pageSlotProps"
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
  from '*/components/containers/pages/BasePaginatedPageContainer.vue'

export default {
  name: 'BaseReleasesPaginatedPageContainer',
  components: {
    BaseReleasesPageContainer,
    BasePaginatedPageContainer
  },
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
