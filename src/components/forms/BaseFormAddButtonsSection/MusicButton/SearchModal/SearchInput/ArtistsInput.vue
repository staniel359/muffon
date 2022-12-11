<template>
  <BaseSearchInput
    ref="input"
    class="search-input artists-input"
    :url="url"
    :fields="fields"
    :format-response="formatResponse"
    @select="handleSelect"
  />

  <BaseClearButton
    v-if="artists.length"
    @click="handleClearButtonClick"
  />
</template>

<script>
import BaseSearchInput from '@/components/inputs/BaseSearchInput.vue'
import BaseClearButton from '@/components/buttons/BaseClearButton.vue'
import {
  fields as artistFields,
  format as formatArtist
} from '@/helpers/formatters/search/artist'

export default {
  name: 'ArtistsInput',
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
    artists: {
      type: Array,
      default () {
        return []
      }
    }
  },
  computed: {
    url () {
      return (
        `${this.source}/search/artists` +
        '?query={query}&limit=5'
      )
    },
    fields () {
      return artistFields
    }
  },
  methods: {
    handleSelect (
      artist
    ) {
      function isArtistPresent (
        artistData
      ) {
        return (
          artist.name ===
            artistData.name
        )
      }

      const isPresent =
        this.artists.find(
          isArtistPresent
        )

      if (!isPresent) {
        this.addCollectionItem(
          {
            collection: 'artists',
            item: artist
          }
        )
      }

      this.clear()
    },
    handleClearButtonClick () {
      this.resetCollection(
        'artists'
      )

      this.clear()

      this.focus()
    },
    formatResponse (
      response
    ) {
      const {
        artists
      } = response.search

      return artists.map(
        formatArtist
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
