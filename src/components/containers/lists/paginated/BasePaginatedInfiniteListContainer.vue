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
      :scrollable="scrollable"
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
import ScrollObserver from './ScrollObserver.vue'
import ListEndLabel from './ListEndLabel.vue'
import paginatedListMixin from '@/mixins/paginatedListMixin'

export default {
  name: 'BasePaginatedInfiniteListContainer',
  components: {
    ContentContainer,
    ScrollObserver,
    ListEndLabel
  },
  mixins: [
    paginatedListMixin
  ],
  props: {
    responsePageLimit: Number
  },
  data () {
    return {
      isFocus: false
    }
  },
  computed: {
    responsePageLimitComputed () {
      return (
        this.responsePageLimit ||
          this.limit
      )
    },
    responseTotalPages () {
      return (
        this.responseData?.total_pages || 0
      )
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
    requestPage () {
      return this.responsePage + 1
    },
    isLastResponsePage () {
      return (
        this.responsePage ===
          this.responseTotalPages
      )
    },
    clientCollection () {
      return deepmerge(
        this.clientPageCollection,
        this.newClientPageCollection
      )
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
