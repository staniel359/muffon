<template>
  <slot
    :isLoading="isLoading"
    :isError="!!error"
    :[scope]="collection"
  ></slot>

  <BaseErrorMessage
    class="error-message"
    v-if="error"
    :error="error"
    isWithRefreshButton
    @refresh="handleRefresh"
  />
</template>

<script>
import BaseErrorMessage from '*/components/messages/BaseErrorMessage.vue'
import getSearch from '*/helpers/actions/api/search/get'

export default {
  name: 'BaseTrackSearchContainer',
  components: {
    BaseErrorMessage
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
    searchArgs () {
      return {
        sourceId: this.sourceId,
        scope: this.scope,
        query: this.query
      }
    },
    collection () {
      return this.searchData?.[
        this.scope
      ]
    }
  },
  mounted () {
    this.fetchData()
  },
  methods: {
    handleRefresh () {
      this.fetchData()
    },
    getSearch,
    fetchData () {
      this.getSearch(
        this.searchArgs
      )
    }
  }
}
</script>

<style lang="sass" scoped>
.error-message
  margin-top: 1em !important
</style>
