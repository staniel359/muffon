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
import BaseSearchInput from '@/components/inputs/BaseSearchInput.vue'

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
    url () {
      return (
        'lastfm/search/artists' +
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
      this.$emit(
        'select',
        artist
      )

      this.clear()
    },
    formatResponse (
      response
    ) {
      return response.search.artists
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
