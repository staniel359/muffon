<template>
  <slot
    :isLoading="!isAllLoaded"
    :isError="isAllErrors"
    :albumsData="albumsData"
  ></slot>
</template>

<script>
import fetchSearchData from '#/actions/api/search/fetchData'

export default {
  name: 'BaseSourceItemContainer',
  props: {
    sourceId: {
      type: String,
      required: true
    },
    artistName: {
      type: String,
      required: true
    },
    albumTitle: {
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
    searchDataArgs () {
      return {
        sourceId: this.sourceId,
        query: this.query
      }
    },
    query () {
      return `${this.artistName} - ${this.albumTitle}`
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
      value && this.formatTypesData()
    },
    handleError () {
      this.errorCollectionsCount++
    },
    fetchSearchData,
    fetchTypesData () {
      this.types.map(this.fetchTypeData)
    },
    fetchTypeData (type) {
      this.fetchSearchData({
        ...this.searchDataArgs,
        scope: `${type}s`
      })
    },
    formatTypesData () {
      this.types.map(this.formatTypeData)
    },
    formatTypeData (type) {
      const scope = `${type}s`

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
