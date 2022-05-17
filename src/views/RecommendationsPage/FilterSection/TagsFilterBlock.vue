<template>
  <div class="tags-search-container">
    <SearchInput
      ref="input"
      :tags="tags"
      @select="handleSelect"
    />

    <BaseClearButton
      v-if="tags.length"
      @click="handleClearButtonClick"
    />
  </div>
</template>

<script>
import SearchInput from './TagsFilterBlock/SearchInput.vue'
import BaseClearButton from '*/components/buttons/BaseClearButton.vue'

export default {
  name: 'TagsFilterBlock',
  components: {
    SearchInput,
    BaseClearButton
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
    'change'
  ],
  methods: {
    handleSelect (
      value
    ) {
      const tags = [
        ...this.tags,
        value
      ]

      this.changeTags(
        tags
      )
    },
    handleClearButtonClick () {
      this.changeTags(
        []
      )

      this.clearInput()
    },
    changeTags (
      value
    ) {
      this.$emit(
        'change',
        value
      )
    },
    focusInput () {
      this.$refs
        .input
        .focus()
    },
    clearInput () {
      this.$refs
        .input
        .clear()
    }
  }
}
</script>

<style lang="sass" scoped>
.tags-search-container
  @extend .d-flex, .align-items-center
</style>
