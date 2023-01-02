<template>
  <div class="main-paginated-list-container">
    <div class="main-paginated-list-content-container">
      <ContentContainer
        v-show="isRenderContent"
        :client-page-collection="clientPageCollection"
        :scope="scope"
        :text-scope="textScope"
        :error="errorComputed"
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
    </div>

    <template
      v-if="isWithInfiniteScroll"
    >
      <ScrollObserver
        v-if="isResponsePageCollection"
        :key="key"
        :is-loading="isLoading"
        :error="error"
        :is-last-page="isLastPage"
        @bottom-scroll="handleBottomScroll"
        @refresh="handleRefresh"
      />

      <ListEndLabel
        v-if="isLastPage"
      />
    </template>
    <PaginationSection
      v-else-if="isRenderPagination"
      :is-loading="isLoading"
      :is-error="!!error"
      :client-page="clientPage"
      :total-pages="clientTotalPages"
      :is-pagination-simple="isPaginationSimple"
      :is-first-page="isFirstPage"
      :is-last-page="isLastPage"
      @page-click="handlePageClick"
      @previous-page-click="handlePreviousPageClick"
      @next-page-click="handleNextPageClick"
    />
  </div>
</template>

<script>
import deepmerge from 'deepmerge'
import ContentContainer
  from './BasePaginatedListContainer/ContentContainer.vue'
import ScrollObserver from './BasePaginatedListContainer/ScrollObserver.vue'
import ListEndLabel from './BasePaginatedListContainer/ListEndLabel.vue'
import PaginationSection
  from './BasePaginatedListContainer/PaginationSection.vue'
import {
  collection as formatCollection
} from '@/helpers/formatters'
import {
  generateKey
} from '#/helpers/utils'

