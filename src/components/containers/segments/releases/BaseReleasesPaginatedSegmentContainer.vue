<template>
  <BaseReleasesSegmentContainer
    :scope="scope"
    :limit="limit"
  >
    <template
      #default="pageSlotProps"
    >
      <BasePaginatedSegmentContainer
        ref="segment"
        :response-data="pageSlotProps.releasesData"
        :is-loading="pageSlotProps.isLoading"
        :error="pageSlotProps.error"
        :scope="listScope"
        :limit="limit"
        :response-page-limit="responsePageLimit"
        @focus="handleFocus"
      >
        <template
          #default="slotProps"
        >
          <slot
            :[listScope]="slotProps[listScope]"
          />
        </template>
      </BasePaginatedSegmentContainer>
    </template>
  </BaseReleasesSegmentContainer>
</template>

<script>
import BaseReleasesSegmentContainer from './BaseReleasesSegmentContainer.vue'
import BasePaginatedSegmentContainer
  from '@/components/containers/segments/BasePaginatedSegmentContainer.vue'
import paginatedSegmentMixin from '@/mixins/paginatedSegmentMixin'

export default {
  name: 'BaseReleasesPaginatedSegmentContainer',
  components: {
    BaseReleasesSegmentContainer,
    BasePaginatedSegmentContainer
  },
  mixins: [
    paginatedSegmentMixin
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
