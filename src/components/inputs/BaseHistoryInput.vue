<template>
  <BaseHistoryInputContainer
    class="scrolling fluid"
    :scope="scope"
    :item="query"
    :isDistinct="isInput"
    @select="handleSelect"
  >
    <BaseInput
      class="fluid"
      ref="input"
      icon="search"
      v-model.trim="input"
      :placeholder="placeholderFormatted"
      @enterPress="handleEnterPress"
    />
  </BaseHistoryInputContainer>
</template>

<script>
import BaseHistoryInputContainer
  from '@/containers/BaseHistoryInputContainer.vue'
import BaseInput from '@/inputs/BaseInput.vue'

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
    placeholderFormatted () {
      return this.$t(
        'inputs.search'
      )
    }
  },
  methods: {
    handleSelect (value) {
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
      this.$refs.input.focus()
    },
    unfocus () {
      this.$refs.input.unfocus()
    },
    clear () {
      this.input = ''

      this.$nextTick(() => {
        this.focus()
      })
    }
  }
}
</script>

<style lang="sass" scoped></style>
