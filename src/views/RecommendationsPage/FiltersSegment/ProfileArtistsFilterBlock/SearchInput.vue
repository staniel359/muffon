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
import BaseSearchInput from '*/components/inputs/BaseSearchInput.vue'
import { generateKey } from '*/helpers/utils'

export default {
  name: 'SearchInput',
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
    'addArtist'
  ],
  computed: {
    ...mapState('profile', {
      profileInfo: 'info'
    }),
    url () {
      return (
        `/profiles/${this.profileId}` +
        '/library/search/artists' +
        '?query={query}&limit=5'
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
          artist.id ===
            artistData.id
        )
      }

      const isPresent =
        this.artists.find(
          isArtistPresent
        )

      if (!isPresent) {
        const artistData = {
          uuid: generateKey(),
          ...artist
        }

        this.$emit(
          'addArtist',
          artistData
        )
      }

      this.clear()
    },
    formatResponse (response) {
      return response
        .profile
        .library
        .artists
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
