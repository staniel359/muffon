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
        :placeholder="searchText"
      >
      <i class="search icon"></i>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
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
    },
    playlistId: {
      type: String,
      required: true
    }
  },
  emits: [
    'select'
  ],
  computed: {
    ...mapState('profile', {
      profileInfo: 'info'
    }),
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
        `profiles/${this.profileId}` +
        '/library/search/tracks' +
        '?query={query}&limit=5' +
        `&playlist_id=${this.playlistId}`
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
    handleTrackSelect (track) {
      const isTrackPresent = trackData => {
        const isSameTitle = (
          track.title ===
            trackData.title
        )
        const isSameArtistName = (
          track.artist.name ===
            trackData.artist.name
        )

        return (
          isSameTitle &&
            isSameArtistName
        )
      }

      const isPresent =
        this.tracks.find(
          isTrackPresent
        )
      const isInPlaylist =
        !!track.playlist_track_id

      const isAddTrack = (
        !isPresent && !isInPlaylist
      )

      if (isAddTrack) {
        this.$emit(
          'select',
          track
        )
      }
    },
    formatResponse (response) {
      return response.profile.library.tracks.map(trackData => {
        return {
          ...trackData,
          artistName: trackData.artist.name
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
.search-tracks-input
  @extend .flex-full
</style>
