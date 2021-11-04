<template>
  <div
    class="ui fluid search search-artists-input"
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
import { mapState } from 'vuex'
import { setSearch } from '#/actions/plugins/semantic'

export default {
  name: 'SearchArtistsInput',
  props: {
    artists: {
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
    ...mapState('profile', {
      profileInfo: 'info'
    }),
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
        '?query={query}&limit=5' +
        `&profile_id=${this.profileId}`
    },
    profileId () {
      return this.profileInfo.id
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
      const isArtistPresent = artistData => {
        return artist.name === artistData.name
      }
      const isPresent = this.artists.find(
        isArtistPresent
      )
      const isInLibrary = !!artist.library_id
      const isAddArtist = (
        !isPresent && !isInLibrary
      )

      if (isAddArtist) {
        this.$emit(
          'select',
          artist
        )
      }
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

<style lang="sass" scoped>
.search-artists-input
  @extend .flex-full
</style>
