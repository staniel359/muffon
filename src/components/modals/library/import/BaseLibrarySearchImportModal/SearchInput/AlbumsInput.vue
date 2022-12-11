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
import {
  fields as albumFields,
  format as formatAlbum
} from '@/helpers/formatters/search/album'

export default {
  name: 'AlbumsInput',
  components: {
    BaseSearchInput
  },
  props: {
    source: {
      type: String,
      required: true
    },
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
    url () {
      return (
        `${this.source}/search/albums` +
        '?query={query}&limit=5'
      )
    },
    fields () {
      return albumFields
    }
  },
  methods: {
    handleSelect (
      album
    ) {
      this.$emit(
        'select',
        album
      )

      this.clear()
    },
    formatResponse (
      response
    ) {
      const {
        albums
      } = response.search

      return albums.map(
        formatAlbum
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

<style lang="sass" scoped>
.search-albums-input
  @extend .flex-full
</style>
