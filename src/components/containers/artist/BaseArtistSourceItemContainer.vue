<template>
  <slot
    :isLoading="isLoading"
    :isError="!!error"
    :artists="artists"
  ></slot>
</template>

<script>
import getSearch from '*/helpers/actions/api/search/get'

export default {
  name: 'BaseArtistSourceItemContainer',
  props: {
    sourceId: {
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
      error: null,
      searchData: null,
      isLoading: false,
      scope: 'artists'
    }
  },
  computed: {
    searchArgs () {
      return {
        sourceId: this.sourceId,
        query: this.query,
        scope: this.scope
      }
    },
    artists () {
      return this.searchData?.artists
    }
  },
  mounted () {
    this.fetchData()
  },
  methods: {
    getSearch,
    fetchData () {
      this.getSearch(
        this.searchArgs
      )
    }
  }
}
</script>

<style lang="sass" scoped></style>
