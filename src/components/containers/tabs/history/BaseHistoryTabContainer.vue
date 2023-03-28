<template>
  <BasePaginatedTabContainer
    :response-data="historyData"
    :scope="listScope"
    :limit="limit"
    :response-page-limit="responsePageLimit"
    :is-loading="isLoading"
    :error="error"
    :is-active="isActive"
    :more-link="moreLink"
    @focus="handleFocus"
    @activate="handleActivate"
  >
    <template
      #default="slotProps"
    >
      <slot
        :[listScope]="slotProps[listScope]"
      />
    </template>
  </BasePaginatedTabContainer>
</template>

<script>
import {
  ipcRenderer
} from 'electron'
import tabContainerMixin from '@/mixins/tabContainerMixin'
import getHistory from '@/helpers/actions/api/history/get'
import {
  sortByCreated
} from '@/helpers/utils'
import {
  activity as formatHistoryActivityLink,
  player as formatHistoryPlayerLink,
  browser as formatHistoryBrowserLink
} from '@/helpers/formatters/links/history'

export default {
  name: 'BaseHistoryTabContainer',
  mixins: [
    tabContainerMixin
  ],
  props: {
    listScope: {
      type: String,
      required: true
    },
    isGetData: {
      type: Boolean,
      default: true
    }
  },
  data () {
    return {
      historyData: null
    }
  },
  computed: {
    historyArgs () {
      return {
        scope: this.scope,
        limit: this.limit
      }
    },
    isPlayerScope () {
      return (
        this.scope === 'player'
      )
    },
    isBrowserScope () {
      return (
        this.scope === 'browser'
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
    playerTracksCount () {
      return this.historyData?.tracks?.length
    },
    browserRoutesCount () {
      return this.historyData?.routes?.length
    },
    moreLink () {
      switch (this.scope) {
        case 'activity':
          return formatHistoryActivityLink()
        case 'player':
          return formatHistoryPlayerLink()
        case 'browser':
          return formatHistoryBrowserLink()
        default:
          return {}
      }
    }
  },
  methods: {
    getHistory,
    async handleActivate () {
      if (this.isGetData) {
        this.getData()
      } else {
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
          order: 'createdDesc'
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
          order: 'createdDesc'
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
