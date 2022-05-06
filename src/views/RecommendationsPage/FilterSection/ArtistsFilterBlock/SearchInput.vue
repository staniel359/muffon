<template>
  <BaseSearchInput
    ref="input"
    :url="url"
    :fields="fields"
    :format-response="formatResponse"
    @select="handleSelect"
  />
</template>

<script>
import {
  mapGetters
} from 'vuex'
import BaseSearchInput from '*/components/inputs/BaseSearchInput.vue'
import {
  generateKey
} from '*/helpers/utils'

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
    'select'
  ],
  computed: {
    ...mapGetters(
      'profile',
      {
        profileId: 'id'
      }
    ),
    url () {
      return (
        `/profiles/${this.profileId}` +
        '/library/search/artists' +
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
          'select',
          artistData
        )
      }

      this.clear()
    },
    formatResponse (
      response
    ) {
      return response
        .profile
        .library
        .artists
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
