<template>
  <div>
    <div class="main-search-container">
      <BaseHistoryInput
        ref="input"
        class="main-search-input"
        :query="query"
        :scope="scopeFormatted"
        @submit="handleSubmit"
      />

      <BaseClearButton
        v-if="isWithClearButton"
        @click="handleClearButtonClick"
      />
    </div>
  </div>
</template>

<script>
import BaseHistoryInput from '@/components/inputs/BaseHistoryInput.vue'
import BaseClearButton from '@/components/buttons/BaseClearButton.vue'

export default {
  name: 'SearchInput',
  components: {
    BaseHistoryInput,
    BaseClearButton
  },
  props: {
    scope: {
      type: String,
      required: true
    },
    isShow: Boolean,
    query: String,
    isWithClearButton: Boolean
  },
  emits: [
    'clearButtonClick',
    'submit'
  ],
  computed: {
    scopeFormatted () {
      return `${this.scope}Search`
    }
  },
  watch: {
    isShow: 'handleIsShowChange'
  },
  methods: {
    async handleIsShowChange (
      value
    ) {
      await this.$nextTick()

      if (value) {
        this.focus()
      }
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

<style lang="sass" scoped></style>
