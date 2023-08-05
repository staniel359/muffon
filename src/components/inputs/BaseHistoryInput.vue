<template>
  <BaseHistoryInputContainer
    :key="key"
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
import historyStore from '@/stores/history'
import BaseHistoryInputContainer
  from '@/components/containers/BaseHistoryInputContainer.vue'
import BaseInput from '@/components/inputs/BaseInput.vue'
import {
  generateKey
} from '@/helpers/utils'

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
      key: null,
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
    },
    history () {
      return historyStore()[
        this.scope
      ]
    }
  },
  watch: {
    history: 'handleHistoryChange'
  },
  methods: {
    handleHistoryChange (
      value
    ) {
      if (!value.length) {
        this.key = generateKey()
      }
    },
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
    clear () {
      this.input = ''

      setTimeout(
        this.focus,
        50
      )
    }
  }
}
</script>

<style lang="sass" scoped></style>
