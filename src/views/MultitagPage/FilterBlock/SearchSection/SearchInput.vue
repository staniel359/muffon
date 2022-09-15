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
import BaseSearchInput from '*/components/inputs/BaseSearchInput.vue'

export default {
  name: 'SearchInput',
  components: {
    BaseSearchInput
  },
  inject: [
    'addCollectionItem'
  ],
  props: {
    tags: {
      type: Array,
      default () {
        return []
      }
    }
  },
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
  mounted () {
    this.focus()
  },
  methods: {
    handleSelect (
      tag
    ) {
      function isTagPresent (
        tagData
      ) {
        return (
          tag.name ===
            tagData.name
        )
      }

      const isPresent =
        this.tags.find(
          isTagPresent
        )

      if (!isPresent) {
        this.addCollectionItem(
          {
            collection: 'tags',
            item: tag
          }
        )
      }

      this.clear()
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
