<template>
  <slot
    :isLoading="!isAllLoaded"
    :isError="isAllErrors"
    :albumsData="albumsData"
  ></slot>
</template>

<script>
import getSearch from '*/helpers/actions/api/search/get'

export default {
  name: 'BaseAlbumSourceItemContainer',
  props: {
    sourceId: {
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
      error: null,
      searchData: null,
      isLoading: false,
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
        sourceId: this.sourceId,
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
    this.fetchTypesData()
  },
  methods: {
    handleSearchDataChange (value) {
      if (value) {
        this.formatTypesData()
      }
    },
    handleError (value) {
      if (value) {
        this.errorCollectionsCount++
      }
    },
    getSearch,
    fetchTypesData () {
      this.types.map(
        this.fetchTypeData
      )
    },
    fetchTypeData (type) {
      const formatScope = () => {
        if (type === 'albumVarious') {
          return 'albums_various'
        } else {
          return `${type}s`
        }
      }

      this.getSearch({
        ...this.searchArgs,
        scope: formatScope()
      })
    },
    formatTypesData () {
      this.types.map(
        this.formatTypeData
      )
    },
    formatTypeData (type) {
      const formatScope = () => {
        if (type === 'albumVarious') {
          return 'albums_various'
        } else {
          return `${type}s`
        }
      }
      const scope = formatScope()

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
