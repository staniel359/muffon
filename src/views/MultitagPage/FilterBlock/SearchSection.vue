<template>
  <div class="search-section">
    <SearchInput
      ref="input"
      :tags="tags"
    />

    <BaseClearButton
      v-if="tags.length"
      class="search-clear-button"
      @click="handleClearButtonClick"
    />
  </div>
</template>

<script>
import SearchInput from './SearchSection/SearchInput.vue'
import BaseClearButton from '*/components/buttons/BaseClearButton.vue'

export default {
  name: 'SearchSection',
  components: {
    SearchInput,
    BaseClearButton
  },
  inject: [
    'setTags'
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
      this.setTags(
        []
      )

      this.clearInput()
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
.search-section
  @extend .d-flex, .align-items-center

.search-clear-button
  margin-left: 1em
</style>
