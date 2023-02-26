<template>
  <BasePageContainer
    :response-data="historyData"
    :is-loading="isLoading"
    :error="error"
  >
    <slot
      :history-data="historyData"
      :response-page-limit="responsePageLimit"
      :is-loading="isLoading"
      :error="error"
    />
  </BasePageContainer>
</template>

<script>
import electronStore from '#/plugins/electronStore'
import BasePageContainer
  from '@/components/containers/pages/BasePageContainer.vue'
import navigationMixin from '@/mixins/navigationMixin'
import formatHistoryPageNavigation
  from '@/helpers/formatters/navigation/history'
import formatHistoryPageTab from '@/helpers/formatters/tabs/history'
import getHistory from '@/helpers/actions/api/history/get'
import {
  sortByCreated
} from '@/helpers/utils'

export default {
  name: 'BaseHistoryPageContainer',
  components: {
    BasePageContainer
  },
  mixins: [
    navigationMixin
  ],
  props: {
    isGetData: {
      type: Boolean,
      default: true
    },
    scope: String,
    limit: Number,
    order: String
  },
  data () {
    return {
      historyData: null,
      error: null,
      isLoading: false
    }
  },
  computed: {
    navigationSections () {
      return formatHistoryPageNavigation(
        this.navigationData
      )
    },
    navigationData () {
      return {
        scope: this.scope
      }
    },
    tabData () {
      return formatHistoryPageTab(
        this.navigationData
      )
    },
    historyArgs () {
      return {
        scope: this.scope,
        limit: this.limit,
        order: this.order
      }
    },
    playerHistoryData () {
      return {
        page: 1,
        total_pages: 1,
        tracks:
          this.playerTracksCreatedSorted
      }
    },
    playerTracksCreatedSorted () {
      return sortByCreated(
        {
          collection: this.playerTracks,
          order: this.order
        }
      )
    },
    playerTracks () {
      return electronStore.get(
        'history.player'
      )
    },
    browserHistoryData () {
      return {
        page: 1,
        total_pages: 1,
        routes:
          this.browserRoutesCreatedSorted
      }
    },
    browserRoutesCreatedSorted () {
      return sortByCreated(
        {
          collection:
            this.browserRoutes,
          order: this.order
        }
      )
    },
    browserRoutes () {
      return electronStore.get(
        'history.browser'
      )
    },
    responsePageLimit () {
      if (this.isGetData) {
        return null
      } else {
        if (this.isPlayerScope) {
          return this.playerTracksCount
        } else if (this.isBrowserScope) {
          return this.browserRoutesCount
        } else {
          return null
        }
      }
    },
    isPlayerScope () {
      return (
        this.scope === 'player'
      )
    },
    playerTracksCount () {
      return this.playerTracks.length
    },
    isBrowserScope () {
      return (
        this.scope === 'browser'
      )
    },
    browserRoutesCount () {
      return this.browserRoutes.length
    }
  },
  watch: {
    historyData:
      'handleNavigationDataChange',
    order: 'handleOrderChange'
  },
  mounted () {
    if (this.isGetData) {
      this.getData()
    } else {
      if (this.isPlayerScope) {
        this.historyData =
          this.playerHistoryData
      } else if (this.isBrowserScope) {
        this.historyData =
          this.browserHistoryData
      } else {
        this.historyData = {}
      }
    }
  },
  methods: {
    getHistory,
    handleOrderChange () {
      if (!this.isGetData) {
        if (this.isPlayerScope) {
          this.historyData =
            this.playerHistoryData
        } else if (this.isBrowserScope) {
          this.historyData =
            this.browserHistoryData
        }
      }
    },
    getData (
      {
        page
      } = {}
    ) {
      this.getHistory(
        {
          ...this.historyArgs,
          page
        }
      )
    }
  }
}
</script>

<style lang="sass" scoped></style>
