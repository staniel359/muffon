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
      isLoading: false,
      scope: 'tracks'
    }
  },
  computed: {
    searchArgs () {
      return {
        source: this.source,
        query: this.query,
        scope: this.scope
      }
    },
    tracks () {
      return this.searchData?.tracks
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
