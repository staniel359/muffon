<template>
  <BaseSavedTracksPageContainer
    ref="page"
    :order="order"
    :query="query"
  >
    <template
      #default="pageSlotProps"
    >
      <BasePaginatedPageContainer
        ref="pagination"
        :response-data="pageSlotProps.savedTracksData"
        :is-loading="pageSlotProps.isLoading"
        :error="pageSlotProps.error"
        :scope="scope"
        :limit="limit"
        :response-page-limit="pageSlotProps.responsePageLimit"
        :order="order"
        :model="model"
        :is-with-top-segment="isWithTopSegment"
        :is-with-top-second-segment="isWithTopSecondSegment"
        :is-with-play-button="isWithPlayButton"
        :is-with-order-change="isWithOrderChange"
        :is-with-reload-button="isWithReloadButton"
      >
        <template
          #top
        >
          <BaseSearchSection
            v-if="isWithSearch"
            scope="savedTracks"
            :query="query"
            @submit="handleSearchSubmit"
            @clear-button-click="handleSearchClearButtonClick"
          />
        </template>

        <template
          #topPlayButton
        >
          <slot
            name="topPlayButton"
            :query="query"
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
  </BaseSavedTracksPageContainer>
</template>

<script>
import BaseSavedTracksPageContainer from './BaseSavedTracksPageContainer.vue'
import BasePaginatedPageContainer
  from '@/components/containers/pages/BasePaginatedPageContainer.vue'
import paginatedPageMixin from '@/mixins/paginatedPageMixin'
import searchablePageMixin from '@/mixins/searchablePageMixin'

export default {
  name: 'BaseSavedTracksPaginatedPageContainer',
  components: {
    BaseSavedTracksPageContainer,
    BasePaginatedPageContainer
  },
  mixins: [
    paginatedPageMixin,
    searchablePageMixin
  ],
  props: {
    scope: {
      type: String,
      required: true
    },
    limit: Number,
    order: String,
    model: String,
    isWithTopSegment: Boolean,
    isWithOrderChange: Boolean,
    isWithReloadButton: Boolean
  }
}
</script>

<style lang="sass" scoped></style>
