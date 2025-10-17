<template>
  <slot
    :is-loading="isLoading"
    :is-error="isError"
    :videos="videos"
  />
</template>

<script>
import getSearch from '@/helpers/actions/api/search/get'

export default {
  name: 'BaseTrackVideoSourceItemContainer',
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
      isLoading: false,
      isError: false,
      scope: 'videos'
    }
  },
  computed: {
    searchArgs () {
      return {
        scope: this.scope,
        source: this.source,
        query: this.query
      }
    },
    videos () {
      return this.searchData?.[
        this.scope
      ]
    }
  },
  mounted () {
    this.getVideos()
  },
  methods: {
    getSearch,
    getVideos () {
      this.isLoading = true

      this.getSearch(
        this.searchArgs
      ).catch(
        this.handleError
      ).finally(
        this.handleFinish
      )
    },
    handleError () {
      this.isError = true
    },
    handleFinish () {
      this.isLoading = false
    }
  }
}
</script>

<style lang="sass" scoped></style>
