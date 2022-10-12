<template>
  <slot
    :is-loading="!isAllLoaded"
    :is-error="isAllErrors"
    :albums-data="albumsData"
  />
</template>

<script>
import getSearch from '@/helpers/actions/api/search/get'

export default {
  name: 'BaseAlbumSourceItemContainer',
  props: {
    source: {
      type: String,
      required: true
    },
    query: {
      type: String,
      required: true
    },
    types: {
      type: Array,
      default () {
        return []
      }
    }
  },
  data () {
    return {
      searchData: null,
      error: null,
      albumsData: null,
      successCount: 0,
      emptyCount: 0,
      errorCount: 0
    }
  },
  computed: {
    isAllLoaded () {
      return (
        this.collectionsCount ===
          this.scopesCount
      )
    },
    collectionsCount () {
      return (
        this.successCount +
          this.emptyCount +
          this.errorCount
      )
    },
    scopesCount () {
      return this.scopes.length
    },
    scopes () {
      return this.types.map(
        this.formatType
      )
    },
    isAllErrors () {
      return (
        this.errorCount ===
          this.scopesCount
      )
    },
    searchArgs () {
      return {
        source: this.source,
        query: this.query
      }
    }
  },
  watch: {
    searchData: 'handleSearchDataChange',
    error: 'handleError'
  },
  mounted () {
    this.getScopesData()
  },
  methods: {
    getSearch,
    handleSearchDataChange (
      value
    ) {
      if (value) {
        this.formatScopesData()
      }
    },
    handleError (
      value
    ) {
      if (value) {
        this.errorCount++
      }
    },
    formatType (
      type
    ) {
      return `${type}s`
    },
    getScopesData () {
      this.scopes.forEach(
        this.getScopeData
      )
    },
    getScopeData (
      scope
    ) {
      this.getSearch(
        {
          ...this.searchArgs,
          scope
        }
      )
    },
    formatScopesData () {
      this.scopes.forEach(
        this.formatScopeData
      )
    },
    formatScopeData (
      scope
    ) {
      const collection =
        this.searchData[scope]

      if (collection) {
        if (collection.length) {
          this.albumsData = {
            ...this.albumsData,
            [scope]: collection
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
