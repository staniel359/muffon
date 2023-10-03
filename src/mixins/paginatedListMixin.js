import deepmerge from 'deepmerge'
import {
  snakeCase
} from 'change-case'
import {
  collection as formatCollection
} from '@/helpers/formatters'
import {
  generateKey
} from '@/helpers/utils'

export default {
  provide () {
    return {
      findPaginationItem:
        this.findPaginationItem,
      updatePaginationItem:
        this.updatePaginationItem,
      resetInfiniteScrollObserver:
        this.resetInfiniteScrollObserver,
      prependItemToPaginatedList:
        this.prependItemToPaginatedList
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
    isLoading: Boolean,
    error: Error,
    responseData: Object,
    scrollable: HTMLDivElement,
    isWithPagination: Boolean
  },
  emits: [
    'focus'
  ],
  data () {
    return {
      contentKey: null,
      scrollObserverKey: null,
      isFocusable: false,
      clientPage: 1,
      responsePageCollection: [],
      clientPageCollection: [],
      clientCollectionPaginated: {}
    }
  },
  computed: {
    isRenderContent () {
      return !this.isLoading
    },
    isRenderPagination () {
      return (
        this.isWithPagination ||
          this.isPageable
      )
    },
    isPageable () {
      return (
        this.isResponsePageable ||
          this.isResponsePagePageable
      )
    },
    responseNextPage () {
      return this.responseData?.next_page
    },
    isResponsePagePageable () {
      return (
        this.responsePageCollectionLength >
          this.limit
      )
    },
    responsePageCollectionLength () {
      return (
        this.responsePageCollection?.length || 0
      )
    },
    clientTotalPages () {
      return Math.ceil(
        this.totalItems / this.limit
      )
    },
    totalItems () {
      return (
        this.responseTotalPages *
          this.responsePageLimitComputed
      )
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
        const previousPageRemainder = (
          newCollection.length ? 0 : this.pageRemainder
        )

        const pageDataLength = (
          this.limit -
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
    pageRemainder () {
      return (
        this.responseOffset %
          this.limit
      )
    },
    responsePage () {
      return (
        this.responseData?.page || 1
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
      return [
        {
          ...this.clientCollectionPaginated
        },
        this.responsePageCollectionPaginated
      ]
    },
    isFirstClientPage () {
      return (
        this.clientPage === 1
      )
    },
    isGetNextPageData () {
      return (
        !this.isCollectionFull &&
          !!this.requestPage
      )
    },
    newClientPageCollectionLength () {
      return (
        this.newClientPageCollection?.length || 0
      )
    },
    newClientPageCollection () {
      return this.clientCollectionPaginated[
        this.clientPage
      ] || []
    },
    clientCurrentPageLimit () {
      return Math.min(
        this.remainingItems,
        this.limit
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
        this.limit *
          this.clientPreviousPage
      )
    },
    clientPreviousPage () {
      return (
        this.clientPage - 1
      )
    },
    clientNextPage () {
      return (
        this.clientPage + 1
      )
    },
    clientPageCollectionLength () {
      return (
        this.clientPageCollection?.length || 0
      )
    },
    rawCollection () {
      return Object.values(
        this.clientCollectionPaginated
      ).flat()
    }
  },
  watch: {
    responseData: {
      immediate: true,
      handler: 'handleResponseDataChange'
    },
    clientPageCollection: {
      immediate: true,
      handler: 'handleClientPageCollectionChange'
    },
    clientPage: 'handleClientPageChange'
  },
  methods: {
    handleRefresh () {
      this.getNextPageData()
    },
    handleResponseDataChange (
      value
    ) {
      if (value) {
        const scopeFormatted =
          snakeCase(
            this.scope
          )

        const collection =
          value[
            scopeFormatted
          ]

        if (collection) {
          this.responsePageCollection =
            formatCollection(
              collection
            )

          this.setCollections()

          if (this.isFocus) {
            this.focus()
          }
        }
      }
    },
    handlePreviousPageClick () {
      this.goToPreviousPage()
    },
    handleNextPageClick () {
      this.goToNextPage()
    },
    handleBottomScroll () {
      this.goToNextPage()
    },
    handlePageClick (
      value
    ) {
      this.setClientPage(
        value
      )
    },
    handlePageSelect (
      value
    ) {
      this.setClientPage(
        value
      )
    },
    getNextPageData () {
      this.getData(
        {
          page: this.requestPage
        }
      )
    },
    setClientPage (
      value
    ) {
      this.clientPage = value
    },
    setCollections () {
      this.clientCollectionPaginated =
        this.newClientCollectionPaginated

      this.setClientPageCollection()
    },
    goToPreviousPage () {
      this.setClientPage(
        this.clientPreviousPage
      )
    },
    goToNextPage () {
      this.setClientPage(
        this.clientNextPage
      )
    },
    mergeArrays (
      first,
      second
    ) {
      const isFirstFull =
        this.isArrayFull(
          first
        )

      const isSecondFull =
        this.isArrayFull(
          second
        )

      if (isFirstFull) {
        return first
      } else if (isSecondFull) {
        return second
      } else {
        return deepmerge(
          first,
          second
        )
      }
    },
    isArrayFull (
      array
    ) {
      return (
        array.length === this.limit
      )
    },
    refreshContent () {
      this.contentKey = generateKey()
    },
    focus () {
      this.$emit(
        'focus'
      )
    },
    setFocusable () {
      this.isFocusable = true
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
    async resetInfiniteScrollObserver () {
      await this.$nextTick()

      this.scrollObserverKey = generateKey()
    },
    prependItemToPaginatedList (
      value
    ) {
      const newItemFormatted = {
        uuid: generateKey(),
        ...value
      }

      this.clientCollectionPaginated[1] = [
        newItemFormatted,
        ...this.clientCollectionPaginated[1]
      ]

      this.clientPageCollection = [
        newItemFormatted,
        ...this.clientPageCollection
      ]
    }
  }
}
