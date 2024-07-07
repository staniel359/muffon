<template>
  <BaseProfileLibraryPageContainer
    ref="page"
    :profile-id="profileId"
    :scope="scope"
    :limit="limit"
    :order="order"
    :query="query"
  >
    <template
      #default="pageSlotProps"
    >
      <BasePaginatedPageContainer
        ref="pagination"
        :response-data="pageSlotProps.libraryData"
        :is-loading="pageSlotProps.isLoading"
        :error="pageSlotProps.error"
        :scope="scope"
        :limit="limit"
        :order="order"
        :model="model"
        :is-with-top-segment="isWithTopSegment"
        :is-with-top-second-segment="isWithTopSecondSegment"
        :is-with-play-button="isWithPlayButton"
        :is-with-order-change="isWithOrderChange"
        :is-with-view-change="isWithViewChange"
        :is-with-reload-button="isWithReloadButton"
        :view-id="viewId"
      >
        <template
          #top
        >
          <BaseSearchSection
            v-if="isWithSearch"
            scope="library"
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
            :top-tracks-count="pageSlotProps.topTracksCount"
            :top-albums-count="pageSlotProps.topAlbumsCount"
          />
        </template>
      </BasePaginatedPageContainer>
    </template>
  </BaseProfileLibraryPageContainer>
</template>

<script>
import BaseProfileLibraryPageContainer
  from './BaseProfileLibraryPageContainer.vue'
import BasePaginatedPageContainer
  from '@/components/containers/pages/BasePaginatedPageContainer.vue'
import paginatedPageMixin from '@/mixins/paginatedPageMixin'
import searchablePageMixin from '@/mixins/searchablePageMixin'

export default {
  name: 'BaseProfileLibraryPaginatedPageContainer',
  components: {
    BaseProfileLibraryPageContainer,
    BasePaginatedPageContainer
  },
  mixins: [
    paginatedPageMixin,
    searchablePageMixin
  ],
  props: {
    profileId: String,
    scope: String,
    limit: Number,
    order: String,
    model: String,
    isWithTopSegment: Boolean,
    isWithOrderChange: Boolean,
    isWithViewChange: Boolean,
    isWithReloadButton: Boolean,
    viewId: String
  }
}
</script>

<style lang="sass" scoped></style>
