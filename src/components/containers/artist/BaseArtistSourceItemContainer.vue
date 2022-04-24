<template>
  <slot
    :is-loading="isLoading"
    :is-error="!!error"
    :artists="artists"
  />
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
      searchData: null,
      error: null,
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
    this.getData()
  },
  methods: {
    getSearch,
    getData () {
      this.getSearch(
        this.searchArgs
      )
    }
  }
}
</script>

<style lang="sass" scoped></style>
