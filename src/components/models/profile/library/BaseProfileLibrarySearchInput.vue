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
      v-if="isWithClearButton"
      @click="handleClearButtonClick"
    />
  </div>
</template>

<script>
import BaseHistoryInput from '@/components/inputs/BaseHistoryInput.vue'
import BaseClearButton from '@/components/buttons/BaseClearButton.vue'

export default {
  name: 'BaseProfileLibrarySearchInput',
  components: {
    BaseHistoryInput,
    BaseClearButton
  },
  props: {
    query: String,
    isWithClearButton: Boolean
  },
  emits: [
    'clearButtonClick',
    'submit'
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
      this.clear()

      this.$emit(
        'clearButtonClick'
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
.search-container
  @extend .d-flex, .align-items-center
</style>
