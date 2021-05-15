<template>
  <BaseHistoryInput
    class="search-input-container"
    ref="input"
    scope="searchHistory"
    :query="query"
    :isClearable="isClearable"
    isWithIcon
    @submit="handleSubmit"
    @clear="handleClear"
  />
</template>

<script>
import BaseHistoryInput from '@/BaseHistoryInput.vue'

export default {
  name: 'SearchInput',
  components: {
    BaseHistoryInput
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
    handleClear () {
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
  font-size: 16px !important
</style>
