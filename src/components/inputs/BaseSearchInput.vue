<template>
  <div
    class="ui fluid search main-search-input"
    ref="search"
  >
    <div class="ui icon fluid input">
      <input
        ref="input"
        class="prompt"
        type="text"
        :placeholder="searchText"
      >
      <i class="search icon"></i>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import { setSearch } from '*/helpers/actions/plugins/semantic'

export default {
  name: 'BaseSearchInput',
  props: {
    url: {
      type: String,
      required: true
    },
    fields: {
      type: Object,
      required: true
    },
    formatResponse: {
      type: Function,
      required: true
    }
  },
  emits: [
    'select'
  ],
  computed: {
    searchText () {
      return this.$t(
        'inputs.search'
      )
    },
    searchOptions () {
      return {
        apiSettings:
          this.apiSettingsData,
        cache: false,
        error: this.errorData,
        fields: this.fields,
        maxResults: 5,
        minCharacters: 1,
        onSelect: this.handleSelect,
        searchDelay: 500,
        searchOnFocus: false
      }
    },
    apiSettingsData () {
      return {
        url: this.urlFormatted,
        onResponse:
          this.formatResponse
      }
    },
    urlFormatted () {
      return [
        axios.defaults.baseURL,
        this.url
      ].join('')
    },
    errorData () {
      return {
        serverError: this.$t(
          'error'
        )
      }
    }
  },
  mounted () {
    setSearch(
      this.$refs.search,
      this.searchOptions
    )
  },
  methods: {
    handleSelect (value) {
      this.$emit(
        'select',
        value
      )
    },
    focus () {
      this.$refs.input.focus()
    },
    clear () {
      this.$refs.input.value = ''
    }
  }
}
</script>

<style lang="sass" scoped></style>
