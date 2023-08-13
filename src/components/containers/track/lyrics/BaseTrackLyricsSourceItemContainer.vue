<template>
  <slot
    :is-loading="!isAllLoaded"
    :is-error="isAllErrors"
    :tracks-data="tracksData"
  />
</template>

<script>
import getSearch from '@/helpers/actions/api/search/get'

export default {
  name: 'BaseTrackLyricsSourceItemContainer',
  props: {
    source: {
      type: String,
      required: true
    },
    query: {
      type: String,
      required: true
    }
  },
  data () {
    return {
      searchData: null,
      error: null,
      tracksData: null,
      successCount: 0,
      emptyCount: 0,
      errorCount: 0,
      scope: 'tracks'
    }
  },
  computed: {
    isAllLoaded () {
      return (
        this.collectionsCount === 1
      )
    },
    collectionsCount () {
      return (
        this.successCount +
          this.emptyCount +
          this.errorCount
      )
    },
    isAllErrors () {
      return (
        this.errorCount === 1
      )
    },
    searchArgs () {
      return {
        source: this.source,
        scope: this.scope,
        query: this.query
      }
    }
  },
  watch: {
    searchData: 'handleSearchDataChange',
    error: 'handleError'
  },
  mounted () {
    this.getData()
  },
  methods: {
    getSearch,
    handleSearchDataChange (
      value
    ) {
      if (value) {
        this.formatTracksData()
      }
    },
    handleError (
      value
    ) {
      if (value) {
        this.errorCount++
      }
    },
    getData () {
      this.getSearch(
        this.searchArgs
      )
    },
    formatTracksData () {
      const collection =
        this.searchData[
          this.scope
        ]

      if (collection) {
        if (collection.length) {
          this.tracksData = {
            [this.scope]: collection
          }

          this.successCount++
        } else {
          this.emptyCount++
        }
      }
    }
  }
}
</script>

<style lang="sass" scoped></style>
