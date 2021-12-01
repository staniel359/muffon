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
import { mapState } from 'vuex'
import { setSearch } from '#/actions/plugins/semantic'
import { generateKey } from '#/utils'

export default {
  name: 'SearchInput',
  props: {
    artists: {
      type: Array,
      default () {
        return []
      }
    }
  },
  emits: [
    'addArtist'
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
        `profiles/${this.profileId}` +
        '/library/search/artists' +
        '?query={query}&limit=5'
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
        return artist.id === artistData.id
      }

      const isPresent = this.artists.find(
        isArtistPresent
      )

      if (!isPresent) {
        const artistData = {
          uuid: generateKey(),
          ...artist
        }

        this.$emit(
          'addArtist',
          artistData
        )

        this.clear()
      }
    },
    formatResponse (response) {
      return response.profile.library.artists
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
