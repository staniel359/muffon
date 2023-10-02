<template>
  <BaseSearchInput
    ref="input"
    class="main-simple-search-input"
    :url="url"
    :fields="fields"
    :format-response="formatResponse"
    :scope="scope"
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
import {
  fields as trackFields,
  format as formatTrack
} from '@/helpers/formatters/search/track'

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
      scope: 'tracks'
    }
  },
  computed: {
    url () {
      return (
        `${this.source}/search/${this.scope}` +
        '?query={query}&limit=5'
      )
    },
    fields () {
      return trackFields
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
            collection: this.scope,
            item: track
          }
        )
      }

      this.clear()
    },
    handleClearButtonClick () {
      this.resetCollection(
        this.scope
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
        formatTrack
      )
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
