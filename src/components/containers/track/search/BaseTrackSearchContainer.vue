<template>
  <slot
    :isLoading="isLoading"
    :isError="!!error"
    :[scope]="collection"
  ></slot>

  <BaseError
    v-if="error"
    :error="error"
    @refresh="handleRefresh"
  />
</template>

<script>
import BaseError from '@/BaseError.vue'
import fetchSearchData from '#/actions/api/search/fetchData'

export default {
  name: 'BaseTrackSearchContainer',
  components: {
    BaseError
  },
  props: {
    query: {
      type: String,
      required: true
    },
    sourceId: {
      type: String,
      required: true
    },
    scope: {
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
        scope: this.scope,
        query: this.query
      }
    },
    collection () {
      return this.searchData?.[this.scope]
    }
  },
  mounted () {
    this.fetchData()
  },
  methods: {
    handleRefresh () {
      this.error = null

      this.fetchData()
    },
    fetchSearchData,
    fetchData () {
      this.fetchSearchData(
        this.searchDataArgs
      )
    }
  }
}
</script>

<style lang="sass" scoped></style>
