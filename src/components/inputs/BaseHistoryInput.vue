<template>
  <BaseHistoryInputContainer
    class="scrolling fluid"
    :scope="scope"
    :item="query"
    :is-distinct="isInput"
    @select="handleSelect"
  >
    <BaseInput
      ref="input"
      v-model.trim="input"
      class="fluid"
      icon="search"
      :placeholder="searchText"
      @enter-press="handleEnterPress"
    />
  </BaseHistoryInputContainer>
</template>

<script>
import BaseHistoryInputContainer
  from '*/components/containers/BaseHistoryInputContainer.vue'
import BaseInput from '*/components/inputs/BaseInput.vue'

export default {
  name: 'BaseHistoryInput',
  components: {
    BaseHistoryInputContainer,
    BaseInput
  },
  props: {
    scope: String,
    query: String
  },
  emits: [
    'submit',
    'clear'
  ],
  data () {
    return {
      input: ''
    }
  },
  computed: {
    isInput () {
      return !!this.input.length
    },
    searchText () {
      return this.$t(
        'inputs.search'
      )
    }
  },
  methods: {
    handleSelect (
      value
    ) {
      this.input = value

      this.submit()
    },
    handleEnterPress () {
      if (this.isInput) {
        this.submit()
      }
    },
    submit () {
      this.unfocus()

      this.$emit(
        'submit',
        this.input
      )
    },
    focus () {
      this.$refs
        .input
        .focus()
    },
    unfocus () {
      this.$refs
        .input
        .unfocus()
    },
    async clear () {
      this.input = ''

      await this.$nextTick()

      this.focus()
    }
  }
}
</script>

<style lang="sass" scoped></style>
