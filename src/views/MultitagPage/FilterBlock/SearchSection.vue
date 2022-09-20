<template>
  <div class="search-section">
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
    'reset'
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
      this.reset()

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

<style lang="sass" scoped>
.search-section
  @extend .d-flex, .align-items-center
</style>
