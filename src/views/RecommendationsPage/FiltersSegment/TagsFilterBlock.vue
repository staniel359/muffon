<template>
  <div class="tags-search-container">
    <SearchInput
      ref="input"
      :tags="tags"
      @addTag="handleAddTag"
    />

    <BaseClearButton
      v-if="tags.length"
      class="reset-button"
      @click="handleResetButtonClick"
    />
  </div>
</template>

<script>
import SearchInput from './TagsFilterBlock/SearchInput.vue'
import BaseClearButton from '@/buttons/BaseClearButton.vue'

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
    handleAddTag (value) {
      const tags = [
        ...this.tags,
        value
      ]

      this.changeTags(
        tags
      )
    },
    handleResetButtonClick () {
      this.changeTags([])

      this.$refs.input.clear()
    },
    changeTags (value) {
      this.$emit(
        'change',
        value
      )
    },
    focusInput () {
      this.$refs.input.focus()
    }
  }
}
</script>

<style lang="sass" scoped>
.tags-search-container
  @extend .d-flex, .align-items-center

.reset-button
  margin-left: 1em
</style>
