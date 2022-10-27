<template>
  <BaseProfileLibraryPageContainer
    ref="page"
    :profile-id="profileId"
    :scope="scope"
    :limit="limit"
    :query="query"
  >
    <template #default="pageSlotProps">
      <BasePaginatedPageContainer
        ref="pagination"
        :response-data="pageSlotProps.libraryData"
        :is-loading="pageSlotProps.isLoading"
        :error="pageSlotProps.error"
        :scope="scope"
        :limit="limit"
        :is-with-top-segment="isWithTopSegment"
        :is-with-view-change="isWithViewChange"
        :view-id="viewId"
      >
        <template #top>
          <SearchSection
            v-if="isWithSearch"
            :query="query"
            @submit="handleSearchSubmit"
            @clear="handleSearchClear"
          />
        </template>

        <template #default="slotProps">
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
import SearchSection
  from './BaseProfileLibraryPaginatedPageContainer/SearchSection.vue'
import paginatedPageMixin from '@/mixins/paginatedPageMixin'

export default {
  name: 'BaseProfileLibraryPaginatedPageContainer',
  components: {
    BaseProfileLibraryPageContainer,
    BasePaginatedPageContainer,
    SearchSection
  },
  mixins: [
    paginatedPageMixin
  ],
  props: {
    profileId: String,
    scope: String,
    limit: Number,
    isWithTopSegment: Boolean,
    isWithSearch: Boolean,
    isWithViewChange: Boolean,
    viewId: String
  },
  data () {
    return {
      query: ''
    }
  },
  watch: {
    query: 'handleQueryChange'
  },
  methods: {
    handleSearchSubmit (
      value
    ) {
      this.query = value
    },
    handleSearchClear () {
      this.query = ''
    },
    handleQueryChange () {
      this.reset()
    }
  }
}
</script>

<style lang="sass" scoped></style>
