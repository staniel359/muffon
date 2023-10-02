<template>
  <div class="main-search-container">
    <SearchInput
      ref="input"
      :tags="tags"
    />

    <BaseClearButton
      v-if="tags.length"
      @click="handleClearButtonClick"
    />
  </div>
</template>

<script>
import SearchInput from './SearchSection/SearchInput.vue'
import BaseClearButton from '@/components/buttons/BaseClearButton.vue'

export default {
  name: 'SearchSection',
  components: {
    SearchInput,
    BaseClearButton
  },
  inject: [
    'clearTags'
  ],
  props: {
    tags: {
      type: Array,
      default () {
        return []
      }
    }
  },
  methods: {
    handleClearButtonClick () {
      this.clearTags()

      this.clearInput()

      this.focusInput()
    },
    clearInput () {
      this.$refs
        .input
        .clear()
    },
    focusInput () {
      this.$refs
        .input
        .focus()
    }
  }
}
</script>

<style lang="sass" scoped></style>
