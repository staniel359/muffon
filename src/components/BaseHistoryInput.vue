<template>
  <div
    class="ui scrolling local fluid search"
    ref="historyInput"
  >
    <div
      class="ui fluid input"
      :class="{ icon: isWithIcon }"
    >
      <input
        class="prompt mousetrap"
        ref="input"
        v-model.trim="input"
        :placeholder="placeholderFormatted"
        @keypress.enter="handleEnterPress"
      />

      <template v-if="isWithIcon">
        <i
          v-if="isClearable"
          class="times link icon"
          @click="handleClearButtonClick"
        />
        <i
          v-else
          class="search icon"
        />
      </template>
    </div>
    <div class="results"></div>
  </div>
</template>

<script>
import {
  getHistory as getLocalHistory,
  addToHistory as addToLocalHistory
} from '#/actions/plugins/local'
import { setSearch, setSearchSource } from '#/actions/plugins/semantic'
import { mainHistoryInputOptions } from '#/data/plugins/semantic'
import { localize } from '#/actions/plugins/i18n'

export default {
  name: 'BaseHistoryInput',
  props: {
    historyKey: {
      type: String,
      required: true
    },
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
    localHistory () {
      return getLocalHistory(
        this.historyKey,
        { isDistinct: this.isInput }
      )
    },
    isInput () {
      return !!this.input.length
    },
    placeholderFormatted () {
      return localize(
        'layout.search.input.placeholder'
      )
    },
    historyInputOptions () {
      return mainHistoryInputOptions({
        source: this.localHistory,
        onSelect: this.handleSelect
      })
    }
  },
  watch: {
    isInput: 'handleInputChange'
  },
  mounted () {
    setSearch(
      this.$refs.historyInput,
      this.historyInputOptions
    )
  },
  methods: {
    handleInputChange () {
      this.updateHistoryInput()
    },
    handleSelect ({ title }) {
      this.input = title

      this.submit()
    },
    handleClearButtonClick () {
      this.input = ''

      this.$emit('clear')

      this.$nextTick(() => {
        this.focus()
      })
    },
    handleEnterPress () {
      this.isInput && this.submit()
    },
    submit () {
      this.unfocus()

      this.updateLocalHistory()
      this.updateHistoryInput()

      this.$emit('submit', this.input)
    },
    focus () {
      this.$refs.input.focus()
    },
    unfocus () {
      this.$refs.input.blur()
    },
    updateLocalHistory () {
      addToLocalHistory(
        this.historyKey,
        this.input
      )
    },
    updateHistoryInput () {
      setSearchSource(
        this.$refs.historyInput,
        this.localHistory
      )
    }
  }
}
</script>

<style lang="sass" scoped>
.results
  z-index: 1500 !important
</style>
