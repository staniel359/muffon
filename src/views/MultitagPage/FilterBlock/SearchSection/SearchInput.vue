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
import {
  collection as formatCollection
} from '*/helpers/formatters'

export default {
  name: 'SearchInput',
  components: {
    BaseSearchInput
  },
  inject: [
    'setTags'
  ],
  props: {
    tags: {
      type: Array,
      required: true
    }
  },
  computed: {
    url () {
      return (
        '/lastfm/search/tags' +
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
  watch: {
    tags: {
      immediate: true,
      handler: 'handleTagsChange'
    }
  },
  methods: {
    async handleTagsChange (
      value
    ) {
      if (!value.length) {
        await this.$nextTick()

        this.focus()
      }
    },
    handleSelect (
      tag
    ) {
      function isTagPresent (
        tagData
      ) {
        return (
          tag.id ===
            tagData.id
        )
      }

      const isPresent =
        this.tags.find(
          isTagPresent
        )

      if (!isPresent) {
        const tags = [
          ...this.tags,
          tag
        ]

        const tagsFormatted =
          formatCollection(
            tags
          )

        this.setTags(
          tagsFormatted
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
