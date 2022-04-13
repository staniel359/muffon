<template>
  <slot
    :is-loading="isLoading"
    :is-error="!!error"
    :tracks="tracks"
  />
</template>

<script>
import getSearch from '*/helpers/actions/api/search/get'

export default {
  name: 'BaseTrackSourceItemContainer',
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
      scope: 'tracks'
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
    tracks () {
      return this.searchData?.tracks
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
