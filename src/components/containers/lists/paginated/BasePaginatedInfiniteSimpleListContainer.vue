<template>
  <div class="main-paginated-list-container">
    <ContentContainer
      :key="contentKey"
      :client-page-collection="clientPageCollection"
      :scope="scope"
      :text-scope="textScope"
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

    <ScrollObserver
      v-if="responseTotalPages"
      :key="scrollObserverKey"
      :is-loading="isLoading"
      :error="error"
      :is-last-page="isLastResponsePage"
      :scroll-context="scrollContext"
      @bottom-scroll="handleBottomScroll"
      @refresh="handleRefresh"
    />

    <ListEndLabel
      v-if="isLastResponsePage"
    />
  </div>
</template>

<script>
import deepmerge from 'deepmerge'
import ContentContainer from './ContentContainer.vue'
import ListEndLabel from './ListEndLabel.vue'
import ScrollObserver from './ScrollObserver.vue'
import paginatedListMixin from '@/mixins/paginatedListMixin'

export default {
  name: 'BasePaginatedInfiniteSimpleListContainer',
  components: {
    ContentContainer,
    ScrollObserver,
    ListEndLabel
  },
  mixins: [
    paginatedListMixin
  ],
  data () {
    return {
      isFocus: false
    }
  },
  computed: {
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
    clientCollection () {
      return deepmerge(
        this.clientPageCollection,
        this.newClientPageCollection
      )
    },
    newClientNextPageCollection () {
      return this.clientCollectionPaginated[
        this.clientNextPage
      ]
    },
    isCollectionFull () {
      return (
        this.newClientPageCollectionLength >=
          this.clientCurrentPageLimit
      )
    }
  },
  watch: {
    newClientPageCollection: {
      immediate: true,
      handler: 'handleNewClientPageCollectionChange'
    }
  },
  methods: {
    handleClientPageChange () {
      this.setClientPageCollection()
    },
    handleClientPageCollectionChange () {
      this.resetInfiniteScrollObserver()

      this.refreshContent()
    },
    handleNewClientPageCollectionChange () {
      if (this.isGetNextPageData) {
        this.getNextPageData()
      }
    },
    setClientPageCollection () {
      if (!this.isGetNextPageData) {
        this.clientPageCollection =
          this.clientCollection
      }
    }
  }
}
</script>

<style lang="sass" scoped></style>
