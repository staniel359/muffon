<template>
  <BaseTrackPageContainer
    ref="page"
    :scope="scope"
    :limit="limit"
    :source-params="sourceParams"
  >
    <template
      #default="pageSlotProps"
    >
      <BasePaginatedPageContainer
        :response-data="pageSlotProps.trackData"
        :is-loading="pageSlotProps.isLoading"
        :error="pageSlotProps.error"
        :scope="scope"
        :limit="limit"
        :is-with-top-segment="isWithTopSegment"
        :is-with-top-second-segment="isWithTopSecondSegment"
        :is-with-play-button="isWithPlayButton"
        :is-with-view-change="isWithViewChange"
        :is-with-reload-button="isWithReloadButton"
        :view-id="viewId"
      >
        <template
          #topPlayButton
        >
          <slot
            name="topPlayButton"
          />
        </template>

        <template
          #default="slotProps"
        >
          <slot
            :[scope]="slotProps[scope]"
          />
        </template>
      </BasePaginatedPageContainer>
    </template>
  </BaseTrackPageContainer>
</template>

<script>
import BaseTrackPageContainer from './BaseTrackPageContainer.vue'
import BasePaginatedPageContainer
  from '@/components/containers/pages/BasePaginatedPageContainer.vue'
import paginatedPageMixin from '@/mixins/paginatedPageMixin'

export default {
  name: 'BaseTrackPaginatedPageContainer',
  components: {
    BaseTrackPageContainer,
    BasePaginatedPageContainer
  },
  mixins: [
    paginatedPageMixin
  ],
  props: {
    scope: String,
    limit: Number,
    sourceParams: Object,
    isWithTopSegment: Boolean,
    isWithViewChange: Boolean,
    isWithReloadButton: Boolean,
    viewId: String
  }
}
</script>

<style lang="sass" scoped></style>
