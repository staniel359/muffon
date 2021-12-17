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
import BaseSearchInput from '@/inputs/BaseSearchInput.vue'

export default {
  name: 'TagsSearchInput',
  components: {
    BaseSearchInput
  },
  emits: [
    'select'
  ],
  computed: {
    url () {
      return (
        'lastfm/search/tags' +
        '?query={query}&limit=5'
      )
    },
    fields () {
      return {
        results: 'tags',
        title: 'name',
        image: null
      }
    }
  },
  methods: {
    handleSelect (tag) {
      this.$emit(
        'select',
        tag.name
      )

      this.clear()
    },
    formatResponse (response) {
      return response.search.tags
    },
    focus () {
      this.$refs.input.focus()
    },
    clear () {
      this.$refs.input.clear()
    }
  }
}
</script>

<style lang="sass" scoped></style>
