<template>
  <div class="main-paginated-list-container">
    <ContentContainer
      v-show="isRenderContent"
      :key="contentKey"
      :client-page-collection="clientPageCollection"
      :scope="scope"
      :text-scope="textScope"
      :error="error"
      @refresh="handleRefresh"
    >
      <template
        #default="slotProps"
      >
        <slot
          :[scope]="slotProps[scope]"
        />
      </template>
    </ContentContainer>

    <PaginationSection
      v-if="isRenderPagination"
      :is-loading="isLoading"
      :is-error="!!error"
      :client-page="clientPage"
      :total-pages="clientTotalPages"
      :is-first-page="isFirstClientPage"
      :is-last-page="isLastResponsePage"
      is-simple
      @page-click="handlePageClick"
      @page-select="handlePageSelect"
      @previous-page-click="handlePreviousPageClick"
      @next-page-click="handleNextPageClick"
    />
  </div>
</template>

<script>
import ContentContainer from './ContentContainer.vue'
import PaginationSection from './PaginationSection.vue'
import paginatedListMixin from '@/mixins/paginatedListMixin'

export default {
  name: 'BasePaginatedSimpleListContainer',
  components: {
    ContentContainer,
    PaginationSection
  },
  mixins: [
    paginatedListMixin
  ],
  computed: {
    isResponsePageable () {
      return (
        !!this.responseNextPage || (
          this.clientPage > 1
        )
      )
    },
    responseTotalPages () {
      return (
        this.responsePageCollectionLength ? Infinity : 0
      )
    },
    responsePageLimitComputed () {
      return (
        this.responsePageCollectionLength ||
          this.limit
      )
    },
    clientStartPage () {
      return this.clientPage
    },
    responseOffset () {
      return this.rawCollection.length
    },
    requestPage () {
      return this.responseNextPage
    },
    isLastResponsePage () {
      return !(
        this.responseNextPage ||
          this.newClientNextPageCollection
      )
    },
    newClientNextPageCollection () {
      return this.clientCollectionPaginated[
        this.clientNextPage
      ]
    },
    isFocus () {
      return this.isFocusable
    },
    isCollectionFull () {
      return (
        this.clientPageCollectionLength >=
          this.clientCurrentPageLimit
      )
    }
  },
  methods: {
    handleClientPageChange () {
      this.setClientPageCollection()

      this.setFocusable()

      this.focus()
    },
    handleClientPageCollectionChange () {
      if (this.isGetNextPageData) {
        this.getNextPageData()
      }

      this.refreshContent()
    },
    setClientPageCollection () {
      this.clientPageCollection =
        this.newClientPageCollection
    }
  }
}
</script>

<style lang="sass" scoped></style>
