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
        :placeholder="textFormatted"
      >
      <i class="search icon"></i>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import { setSearch } from '#/actions/plugins/semantic'

export default {
  name: 'ArtistsSearchInput',
  emits: [
    'select'
  ],
  computed: {
    textFormatted () {
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
          results: 'artists',
          title: 'name',
          image: null
        },
        minCharacters: 1,
        maxResults: 5,
        onSelect: this.handleArtistSelect,
        searchDelay: 500,
        searchOnFocus: false
      }
    },
    searchUrl () {
      return `${axios.defaults.baseURL}` +
        'lastfm/search/artists' +
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
    handleArtistSelect (artist) {
      this.$emit(
        'select',
        artist.name
      )
    },
    formatResponse (response) {
      return response.search.artists
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
