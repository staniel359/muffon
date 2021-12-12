<template>
  <div
    class="ui fluid search main-search-input-container"
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
import { setSearch } from '#/actions/plugins/semantic'

export default {
  name: 'TagsSearchInput',
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
        apiSettings: {
          url: this.searchUrl,
          onResponse: this.formatResponse
        },
        cache: false,
        error: {
          serverError: this.$t(
            'shared.error'
          )
        },
        fields: {
          results: 'tags',
          title: 'name',
          image: null
        },
        minCharacters: 1,
        maxResults: 5,
        onSelect: this.handleTagSelect,
        searchDelay: 500,
        searchOnFocus: false
      }
    },
    searchUrl () {
      return `${axios.defaults.baseURL}` +
        'lastfm/search/tags' +
        '?query={query}&limit=5'
    }
  },
  mounted () {
    setSearch(
      this.$refs.search,
      this.searchOptions
    )
  },
  methods: {
    handleTagSelect (tag) {
      this.$emit(
        'select',
        tag.name
      )
    },
    formatResponse (response) {
      return response.search.tags
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
