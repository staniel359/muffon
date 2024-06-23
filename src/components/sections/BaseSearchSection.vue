<template>
  <div class="plain-full middle-aligned">
    <BaseSearchButton
      :is-active="isShowSearch"
      @click="handleButtonClick"
    />

    <SearchInput
      v-show="isShowSearch"
      class="main-right-section"
      :scope="scope"
      :is-show="isShowSearch"
      :query="query"
      :is-with-clear-button="isWithClearButton"
      @submit="handleSubmit"
      @clear-button-click="handleClearButtonClick"
    />
  </div>
</template>

<script>
import BaseSearchButton from '@/components/buttons/BaseSearchButton.vue'
import SearchInput from './BaseSearchSection/SearchInput.vue'

export default {
  name: 'BaseSearchSection',
  components: {
    BaseSearchButton,
    SearchInput
  },
  props: {
    query: {
      type: String,
      required: true
    },
    scope: String
  },
  emits: [
    'submit',
    'clearButtonClick'
  ],
  data () {
    return {
      isShowSearch: false
    }
  },
  computed: {
    isWithClearButton () {
      return !!this.query.length
    }
  },
  methods: {
    handleButtonClick () {
      this.isShowSearch =
        !this.isShowSearch
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
      this.$emit(
        'clearButtonClick'
      )
    }
  }
}
</script>

<style lang="sass" scoped></style>
