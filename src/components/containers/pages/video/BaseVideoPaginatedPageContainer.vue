<template>
  <BaseVideoPageContainer
    ref="page"
    :video-id="videoId"
    :scope="scope"
    :limit="limit"
  >
    <template
      #default="pageSlotProps"
    >
      <BasePaginatedPageContainer
        :response-data="pageSlotProps.videoData"
        :is-loading="pageSlotProps.isLoading"
        :error="pageSlotProps.error"
        :scope="scope"
        :limit="limit"
        :response-page-limit="responsePageLimit"
        :is-with-top-segment="isWithTopSegment"
        :is-with-view-change="isWithViewChange"
        :view-id="viewId"
        :is-pagination-simple="isPaginationSimple"
      >
        <template
          #default="slotProps"
        >
          <slot
            :[scope]="slotProps[scope]"
          />
        </template>
      </BasePaginatedPageContainer>
    </template>
  </BaseVideoPageContainer>
</template>

<script>
import BaseVideoPageContainer from './BaseVideoPageContainer.vue'
import BasePaginatedPageContainer
  from '@/components/containers/pages/BasePaginatedPageContainer.vue'
import paginatedPageMixin from '@/mixins/paginatedPageMixin'

export default {
  name: 'BaseVideoPaginatedPageContainer',
  components: {
    BaseVideoPageContainer,
    BasePaginatedPageContainer
  },
  mixins: [
    paginatedPageMixin
  ],
  props: {
    videoId: String,
    scope: String,
    limit: Number,
    isWithTopSegment: Boolean,
    isWithViewChange: Boolean,
    viewId: String,
    responsePageLimit: Number,
    isPaginationSimple: Boolean
  }
}
</script>

<style lang="sass" scoped></style>
