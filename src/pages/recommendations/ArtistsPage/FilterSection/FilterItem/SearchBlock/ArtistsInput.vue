<template>
  <BaseSearchInput
    ref="input"
    :url="url"
    :fields="fields"
    :format-response="formatResponse"
    :scope="scope"
    @select="handleSelect"
  />
</template>

<script>
import {
  mapState
} from 'pinia'
import profileStore from '@/stores/profile'
import BaseSearchInput from '@/components/inputs/BaseSearchInput.vue'
import {
  fields as artistFields,
  format as formatArtist
} from '@/helpers/formatters/search/artist'

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
  data () {
    return {
      scope: 'artists'
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
        `/library/search/${this.scope}` +
        '?query={query}&limit=5&minimal=true'
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
      const {
        artists
      } = response.profile.library

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
