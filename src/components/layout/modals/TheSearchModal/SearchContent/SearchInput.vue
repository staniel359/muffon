<template>
  <div class="search-input-container">
    <BaseHistoryInput
      ref="input"
      class="search-input"
      scope="search"
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
import BaseHistoryInput from '*/components/inputs/BaseHistoryInput.vue'
import BaseClearButton from '*/components/buttons/BaseClearButton.vue'

export default {
  name: 'SearchInput',
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
.search-input-container
  @extend .d-flex, .align-items-center, .flex-full

.search-input
  @extend .flex-full
</style>
