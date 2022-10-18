<template>
  <BaseVideoSegmentContainer
    ref="segment"
    :video-id="videoId"
    :scope="scope"
    :limit="limit"
    :header-link="headerLink"
  >
    <template #default="pageSlotProps">
      <BasePaginatedSegmentContainer
        :response-data="pageSlotProps.videoData"
        :is-loading="pageSlotProps.isLoading"
        :error="pageSlotProps.error"
        :scope="scope"
        :limit="limit"
        :client-page-limit="clientPageLimit"
        :is-change-transparency="false"
        :is-pagination-simple="isPaginationSimple"
        @focus="handleFocus"
      >
        <template #default="slotProps">
          <slot
            :[scope]="slotProps[scope]"
          />
        </template>
      </BasePaginatedSegmentContainer>
    </template>
  </BaseVideoSegmentContainer>
</template>

<script>
import BaseVideoSegmentContainer
  from '@/components/containers/segments/video/BaseVideoSegmentContainer.vue'
import BasePaginatedSegmentContainer
  from '@/components/containers/segments/BasePaginatedSegmentContainer.vue'
import paginatedSegmentMixin from '@/mixins/paginatedSegmentMixin'

export default {
  name: 'BaseVideoPaginatedSegmentContainer',
  components: {
    BaseVideoSegmentContainer,
    BasePaginatedSegmentContainer
  },
  mixins: [
    paginatedSegmentMixin
  ],
  props: {
    videoId: String,
    scope: String,
    limit: Number,
    clientPageLimit: Number,
    headerLink: Object,
    isPaginationSimple: Boolean
  }
}
</script>

<style lang="sass" scoped></style>
