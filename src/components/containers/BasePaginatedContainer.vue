<template>
  <div class="paginated-container">
    <BaseError
      v-if="error"
      :error="error"
      @refresh="handleRefresh"
    />
    <div
      v-else-if="responsePageCollection"
      class="paginated-data-container"
    >
      <NoCollectionMessage
        v-if="!isResponseCollection"
        :scope="scope"
      />
      <slot
        v-else-if="isClientPageCollectionFiltered"
        :[scope]="clientPageCollectionFiltered"
      />
    </div>

    <template v-if="isRenderPagination">
      <div class="ui divider main-divider"></div>

      <div class="pagination-container">
        <BasePagination
          :totalPages="clientTotalPages"
          :isDisabled="isPaginationDisabled"
          isWithNearButtons
          @pageChange="changeClientPage"
        />
      </div>
    </template>
  </div>
</template>

<script>
import deepmerge from 'deepmerge'
import BaseError from '@/BaseError.vue'
import NoCollectionMessage
  from './BasePaginatedContainer/NoCollectionMessage.vue'
import BasePagination from '@/BasePagination.vue'

export default {
  name: 'BasePaginatedContainer',
  components: {
    BaseError,
    NoCollectionMessage,
    BasePagination
  },
  props: {
    scope: {
      type: String,
      required: true
    },
    clientPageLimit: {
      type: Number,
      required: true
    },
    responsePageLimit: {
      type: Number,
      required: true
    },
    responseData: Object,
    error: Error
  },
  emits: [
    'focus',
    'fetchData',
    'refresh'
  ],
  data () {
    return {
      responseTotalPages: null,
      responsePageCollection: null,
      clientCollectionPaginated: null,
      clientPageCollection: null,
      clientPage: 1,
      isForward: true,
      isFocusable: false,
      isLastPage: false
    }
  },
  computed: {
    isResponseCollection () {
      return this.responsePageCollection.length
    },
    isClientPageCollectionFiltered () {
      return this.clientPageCollectionFiltered.length
    },
    isRenderPagination () {
      return (
        this.responsePageCollection &&
          this.isPageable
      )
    },
    isPageable () {
      return (
        this.isResponsePageable ||
          this.isResponsePagePageable
      )
    },
    isResponsePageable () {
      return this.responseTotalPages > 1
    },
    isResponsePagePageable () {
      return (
        this.responsePageCollection.length >
          this.clientPageLimit
      )
    },
    clientTotalPages () {
      return Math.ceil(
        this.totalItems /
          this.clientPageLimit
      )
    },
    totalItems () {
      return (
        this.responseTotalPages *
          this.responsePageLimit
      )
    },
    isPaginationDisabled () {
      return !!this.error
    },
    clientPageCollectionFiltered () {
      return this.clientPageCollection.filter(item => item)
    },
    newClientCollectionPaginated () {
      return deepmerge(
        ...this.clientResponsePageCollections,
        { arrayMerge: this.mergeArrays }
      )
    },
    clientResponsePageCollections () {
      const collections = [
        { ...this.clientCollectionPaginated },
        this.responsePageCollectionPaginated
      ]

      if (this.isForward) {
        return collections
      } else {
        return collections.reverse()
      }
    },
    responsePageCollectionPaginated () {
      const collection = [...this.responsePageCollection]
      collection.length = this.responsePageLimit

      const newCollection = []

      for (
        let page = this.clientStartPage;
        collection.length > 0;
        page++
      ) {
        const prevPageRemainder =
          newCollection.length ? 0 : this.pageRemainder
        const pageDataLength =
          this.clientPageLimit - prevPageRemainder
        const pageData = collection.splice(0, pageDataLength)

        newCollection.push([page, pageData])
      }

      return Object.fromEntries(newCollection)
    },
    clientStartPage () {
      return Math.floor(
        this.responseOffset /
          this.clientPageLimit
      ) + 1
    },
    responseOffset () {
      return (
        this.responsePageLimit *
          (this.responseData.page - 1)
      )
    },
    pageRemainder () {
      return (
        this.responseOffset %
          this.clientPageLimit
      )
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
        this.clientPageLimit
      )
    },
    remainingItems () {
      return this.totalItems - this.clientOffset
    },
    clientOffset () {
      return (
        this.clientPageLimit *
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
          this.responsePageLimit
      ) + 1
    },
    forwardPageOffset () {
      return (
        (this.clientPage - 1) *
          this.clientPageLimit +
          this.clientPageCollectionLength
      )
    },
    lastPage () {
      return (
        this.lastPageOffset /
          this.responsePageLimit
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
          this.responsePageLimit
      )
    },
    backwardPageOffset () {
      return (
        this.clientPage *
          this.clientPageLimit
      ) - this.clientPageCollectionLength
    }
  },
  watch: {
    responseData: {
      immediate: true,
      handler: 'handleResponseDataChange'
    },
    clientPage: 'handleClientPageChange',
    clientPageCollection: 'handleClientPageCollectionChange'
  },
  methods: {
    handleRefresh () {
      this.$emit('refresh', this.requestPage)
    },
    handleResponseDataChange (value) {
      if (value) {
        this.responseTotalPages = value.total_pages
        this.responsePageCollection = value[this.scope]

        this.setCollections()
      }
    },
    handleClientPageChange () {
      this.setClientPageCollection()
    },
    handleClientPageCollectionChange (value) {
      if (value) {
        this.isFocusable && this.$emit('focus')

        !this.isCollectionFull && this.fetchData()
      }
    },
    fetchData () {
      this.$emit('fetchData', this.requestPage)
    },
    setCollections () {
      this.clientCollectionPaginated =
        this.newClientCollectionPaginated

      this.setClientPageCollection()
    },
    setClientPageCollection () {
      this.clientPageCollection =
        this.clientCollectionPaginated[this.clientPage] || []
    },
    changeClientPage (page) {
      this.isLastPage = page === this.clientTotalPages
      this.isForward =
        page > this.clientPage &&
          !this.isLastPage
      this.clientPage = page
      this.isFocusable = true
    },
    mergeArrays (array, newArray) {
      if (this.isArrayFull(array)) {
        return array
      } else if (this.isArrayFull(newArray)) {
        return newArray
      } else {
        return deepmerge(array, newArray)
      }
    },
    isArrayFull (array) {
      return array.length === this.clientPageLimit
    }
  }
}
</script>

<style lang="sass" scoped>
.paginated-container
  @extend .d-flex, .flex-column, .w-100, .flex-full

.paginated-data-container
  @extend .flex-full

.pagination-container
  @extend .text-align-center
</style>
