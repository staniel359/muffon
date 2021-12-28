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
import { artistName as formatArtistName } from '#/formatters/artist'

export default {
  name: 'AlbumsInput',
  components: {
    BaseSearchInput
  },
  props: {
    albums: {
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
        '/lastfm/search/albums' +
        '?query={query}&limit=5' +
        `&profile_id=${this.profileId}`
      )
    },
    profileId () {
      return this.profileInfo.id
    },
    fields () {
      return {
        results: 'albums',
        title: 'title',
        description: 'artistName',
        image: null
      }
    }
  },
  methods: {
    handleSelect (album) {
      const isAlbumPresent = albumData => {
        const isSameTitle = (
          album.title ===
            albumData.title
        )

        const isSameArtistName = (
          album.artistName ===
            albumData.artistName
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

      const isInLibrary =
        !!album.library_id

      const isAddAlbum = (
        !isPresent && !isInLibrary
      )

      if (isAddAlbum) {
        this.$emit(
          'select',
          album
        )
      }

      this.clear()
    },
    formatResponse (response) {
      const { albums } = response.search

      return albums.map(
        this.formatAlbum
      )
    },
    formatAlbum (albumData) {
      const artistName =
        formatArtistName(
          albumData.artists
        )

      return {
        ...albumData,
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

<style lang="sass" scoped>
.search-albums-input
  @extend .flex-full
</style>
