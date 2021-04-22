<template>
  <div class="search-input-container">
    <BaseHistoryInput
      ref="historyInput"
      historyKey="searchHistory"
      :isClearable="isClearable"
      isWithIcon
      @submit="handleSubmit"
      @clear="handleClear"
    />
  </div>
</template>

<script>
import BaseHistoryInput from '@/BaseHistoryInput.vue'

export default {
  name: 'SearchInput',
  components: {
    BaseHistoryInput
  },
  props: {
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
      this.$refs.historyInput.focus()
    },
    unfocus () {
      this.$refs.historyInput.unfocus()
    }
  }
}
</script>

<style lang="sass" scoped>
.search-input-container
  font-size: 16px !important
</style>
