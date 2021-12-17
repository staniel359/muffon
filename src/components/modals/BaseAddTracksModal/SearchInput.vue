<template>
  <BaseSearchInput
    ref="input"
    class="search-input"
    :url="url"
    :fields="fields"
    :formatResponse="formatResponse"
    @select="handleSelect"
  />
</template>

<script>
import BaseSearchInput from '@/inputs/BaseSearchInput.vue'

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
    }
  },
  emits: [
    'select'
  ],
  computed: {
    url () {
      return (
        '/lastfm/search/tracks' +
        '?query={query}&limit=5'
      )
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

      if (!isPresent) {
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
      return {
        ...trackData,
        artistName:
          trackData.artist.name
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

<style lang="sass" scoped>
.search-input
  @extend .flex-full
</style>
