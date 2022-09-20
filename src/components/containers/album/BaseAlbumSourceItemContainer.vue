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
      loadedCollectionsCount: 0,
      errorCollectionsCount: 0,
      albumsData: {}
    }
  },
  computed: {
    isAllLoaded () {
      return (
        this.collectionsCount ===
          this.typesCount
      )
    },
    collectionsCount () {
      return (
        this.loadedCollectionsCount +
          this.errorCollectionsCount
      )
    },
    typesCount () {
      return this.types.length
    },
    isAllErrors () {
      return (
        this.errorCollectionsCount ===
          this.typesCount
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
    searchData: {
      immediate: true,
      handler: 'handleSearchDataChange'
    },
    error: 'handleError'
  },
  mounted () {
    this.getTypesData()
  },
  methods: {
    getSearch,
    handleSearchDataChange (
      value
    ) {
      if (value) {
        this.formatTypesData()
      }
    },
    handleError (
      value
    ) {
      if (value) {
        this.errorCollectionsCount++
      }
    },
    getTypesData () {
      this.types.map(
        this.getTypeData
      )
    },
    getTypeData (
      type
    ) {
      const scope =
        this.formatScope(
          type
        )

      this.getSearch(
        {
          ...this.searchArgs,
          scope
        }
      )
    },
    formatScope (
      type
    ) {
      if (type === 'albumVarious') {
        return 'albums_various'
      } else {
        return `${type}s`
      }
    },
    formatTypesData () {
      this.types.map(
        this.formatTypeData
      )
    },
    formatTypeData (
      type
    ) {
      const scope =
        this.formatScope(
          type
        )

      if (this.searchData[scope]) {
        this.albumsData[scope] =
          this.searchData[scope]

        this.loadedCollectionsCount++
      }
    }
  }
}
</script>

<style lang="sass" scoped></style>
