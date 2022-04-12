<template>
  <BaseTrackPageContainer
    :scope="scope"
    :limit="limit"
  >
    <template #default="pageSlotProps">
      <BasePaginatedPageContainer
        responseDataName="trackData"
        :slotPropsData="pageSlotProps"
        :scope="scope"
        :limit="limit"
      >
        <template #default="slotProps">
          <slot
            :[scope]="slotProps[scope]"
            :profileId="pageSlotProps.profileId"
          ></slot>
        </template>
      </BasePaginatedPageContainer>
    </template>
  </BaseTrackPageContainer>
</template>

<script>
import BaseTrackPageContainer from './BaseTrackPageContainer.vue'
import BasePaginatedPageContainer
  from '*/components/containers/pages/BasePaginatedPageContainer.vue'

export default {
  name: 'BaseTrackPaginatedPageContainer',
  components: {
    BaseTrackPageContainer,
    BasePaginatedPageContainer
  },
  props: {
    scope: String,
    limit: Number
  }
}
</script>

<style lang="sass" scoped></style>
