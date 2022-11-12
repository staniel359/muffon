<template>
  <BaseReleasesSegmentContainer
    ref="segment"
    :scope="scope"
    :limit="limit"
    :header-link="headerLink"
  >
    <template
      #default="segmentSlotProps"
    >
      <BasePaginatedSegmentContainer
        :response-data="segmentSlotProps.releasesData"
        :is-loading="segmentSlotProps.isLoading"
        :error="segmentSlotProps.error"
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
    responsePageLimit: Number,
    headerLink: Object
  }
}
</script>

<style lang="sass" scoped></style>
