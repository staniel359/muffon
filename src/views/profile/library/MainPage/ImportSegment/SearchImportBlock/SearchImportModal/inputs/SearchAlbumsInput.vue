<template>
  <div
    class="ui fluid search search-albums-input"
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
  name: 'SearchAlbumsInput',
  props: {
    albums: {
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
        'inputs.search.albums'
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
          results: 'albums',
          title: 'title',
          description: 'artistName',
          image: null
        },
        minCharacters: 1,
        maxResults: 5,
        onSelect: this.handleAlbumSelect,
        searchDelay: 500,
        searchOnFocus: false
      }
    },
    searchUrl () {
      return `${axios.defaults.baseURL}` +
        'lastfm/search/albums' +
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
    handleAlbumSelect (album) {
      const isAlbumPresent = albumData => {
        return (
          album.title === albumData.title &&
            album.artist.name === albumData.artist.name
        )
      }
      const isPresent = this.albums.find(
        isAlbumPresent
      )
      const isInLibrary = !!album.library_id
      const isAddAlbum = (
        !isPresent && !isInLibrary
      )

      if (isAddAlbum) {
        this.$emit(
          'select',
          album
        )
      }
    },
    formatResponse (response) {
      return response.search.albums.map(albumData => {
        return {
          ...albumData,
          artistName: albumData.artist.name
        }
      })
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
.search-albums-input
  @extend .flex-full
</style>
