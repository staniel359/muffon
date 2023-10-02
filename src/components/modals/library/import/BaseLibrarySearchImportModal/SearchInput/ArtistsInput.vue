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
  name: 'ArtistsInput',
  components: {
    BaseSearchInput
  },
  props: {
    source: {
      type: String,
      required: true
    },
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
  data () {
    return {
      scope: 'artists'
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
      return artistFields
    }
  },
  methods: {
    handleSelect (
      artist
    ) {
      this.$emit(
        'select',
        artist
      )

      this.clear()
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
