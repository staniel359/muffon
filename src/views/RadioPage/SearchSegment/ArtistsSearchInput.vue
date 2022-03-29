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
import BaseSearchInput from '*/components/inputs/BaseSearchInput.vue'

export default {
  name: 'ArtistsSearchInput',
  components: {
    BaseSearchInput
  },
  emits: [
    'select'
  ],
  computed: {
    url () {
      return (
        '/lastfm/search/artists' +
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
    handleSelect (artist) {
      this.$emit(
        'select',
        artist.name
      )
    },
    formatResponse (response) {
      return response.search.artists
    },
    focus () {
      this.$refs.input.focus()
    }
  }
}
</script>

<style lang="sass" scoped></style>
