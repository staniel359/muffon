<template>
  <BaseHeaderSegmentsContainer
    ref="segment"
    :scope="scope"
    :header-link="headerLink"
  >
    <slot
      :history-data="historyData"
      :response-page-limit="responsePageLimit"
      :is-loading="isLoading"
      :error="error"
    />
  </BaseHeaderSegmentsContainer>
</template>

<script>
import electronStore from '#/plugins/electronStore'
import BaseHeaderSegmentsContainer
  from '@/components/containers/segments/BaseHeaderSegmentsContainer.vue'
import getHistory from '@/helpers/actions/api/history/get'
import {
  sortByCreated
} from '@/helpers/utils'

export default {
  name: 'BaseHistorySegmentContainer',
  components: {
    BaseHeaderSegmentsContainer
  },
  props: {
    scope: {
      type: String,
      required: true
    },
    isGetData: {
      type: Boolean,
      default: true
    },
    limit: Number,
    headerLink: Object
  },
  data () {
    return {
      historyData: null,
      error: null,
      isLoading: false
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
    }
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
      }
    }
  },
  methods: {
    getHistory,
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
    },
    focus () {
      this.$refs
        .segment
        .focus()
    }
  }
}
</script>

<style lang="sass" scoped></style>
