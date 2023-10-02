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
    v-if="albums.length"
    @click="handleClearButtonClick"
  />
</template>

<script>
import BaseSearchInput from '@/components/inputs/BaseSearchInput.vue'
import BaseClearButton from '@/components/buttons/BaseClearButton.vue'
import {
  fields as albumFields,
  format as formatAlbum
} from '@/helpers/formatters/search/album'

export default {
  name: 'AlbumsInput',
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
    albums: {
      type: Array,
      default () {
        return []
      }
    }
  },
  data () {
    return {
      scope: 'albums'
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
      return albumFields
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
        this.addCollectionItem(
          {
            collection: this.scope,
            item: album
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
        albums
      } = response.search

      return albums.map(
        formatAlbum
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
