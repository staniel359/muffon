<template>
  <div class="search-container">
    <BaseHistoryInput
      ref="input"
      class="main-search-input"
      scope="librarySearch"
      :query="query"
      @submit="handleSubmit"
    />

    <BaseClearButton
      v-if="isClearable"
      class="clear-button"
      @click="handleClearButtonClick"
    />
  </div>
</template>

<script>
import BaseHistoryInput from '*/components/inputs/BaseHistoryInput.vue'
import BaseClearButton from '*/components/buttons/BaseClearButton.vue'

export default {
  name: 'BaseProfileLibrarySearchInput',
  components: {
    BaseHistoryInput,
    BaseClearButton
  },
  props: {
    query: String,
    isClearable: Boolean
  },
  emits: [
    'submit',
    'clear'
  ],
  methods: {
    handleSubmit (
      value
    ) {
      this.$emit(
        'submit',
        value
      )
    },
    handleClearButtonClick () {
      this.$refs
        .input
        .clear()

      this.$emit(
        'clear'
      )
    },
    focus () {
      this.$refs
        .input
        .focus()
    }
  }
}
</script>

<style lang="sass" scoped>
.search-container
  @extend .d-flex, .align-items-center

.clear-button
  margin-left: 1em !important
</style>
