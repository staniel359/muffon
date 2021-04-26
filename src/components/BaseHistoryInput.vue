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
      v-model.trim="input"
      :icon="iconFormatted"
      :placeholder="placeholderFormatted"
      @enterPress="handleEnterPress"
      @iconClick="handleIconClick"
    />
  </BaseHistoryInputContainer>
</template>

<script>
import BaseHistoryInputContainer
  from '@/containers/BaseHistoryInputContainer.vue'
import BaseInput from '@/BaseInput.vue'
import { localize } from '#/actions/plugins/i18n'

export default {
  name: 'BaseHistoryInput',
  components: {
    BaseHistoryInputContainer,
    BaseInput
  },
  props: {
    scope: String,
    query: String,
    isWithIcon: Boolean,
    isClearable: Boolean
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
    iconFormatted () {
      if (this.isWithIcon) {
        if (this.isClearable) {
          return 'close link'
        } else {
          return 'search'
        }
      } else {
        return null
      }
    },
    placeholderFormatted () {
      return localize(
        'layout.search.input.placeholder'
      )
    },
    isClearButton () {
      return (
        this.isWithIcon &&
          this.isClearable
      )
    }
  },
  methods: {
    handleSelect (value) {
      this.input = value

      this.submit()
    },
    handleIconClick () {
      if (this.isClearButton) {
        this.handleClearButtonClick()
      }
    },
    handleClearButtonClick () {
      this.input = ''

      this.$emit('clear')

      this.$nextTick(() => {
        this.focus()
      })
    },
    handleEnterPress () {
      if (this.isInput) {
        this.submit()
      }
    },
    submit () {
      this.unfocus()

      this.$emit('submit', this.input)
    },
    focus () {
      this.$refs.input.focus()
    },
    unfocus () {
      this.$refs.input.unfocus()
    }
  }
}
</script>

<style lang="sass" scoped></style>
