<template>
  <BaseSearchInput
    ref="input"
    :url="url"
    :fields="fields"
    :formatResponse="formatResponse"
    @select="handleSelect"
  />
</template>

<script>
import { mapState } from 'vuex'
import BaseSearchInput from '@/inputs/BaseSearchInput.vue'
import { artistName as formatArtistName } from '#/formatters'

export default {
  name: 'TracksInput',
  components: {
    BaseSearchInput
  },
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
    ...mapState('profile', {
      profileInfo: 'info'
    }),
    url () {
      return (
        '/lastfm/search/tracks' +
        '?query={query}&limit=5' +
        `&profile_id=${this.profileId}`
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
    handleSelect (track) {
      const isTrackPresent = trackData => {
        const isSameTitle = (
          track.title ===
            trackData.title
        )

        const isSameArtistName = (
          track.artistName ===
            trackData.artistName
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

      const isInLibrary =
        !!track.library_id

      const isAddTrack = (
        !isPresent && !isInLibrary
      )

      if (isAddTrack) {
        this.$emit(
          'select',
          track
        )
      }

      this.clear()
    },
    formatResponse (response) {
      const { tracks } = response.search

      return tracks.map(
        this.formatTrack
      )
    },
    formatTrack (trackData) {
      const artistName =
        formatArtistName(
          trackData.artists
        )

      return {
        ...trackData,
        artistName
      }
    },
    focus () {
      this.$refs.input.focus()
    },
    clear () {
      this.$refs.input.clear()
    }
  }
}
</script>

<style lang="sass" scoped></style>
