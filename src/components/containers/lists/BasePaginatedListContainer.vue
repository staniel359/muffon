<template>
  <div class="main-paginated-list-container">
    <div class="main-paginated-list-content-container">
      <ContentContainer
        v-if="!isLoading"
        :client-page-collection="clientPageCollection"
        :scope="scope"
        :error="error"
        @refresh="handleRefresh"
      >
        <template #default="slotProps">
          <slot
            :[scope]="slotProps[scope]"
          />
        </template>
      </ContentContainer>
    </div>

    <PaginationSection
      v-if="isRenderPagination"
      :is-loading="isLoading"
      :error="error"
      :total-pages-count="clientTotalPagesCount"
      :is-pagination-simple="isPaginationSimple"
      :prev-page="prevPage"
      :next-page="nextPage"
      @prev-page-click="handlePrevPageClick"
      @next-page-click="handleNextPageClick"
      @page-change="handlePageChange"
    />
  </div>
</template>

<script>
import deepmerge from 'deepmerge'
import ContentContainer
  from './BasePaginatedListContainer/ContentContainer.vue'
import PaginationSection
  from './BasePaginatedListContainer/PaginationSection.vue'
import {
  collection as formatCollection
} from '*/helpers/formatters'

export default {
  name: 'BasePaginatedListContainer',
  components: {
    ContentContainer,
    PaginationSection
  },
  provide () {
    return {
      findPaginationItem: this.findPaginationItem,
      updatePaginationItem: this.updatePaginationItem
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
    responsePageLimit: Number,
    clientPageLimit: Number,
    isLoading: Boolean,
    error: Error,
    responseData: Object,
    isReset: Boolean,
    isWithPagination: Boolean,
    isPaginationSimple: Boolean
  },
  emits: [
    'focus'
  ],
  data () {
    return {
      responsePageCollection: null,
      clientPageCollection: null,
      currentPage: null,
      responseTotalPages: 0,
      clientPage: 1,
      clientCollectionPaginated: {},
      isForward: true,
      isFocusable: false,
      isLastPage: false
    }
  },
  computed: {
    isRenderPagination () {
      return (
        this.isWithPagination || (
          this.responsePageCollection &&
            this.isPageable
        )
      )
    },
    isPageable () {
      return (
        this.isResponsePageable ||
          this.isResponsePagePageable
      )
    },
    isResponsePageable () {
      return (
        this.responseTotalPages > 1 ||
          this.nextPage ||
            this.prevPage
      )
    },
    nextPage () {
      return this.responseData?.next_page
    },
    prevPage () {
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
    clientTotalPagesCount () {
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
        const prevPageRemainder =
          newCollection.length ? 0 : this.pageRemainder

        const pageDataLength = (
          this.clientPageLimitComputed -
            prevPageRemainder
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
      return Math.floor(
        this.responseOffset /
          this.clientPageLimitComputed
      ) + 1
    },
    responseOffset () {
      return (
        this.responsePageLimitComputed *
          (this.responseData.page - 1)
      )
    },
    pageRemainder () {
      return (
        this.responseOffset %
          this.clientPageLimitComputed
      )
    },
    isGetData () {
      return (
        this.clientPageCollection &&
          this.isResponsePageCollection &&
          !this.isCollectionFull
      )
    },
    isResponsePageCollection () {
      return !!this.responsePageCollection?.length
    },
    isCollectionFull () {
      return (
        this.clientPageCollectionLength >=
          this.clientCurrentPageLimit
      )
    },
    clientPageCollectionLength () {
      return this.clientPageCollection?.length || 0
    },
    clientCurrentPageLimit () {
      return Math.min(
        this.remainingItems,
        this.clientPageLimitComputed
      )
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
      return (
        this.forwardPageOffset /
          this.responsePageLimitComputed
      ) + 1
    },
    forwardPageOffset () {
      return (
        (this.clientPage - 1) *
          this.clientPageLimitComputed +
          this.clientPageCollectionLength
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
        this.clientPage *
          this.clientPageLimitComputed
      ) - this.clientPageCollectionLength
    },
    currentPageConditional () {
      if (this.isPaginationSimple) {
        return this.currentPage
      } else {
        return this.requestPage
      }
    }
  },
  watch: {
    responseData: {
      immediate: true,
      handler: 'handleResponseDataChange'
    },
    clientPage: 'handleClientPageChange',
    clientPageCollection: {
      immediate: true,
      handler: 'handleClientPageCollectionChange'
    }
  },
  mounted () {
    if (this.isPaginationSimple) {
      this.currentPage = this.nextPage
    }
  },
  methods: {
    handleRefresh () {
      this.getData(
        {
          page: this.currentPageConditional
        }
      )
    },
    handleResponseDataChange (
      value
    ) {
      if (value) {
        this.responseTotalPages =
          value.total_pages

        this.responsePageCollection =
          formatCollection(
            value[this.scope]
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
    },
    handleClientPageChange () {
      this.setClientPageCollection()
    },
    async handleClientPageCollectionChange () {
      if (this.isGetData) {
        await this.$nextTick()

        this.getData(
          {
            page: this.requestPage
          }
        )
      }
    },
    handlePrevPageClick () {
      this.currentPage = this.prevPage

      this.getData(
        {
          page: this.prevPage
        }
      )
    },
    handleNextPageClick () {
      this.currentPage = this.nextPage

      this.getData(
        {
          page: this.nextPage
        }
      )
    },
    setCollections () {
      this.clientCollectionPaginated =
        this.newClientCollectionPaginated

      this.setClientPageCollection()
    },
    setClientPageCollection () {
      this.clientPageCollection =
        this.clientCollectionPaginated[
          this.clientPage
        ] || []
    },
    handlePageChange (
      value
    ) {
      this.isLastPage = (
        value ===
          this.clientTotalPagesCount
      )

      this.isForward = (
        value > this.clientPage &&
          !this.isLastPage
      )

      this.clientPage = value
      this.isFocusable = true

      this.focus()
    },
    mergeArrays (
      array,
      newArray
    ) {
      if (this.isArrayFull(
        array
      )) {
        return array
      } else if (this.isArrayFull(
        newArray
      )) {
        return newArray
      } else {
        return deepmerge(
          array,
          newArray
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
      Object.assign(
        this.$data,
        this.$options.data.apply(
          this
        )
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
        return itemData.uuid === uuid
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
        return itemData.uuid === uuid
      }

      const index =
        this.clientPageCollection.findIndex(
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
    }
  }
}
</script>

<style lang="sass" scoped></style>
