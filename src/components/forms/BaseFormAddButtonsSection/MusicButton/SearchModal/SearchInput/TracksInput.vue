<template>
  <BaseSearchInput
    ref="input"
    class="search-input tracks-input"
    :url="url"
    :fields="fields"
    :format-response="formatResponse"
    @select="handleSelect"
  />

  <BaseClearButton
    v-if="tracks.length"
    @click="handleClearButtonClick"
  />
</template>

<script>
import BaseSearchInput from '@/components/inputs/BaseSearchInput.vue'
import BaseClearButton from '@/components/buttons/BaseClearButton.vue'

export default {
  name: 'TracksInput',
  components: {
    BaseSearchInput,
    BaseClearButton
  },
  inject: [
    'addCollectionItem',
    'resetCollection'
  ],
  props: {
    source: {
      type: String,
      required: true
    },
    tracks: {
      type: Array,
      default () {
        return []
      }
    }
  },
  data () {
    return {
      defaultImage:
        'https://lastfm.freetls.fastly.net/i/u/300x300/4128a6eb29f94943c9d206c08e625904.png'
    }
  },
  computed: {
    url () {
      return (
        `${this.source}/search/tracks` +
        '?query={query}&limit=5'
      )
    },
    fields () {
      return {
        results: 'tracks',
        title: 'title',
        description: 'artistNameWithAlbumTitle',
        image: 'imageExtrasmall'
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

      if (!isPresent) {
        this.addCollectionItem(
          {
            collection: 'tracks',
            item: track
          }
        )
      }

      this.clear()
    },
    handleClearButtonClick () {
      this.resetCollection(
        'tracks'
      )

      this.clear()

      this.focus()
    },
    formatResponse (
      response
    ) {
      const {
        tracks
      } = response.search

      return tracks.map(
        this.formatTrack
      )
    },
    formatTrack (
      trackData
    ) {
      const artistName =
        trackData.artist.name

      const albumTitle =
        trackData.album?.title

      const albumTitleFormatted = (
        albumTitle &&
          `<div class="main-small-container">
            <small>
              ${albumTitle}
            </small>
          </div>`
      )

      const artistNameWithAlbumTitle = [
        artistName,
        albumTitleFormatted
      ].filter(
        e => e
      ).join(
        '<br />'
      )

      const imageExtrasmall = (
        trackData.image?.extrasmall ||
          this.defaultImage
      )

      return {
        ...trackData,
        artistNameWithAlbumTitle,
        imageExtrasmall
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

<style lang="sass" scoped></style>