export default {
  name: 'BasePaginatedListContainer',
  components: {
    ContentContainer,
    ScrollObserver,
    ListEndLabel,
    PaginationSection
  },
  provide () {
    return {
      findPaginationItem:
        this.findPaginationItem,
      updatePaginationItem:
        this.updatePaginationItem,
      resetInfiniteScrollObserver:
        this.resetInfiniteScrollObserver
    }
  },
  inject: {
    getData: {
      default: () => false
    }
  },
  props: {
    scope: {
      type: String,
      required: true
    },
    limit: {
      type: Number,
      required: true
    },
    textScope: String,
    responsePageLimit: Number,
    clientPageLimit: Number,
    isLoading: Boolean,
    error: Error,
    responseData: Object,
    isReset: Boolean,
    isWithPagination: Boolean,
    isPaginationSimple: Boolean,
    isWithInfiniteScroll: Boolean
  },
  emits: [
    'focus'
  ],
  data () {
    return {
      key: null,
      responseTotalPages: 0,
      clientPage: 1,
      responsePageCollection: [],
      clientPageCollection: [],
      clientCollectionPaginated: {},
      isForward: true,
      isFocusable: false
    }
  },
  computed: {
    isRenderPagination () {
      return (
        this.isWithPagination ||
          this.isPageable
      )
    },
    isResponsePageCollection () {
      return !!this.responsePageCollection?.length
    },
    isPageable () {
      return (
        this.isResponsePageable ||
          this.isResponsePagePageable
      )
    },
    isResponsePageable () {
      return (
        this.responseNextPage ||
          this.responsePreviousPage || (
          this.responseTotalPages > 1 &&
            this.clientTotalPages > 1
        )
      )
    },
    responseNextPage () {
      return this.responseData?.next_page
    },
    responsePreviousPage () {
      return this.responseData?.prev_page
    },
    isResponsePagePageable () {
      return (
        this.responsePageCollection.length >
          this.clientPageLimitComputed
      )
    },
    clientPageLimitComputed () {
      return (
        this.clientPageLimit ||
          this.limit
      )
    },
    clientTotalPages () {
      return Math.ceil(
        this.totalItems /
          this.clientPageLimitComputed
      )
    },
    totalItems () {
      return (
        this.responseTotalPages *
          this.responsePageLimitComputed
      )
    },
    responsePageLimitComputed () {
      return (
        this.responsePageLimit ||
          this.limit
      )
    },
    newClientCollectionPaginated () {
      return deepmerge(
        ...this.clientResponsePageCollections,
        {
          arrayMerge: this.mergeArrays
        }
      )
    },
    clientResponsePageCollections () {
      const collections =
        this.formatCollections()

      if (this.isForward) {
        return collections
      } else {
        return collections.reverse()
      }
    },
    responsePageCollectionPaginated () {
      const collection = [
        ...this.responsePageCollection
      ]

      collection.length =
        this.responsePageLimitComputed

      const newCollection = []

      for (
        let page = this.clientStartPage;
        collection.length > 0;
        page++
      ) {
        const previousPageRemainder =
          newCollection.length ? 0 : this.pageRemainder

        const pageDataLength = (
          this.clientPageLimitComputed -
            previousPageRemainder
        )

        const pageData =
          collection.splice(
            0,
            pageDataLength
          )

        newCollection.push(
          [
            page,
            pageData
          ]
        )
      }

      return Object.fromEntries(
        newCollection
      )
    },
    clientStartPage () {
      if (this.isPaginationSimple) {
        return this.clientPage
      } else {
        return Math.floor(
          this.responseOffset /
            this.clientPageLimitComputed
        ) + 1
      }
    },
    responseOffset () {
      return (
        this.responsePageLimitComputed *
          (this.responsePage - 1)
      )
    },
    responsePage () {
      return (
        this.responseData?.page || 1
      )
    },
    pageRemainder () {
      return (
        this.responseOffset %
          this.clientPageLimitComputed
      )
    },
    isGetNextPageData () {
      if (this.isWithInfiniteScroll) {
        return (
          this.isResponsePageCollection &&
            !this.isCollectionFull
        )
      } else {
        return !this.isCollectionFull
      }
    },
    isCollectionFull () {
      if (this.isWithInfiniteScroll) {
        return (
          this.newClientPageCollectionLength >=
            this.clientCurrentPageLimit
        )
      } else {
        return (
          this.clientPageCollectionLength >=
            this.clientCurrentPageLimit
        )
      }
    },
    newClientPageCollectionLength () {
      return (
        this.newClientPageCollection?.length || 0
      )
    },
    clientCurrentPageLimit () {
      if (this.isPaginationSimple) {
        return this.clientPageLimitComputed
      } else {
        return Math.min(
          this.remainingItems,
          this.clientPageLimitComputed
        )
      }
    },
    remainingItems () {
      return (
        this.totalItems -
          this.clientOffset
      )
    },
    clientOffset () {
      return (
        this.clientPageLimitComputed *
          (this.clientPage - 1)
      )
    },
    clientPageCollectionLength () {
      return (
        this.clientPageCollection?.length || 0
      )
    },
    requestPage () {
      if (this.isForward) {
        return this.forwardPage
      } else if (this.isLastPage) {
        return this.lastPage
      } else {
        return this.backwardPage
      }
    },
    forwardPage () {
      if (this.isPaginationSimple) {
        return this.responseNextPage
      } else if (this.isWithInfiniteScroll) {
        return this.responsePage + 1
      } else {
        return (
          this.forwardPageOffset /
            this.responsePageLimitComputed
        ) + 1
      }
    },
    forwardPageOffset () {
      return (
        (this.clientPage - 1) *
          this.clientPageLimitComputed +
          this.clientPageCollectionLength
      )
    },
    isLastPage () {
      if (this.isPaginationSimple) {
        return (
          !this.responseNextPage &&
            !this.newNextClientPageCollection
        )
      } else {
        return (
          this.clientPage ===
            this.clientTotalPages
        )
      }
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
      if (this.isPaginationSimple) {
        return this.responsePreviousPage
      } else {
        return (
          this.backwardPageOffset /
            this.responsePageLimitComputed
        )
      }
    },
    backwardPageOffset () {
      return (
        this.clientPage *
          this.clientPageLimitComputed
      ) - this.clientPageCollectionLength
    },
    newClientPageCollection () {
      return this.clientCollectionPaginated[
        this.clientPage
      ] || []
    },
    isRenderContent () {
      return (
        this.isWithInfiniteScroll ||
          !this.isLoading
      )
    },
    errorComputed () {
      if (this.isWithInfiniteScroll) {
        return null
      } else {
        return this.error
      }
    },
    clientCollection () {
      return deepmerge(
        this.clientPageCollection,
        this.newClientPageCollection
      )
    },
    isFirstPage () {
      return (
        this.clientPage === 1
      )
    },
    newNextClientPageCollection () {
      return this.clientCollectionPaginated[
        this.clientPage + 1
      ]
    }
  },
  watch: {
    responseData: {
      immediate: true,
      handler: 'handleResponseDataChange'
    },
    clientPage: 'handleClientPageChange',
    clientPageCollection:
      'handleClientPageCollectionChange',
    newClientPageCollection:
      'handleNewClientPageCollectionChange'
  },
  methods: {
    handleRefresh () {
      this.getNextPageData()
    },
    handleResponseDataChange (
      value
    ) {
      if (value) {
        this.responseTotalPages = (
          value.total_pages || 0
        )

        const collection =
          value[
            this.scope
          ]

        if (collection) {
          this.responsePageCollection =
            formatCollection(
              collection
            )

          this.setCollections()

          const isFocus = (
            this.isFocusable &&
              !this.isReset
          )

          if (isFocus) {
            this.focus()
          }
        }
      }
    },
    handleClientPageChange () {
      this.setClientPageCollection()
    },
    handleClientPageCollectionChange () {
      if (this.isWithInfiniteScroll) {
        this.resetInfiniteScrollObserver()
      } else {
        if (this.isGetNextPageData) {
          this.getNextPageData()
        }
      }
    },
    handleNewClientPageCollectionChange () {
      if (
        this.isWithInfiniteScroll &&
          this.isGetNextPageData
      ) {
        this.getNextPageData()
      }
    },
    handlePreviousPageClick () {
      this.goToPreviousPage()
    },
    handlePageClick (
      value
    ) {
      this.setClientPage(
        value
      )
    },
    handleNextPageClick () {
      this.goToNextPage()
    },
    handleBottomScroll () {
      this.goToNextPage()
    },
    getNextPageData () {
      this.getData(
        {
          page: this.requestPage
        }
      )
    },
    setCollections () {
      this.clientCollectionPaginated =
        this.newClientCollectionPaginated

      this.setClientPageCollection()
    },
    setClientPageCollection () {
      if (this.isWithInfiniteScroll) {
        if (this.isCollectionFull) {
          this.clientPageCollection =
            this.clientCollection
        }
      } else {
        this.clientPageCollection =
          this.newClientPageCollection
      }
    },
    setClientPage (
      value
    ) {
      this.isForward = (
        value > this.clientPage &&
          !this.isLastPage
      )

      this.clientPage = value

      if (!this.isWithInfiniteScroll) {
        this.isFocusable = true

        this.focus()
      }
    },
    mergeArrays (
      firstArray,
      secondArray
    ) {
      const isFirstArrayFull =
        this.isArrayFull(
          firstArray
        )

      const isSecondArrayFull =
        this.isArrayFull(
          secondArray
        )

      if (isFirstArrayFull) {
        return firstArray
      } else if (isSecondArrayFull) {
        return secondArray
      } else {
        return deepmerge(
          firstArray,
          secondArray
        )
      }
    },
    isArrayFull (
      array
    ) {
      return (
        array.length ===
          this.clientPageLimitComputed
      )
    },
    reset () {
      const initialData =
        this.$options
          .data
          .apply(
            this
          )

      Object.assign(
        this.$data,
        initialData
      )
    },
    findPaginationItem (
      {
        uuid
      }
    ) {
      function isMatchedItem (
        itemData
      ) {
        return (
          itemData.uuid === uuid
        )
      }

      return this.clientPageCollection.find(
        isMatchedItem
      )
    },
    updatePaginationItem (
      {
        uuid,
        value
      }
    ) {
      function isMatchedItem (
        itemData
      ) {
        return (
          itemData.uuid === uuid
        )
      }

      const index =
        this.clientPageCollection
          .findIndex(
            isMatchedItem
          )

      this.clientPageCollection[
        index
      ] = value
    },
    formatCollections () {
      if (this.isReset) {
        return [
          this.responsePageCollectionPaginated
        ]
      } else {
        return [
          {
            ...this.clientCollectionPaginated
          },
          this.responsePageCollectionPaginated
        ]
      }
    },
    focus () {
      this.$emit(
        'focus'
      )
    },
    async resetInfiniteScrollObserver () {
      await this.$nextTick()

      this.key = generateKey()
    },
    goToPreviousPage () {
      this.setClientPage(
        this.clientPage - 1
      )
    },
    goToNextPage () {
      this.setClientPage(
        this.clientPage + 1
      )
    }
  }
}
</script>

<style lang="sass" scoped></style>
