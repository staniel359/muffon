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

export default {
  name: 'ArtistsInput',
  components: {
    BaseSearchInput
  },
  props: {
    artists: {
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
        '/lastfm/search/artists' +
        '?query={query}&limit=5' +
        `&profile_id=${this.profileId}`
      )
    },
    profileId () {
      return this.profileInfo.id
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
    handleSelect (artist) {
      const isArtistPresent = artistData => {
        return (
          artist.name ===
            artistData.name
        )
      }

      const isPresent =
        this.artists.find(
          isArtistPresent
        )

      const isInLibrary =
        !!artist.library_id

      const isAddArtist = (
        !isPresent && !isInLibrary
      )

      if (isAddArtist) {
        this.$emit(
          'select',
          artist
        )
      }

      this.clear()
    },
    formatResponse (response) {
      return response.search.artists
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
