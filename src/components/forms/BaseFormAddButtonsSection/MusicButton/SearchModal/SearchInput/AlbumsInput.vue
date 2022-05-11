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
    v-if="albums.length"
    class="reset-button"
    @click="handleResetButtonClick"
  />
</template>

<script>
import BaseSearchInput from '*/components/inputs/BaseSearchInput.vue'
import BaseClearButton from '*/components/buttons/BaseClearButton.vue'

export default {
  name: 'AlbumsInput',
  components: {
    BaseSearchInput,
    BaseClearButton
  },
  inject: [
    'addModel',
    'resetCollection'
  ],
  props: {
    albums: {
      type: Array,
      default () {
        return []
      }
    }
  },
  computed: {
    url () {
      return (
        '/lastfm/search/albums' +
        '?query={query}&limit=5'
      )
    },
    fields () {
      return {
        results: 'albums',
        title: 'title',
        description: 'artistName',
        image: 'imageExtrasmall'
      }
    }
  },
  methods: {
    handleSelect (
      album
    ) {
      function isAlbumPresent (
        albumData
      ) {
        const isSameTitle = (
          album.title ===
            albumData.title
        )

        const isSameArtistName = (
          album.artist.name ===
            albumData.artist.name
        )

        return (
          isSameTitle &&
            isSameArtistName
        )
      }

      const isPresent =
        this.albums.find(
          isAlbumPresent
        )

      if (!isPresent) {
        this.addModel(
          {
            model: album,
            scope: 'albums'
          }
        )
      }

      this.clear()
    },
    handleResetButtonClick () {
      this.resetCollection(
        'albums'
      )

      this.clear()

      this.focus()
    },
    formatResponse (
      response
    ) {
      const {
        albums
      } = response.search

      return albums.map(
        this.formatAlbum
      )
    },
    formatAlbum (
      albumData
    ) {
      return {
        ...albumData,
        artistName:
          albumData.artist.name,
        imageExtrasmall:
          albumData.image?.extrasmall
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
