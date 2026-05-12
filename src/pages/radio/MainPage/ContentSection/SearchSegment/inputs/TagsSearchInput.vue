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
  fields as tagFields
} from '@/helpers/formatters/search/tag'

export default {
  name: 'TagsSearchInput',
  components: {
    BaseSearchInput
  },
  emits: [
    'select'
  ],
  data () {
    return {
      scope: 'tags',
      limit: 5
    }
  },
  computed: {
    url () {
      return (
        `lastfm/search/${this.scope}?query={query}&limit=${this.limit}`
      )
    },
    fields () {
      return tagFields
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
      return response.search.tags
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
