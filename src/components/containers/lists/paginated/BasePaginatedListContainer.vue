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
      :is-last-page="isLastClientPage"
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
  name: 'BasePaginatedListContainer',
  components: {
    ContentContainer,
    PaginationSection
  },
  mixins: [
    paginatedListMixin
  ],
  props: {
    responsePageLimit: Number,
    isReset: Boolean
  },
  data () {
    return {
      isForward: true
    }
  },
  computed: {
    isResponsePageable () {
      return (
        this.responseTotalPages > 1
      )
    },
    responseTotalPages () {
      return (
        this.responseData?.total_pages || 0
      )
    },
    clientResponsePageCollections () {
      let collections

      if (this.isReset) {
        collections = [
          this.responsePageCollectionPaginated
        ]
      } else {
        collections = [
          {
            ...this.clientCollectionPaginated
          },
          this.responsePageCollectionPaginated
        ]
      }

      if (this.isForward) {
        return collections
      } else {
        return collections.reverse()
      }
    },
    clientStartPage () {
      return Math.floor(
        this.responseOffset /
          this.limit
      ) + 1
    },
    responseOffset () {
      return (
        this.responsePageLimitComputed * (
          this.responsePage - 1
        )
      )
    },
    responsePageLimitComputed () {
      return (
        this.responsePageLimit ||
          this.limit
      )
    },
    requestPage () {
      if (this.isForward) {
        return this.forwardPage
      } else if (this.isLastClientPage) {
        return this.lastPage
      } else {
        return this.backwardPage
      }
    },
    forwardPage () {
      return (
        this.forwardPageOffset /
          this.responsePageLimitComputed
      ) + 1
    },
    forwardPageOffset () {
      return (
        this.clientPreviousPage *
          this.limit +
          this.clientPageCollectionLength
      )
    },
    isLastClientPage () {
      return (
        this.clientPage ===
          this.clientTotalPages
      )
    },
    lastPage () {
      return (
        this.lastPageOffset /
          this.responsePageLimitComputed
      )
    },
    lastPageOffset () {
      return (
        this.totalItems -
          this.clientPageCollectionLength
      )
    },
    backwardPage () {
      return (
        this.backwardPageOffset /
          this.responsePageLimitComputed
      )
    },
    backwardPageOffset () {
      return (
        this.clientPage * this.limit
      ) - this.clientPageCollectionLength
    },
    isFocus () {
      return (
        this.isFocusable &&
          !this.isReset
      )
    },
    isCollectionFull () {
      return (
        this.clientPageCollectionLength >=
          this.clientCurrentPageLimit
      )
    },
    isGoToClientPreviousPage () {
      return (
        this.isReset &&
          !this.clientPageCollectionLength
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

      if (this.isGoToClientPreviousPage) {
        this.goToClientPreviousPage()
      }
    },
    setClientPageCollection () {
      this.clientPageCollection =
        this.newClientPageCollection
    },
    setClientPage (
      value
    ) {
      const isNextPage = (
        value > this.clientPage
      )

      this.isForward = (
        isNextPage &&
          !this.isLastClientPage
      )

      this.clientPage = value
    },
    goToClientPreviousPage () {
      this.clientPage =
        this.clientPreviousPage
    }
  }
}
</script>

<style lang="sass" scoped></style>
