<template>
  <slot
    :isLoading="isLoading"
    :isError="!!error"
    :tracks="tracks"
  ></slot>
</template>

<script>
import getSearch from '#/actions/api/search/get'

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
      isLoading: false
    }
  },
  computed: {
    searchArgs () {
      return {
        sourceId: this.sourceId,
        query: this.query,
        scope: 'tracks'
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
