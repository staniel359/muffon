<template>
  <div class="middle-aligned-full search-input">
    <BaseHistoryInput
      ref="input"
      class="main-simple-search-input"
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
import {
  mapState
} from 'pinia'
import layoutStore from '@/stores/layout'
import BaseHistoryInput from '@/components/inputs/BaseHistoryInput.vue'
import BaseClearButton from '@/components/buttons/BaseClearButton.vue'

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
  computed: {
    ...mapState(
      layoutStore,
      [
        'isSearchPanelVisible'
      ]
    )
  },
  watch: {
    isSearchPanelVisible:
      'handleIsSearchPanelVisibleChange'
  },
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
    async handleIsSearchPanelVisibleChange (
      value
    ) {
      await this.$nextTick()

      if (value) {
        this.focus()
      }
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

<style lang="sass" scoped></style>
