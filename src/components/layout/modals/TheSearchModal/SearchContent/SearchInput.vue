<template>
  <div class="search-input-container">
    <BaseHistoryInput
      class="search-input"
      ref="input"
      scope="search"
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
import BaseHistoryInput from '@/inputs/BaseHistoryInput.vue'
import BaseClearButton from '@/buttons/BaseClearButton.vue'

export default {
  name: 'SearchInput',
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
    handleSubmit (value) {
      this.$emit('submit', value)
    },
    handleClearButtonClick () {
      this.$refs.input.clear()

      this.$emit('clear')
    },
    focus () {
      this.$refs.input.focus()
    }
  }
}
</script>

<style lang="sass" scoped>
.search-input-container
  @extend .d-flex, .align-items-center, .flex-full

.search-input
  @extend .flex-full

.clear-button
  margin-left: 1em !important
</style>
