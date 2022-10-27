<template>
  <div class="search-section">
    <BaseButton
      class="basic circular"
      icon="search"
      :class="{
        active: isSearchVisible
      }"
      @click="handleToggleButtonClick"
    />

    <BaseProfileLibrarySearchInput
      v-if="isSearchVisible"
      :query="query"
      :is-with-clear-button="isWithClearButton"
      @submit="handleSubmit"
      @clear-button-click="handleClearButtonClick"
    />
  </div>
</template>

<script>
import BaseButton from '@/components/buttons/BaseButton.vue'
import BaseProfileLibrarySearchInput
  from '@/components/models/profile/library/BaseProfileLibrarySearchInput.vue'

export default {
  name: 'SearchSection',
  components: {
    BaseButton,
    BaseProfileLibrarySearchInput
  },
  props: {
    query: {
      type: String,
      required: true
    }
  },
  emits: [
    'submit',
    'clear'
  ],
  data () {
    return {
      isSearchVisible: false
    }
  },
  computed: {
    isWithClearButton () {
      return !!this.query.length
    }
  },
  methods: {
    handleToggleButtonClick () {
      this.isSearchVisible =
        !this.isSearchVisible

      this.clear()
    },
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
    },
    clear () {
      this.$emit(
        'clear'
      )
    }
  }
}
</script>

<style lang="sass" scoped>
.search-section
  @extend .d-flex, .align-items-center
</style>
