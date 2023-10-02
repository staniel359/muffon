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
import BaseSearchInput from '@/components/inputs/BaseSearchInput.vue'
import {
  fields as artistFields,
  format as formatArtist
} from '@/helpers/formatters/search/artist'

export default {
  name: 'ArtistsSearchInput',
  components: {
    BaseSearchInput
  },
  emits: [
    'select'
  ],
  data () {
    return {
      scope: 'artists'
    }
  },
  computed: {
    url () {
      return (
        `lastfm/search/${this.scope}` +
        '?query={query}&limit=5'
      )
    },
    fields () {
      return artistFields
    }
  },
  methods: {
    handleSelect (
      {
        name
      }
    ) {
      this.$emit(
        'select',
        name
      )
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
