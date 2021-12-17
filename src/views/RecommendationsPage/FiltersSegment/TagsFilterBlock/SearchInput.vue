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
import { generateKey } from '#/utils'

export default {
  name: 'SearchInput',
  components: {
    BaseSearchInput
  },
  props: {
    tags: {
      type: Array,
      default () {
        return []
      }
    }
  },
  emits: [
    'addTag'
  ],
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
  methods: {
    handleSelect (tag) {
      const isTagPresent = tagData => {
        return tag.id === tagData.id
      }

      const isPresent =
        this.tags.find(
          isTagPresent
        )

      if (!isPresent) {
        const tagData = {
          uuid: generateKey(),
          ...tag
        }

        this.$emit(
          'addTag',
          tagData
        )
      }

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
