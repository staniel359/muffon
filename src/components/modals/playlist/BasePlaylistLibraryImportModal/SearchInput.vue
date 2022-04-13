<template>
  <BaseSearchInput
    ref="input"
    class="search-input"
    :url="url"
    :fields="fields"
    :format-response="formatResponse"
    @select="handleSelect"
  />
</template>

<script>
import {
  mapState
} from 'vuex'
import BaseSearchInput from '*/components/inputs/BaseSearchInput.vue'

export default {
  name: 'SearchInput',
  components: {
    BaseSearchInput
  },
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
    ...mapState(
      'profile',
      {
        profileInfo: 'info'
      }
    ),
    url () {
      return (
        `/profiles/${this.profileId}` +
        '/library/search/tracks' +
        '?query={query}&limit=5' +
        `&playlist_id=${this.playlistId}`
      )
    },
    profileId () {
      return this.profileInfo.id
    },
    fields () {
      return {
        results: 'tracks',
        title: 'title',
        description: 'artistName',
        image: null
      }
    }
  },
  methods: {
    handleSelect (
      track
    ) {
      function isTrackPresent (
        trackData
      ) {
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

      this.clear()
    },
    formatResponse (
      response
    ) {
      const {
        tracks
      } = response.profile.library

      return tracks.map(
        this.formatTrack
      )
    },
    formatTrack (
      trackData
    ) {
      return {
        ...trackData,
        artistName:
          trackData.artist.name
      }
    },
    focus () {
      this.$refs
        .input
        .focus()
    },
    clear () {
      this.$refs
        .input
        .clear()
    }
  }
}
</script>

<style lang="sass" scoped>
.search-input
  @extend .flex-full
</style>
