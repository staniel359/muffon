<template>
  <div
    class="ui fluid search search-tracks-input"
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
  name: 'SearchInput',
  props: {
    tracks: {
      type: Array,
      default () {
        return []
      }
    }
  },
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
          results: 'tracks',
          title: 'title',
          description: 'artistName',
          image: null
        },
        minCharacters: 1,
        maxResults: 5,
        onSelect: this.handleTrackSelect,
        searchDelay: 500,
        searchOnFocus: false
      }
    },
    searchUrl () {
      return `${axios.defaults.baseURL}` +
        'lastfm/search/tracks' +
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
    handleTrackSelect (track) {
      const isTrackPresent = trackData => {
        return (
          track.title === trackData.title &&
            track.artist.name === trackData.artist.name
        )
      }
      const isPresent = this.tracks.find(
        isTrackPresent
      )

      if (!isPresent) {
        this.$emit(
          'select',
          track
        )
      }
    },
    formatResponse (response) {
      const { tracks } = response.search

      return tracks.map(
        this.formatTrack
      )
    },
    formatTrack (trackData) {
      return {
        ...trackData,
        artistName: trackData.artist.name
      }
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

<style lang="sass" scoped>
.search-tracks-input
  @extend .flex-full
</style>
