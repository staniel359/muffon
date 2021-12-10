<template>
  <slot
    :isLoading="isLoading"
    :isError="!!error"
    :artists="artists"
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
    searchDataArgs () {
      return {
        sourceId: this.sourceId,
        query: this.query
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
    fetchSearchData,
    fetchData () {
      this.fetchSearchData({
        ...this.searchDataArgs,
        scope: 'artists'
      })
    }
  }
}
</script>

<style lang="sass" scoped></style>
