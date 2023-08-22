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
  mapState
} from 'pinia'
import profileStore from '@/stores/profile'
import BaseSearchInput from '@/components/inputs/BaseSearchInput.vue'

export default {
  name: 'ArtistsInput',
  components: {
    BaseSearchInput
  },
  inject: [
    'addCollectionItem'
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
    ...mapState(
      profileStore,
      {
        profileId: 'id'
      }
    ),
    url () {
      return (
        `profiles/${this.profileId}` +
        '/library/search/artists' +
        '?query={query}&limit=5&minimal=true'
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
            collection: 'collection',
            item: artist
          }
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
