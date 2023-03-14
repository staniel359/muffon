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
import electronStore from '#/plugins/electronStore'
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
          order: 'createdDesc'
        }
      )
    },
    playerTracks () {
      return electronStore.get(
        'history.player'
      )
    },
    isBrowserScope () {
      return (
        this.scope === 'browser'
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
          collection: this.browserRoutes,
          order: 'createdDesc'
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
    playerTracksCount () {
      return this.playerTracks.length
    },
    browserRoutesCount () {
      return this.browserRoutes.length
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
    handleActivate () {
      if (this.isGetData) {
        this.getData()
      } else {
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
