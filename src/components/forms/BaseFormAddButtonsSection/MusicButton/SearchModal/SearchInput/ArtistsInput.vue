<template>
  <BaseSearchInput
    ref="input"
    class="search-input"
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
import BaseSearchInput from '*/components/inputs/BaseSearchInput.vue'
import BaseClearButton from '*/components/buttons/BaseClearButton.vue'

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
        'lastfm/search/artists' +
        '?query={query}&limit=5'
      )
    },
    fields () {
      return {
        results: 'artists',
        title: 'name',
        image: null
      }
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
      return response.search.artists
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
