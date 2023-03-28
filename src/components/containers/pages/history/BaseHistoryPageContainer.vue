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
import {
  ipcRenderer
} from 'electron'
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
      return this.historyData?.tracks?.length
    },
    isBrowserScope () {
      return (
        this.scope === 'browser'
      )
    },
    browserRoutesCount () {
      return this.historyData?.routes?.length
    }
  },
  watch: {
    historyData:
      'handleNavigationDataChange',
    order: 'handleOrderChange'
  },
  async mounted () {
    if (this.isGetData) {
      this.getData()
    } else {
      if (this.isPlayerScope) {
        this.historyData =
          await this.getPlayerHistoryData()
      } else if (this.isBrowserScope) {
        this.historyData =
          await this.getBrowserHistoryData()
      } else {
        this.historyData = {}
      }
    }
  },
  methods: {
    getHistory,
    async handleOrderChange () {
      if (!this.isGetData) {
        if (this.isPlayerScope) {
          this.historyData =
            await this.getPlayerHistoryData()
        } else if (this.isBrowserScope) {
          this.historyData =
            await this.getBrowserHistoryData()
        }
      }
    },
    async getPlayerHistoryData () {
      const tracks =
        await this.getPlayerTracksCreatedSorted()

      return {
        page: 1,
        total_pages: 1,
        tracks
      }
    },
    async getPlayerTracksCreatedSorted () {
      const collection =
        await this.getPlayerTracks()

      return sortByCreated(
        {
          collection,
          order: this.order
        }
      )
    },
    getPlayerTracks () {
      return ipcRenderer.invoke(
        'get-electron-store-key',
        'history.player'
      )
    },
    async getBrowserHistoryData () {
      const routes =
        await this.getBrowserRoutesCreatedSorted()

      return {
        page: 1,
        total_pages: 1,
        routes
      }
    },
    async getBrowserRoutesCreatedSorted () {
      const collection =
        await this.getBrowserRoutes()

      return sortByCreated(
        {
          collection,
          order: this.order
        }
      )
    },
    getBrowserRoutes () {
      return ipcRenderer.invoke(
        'get-electron-store-key',
        'history.browser'
      )
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
