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
  data () {
    return {
      scope: 'albums'
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

<style lang="sass" scoped></style>
