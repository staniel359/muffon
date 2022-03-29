<template>
  <div
    class="ui local search inverted main-history-input"
    ref="search"
  >
    <slot></slot>
  </div>
</template>

<script>
import { mainHistoryInputOptions } from '*/helpers/data/plugins/semantic'
import { setSearch, setSearchSource } from '*/helpers/actions/plugins/semantic'
import {
  get as getLocalHistory,
  update as updateLocalHistory
} from '*/helpers/actions/plugins/local/history'

export default {
  name: 'BaseHistoryInputContainer',
  props: {
    scope: {
      type: String,
      required: true
    },
    isDistinct: Boolean,
    item: String
  },
  emits: [
    'select'
  ],
  computed: {
    searchOptions () {
      return mainHistoryInputOptions({
        source: this.getHistory(),
        onSelect: this.handleSelect
      })
    }
  },
  watch: {
    isDistinct: 'handleIsDictinctChange',
    item: 'handleItemChange'
  },
  mounted () {
    setSearch(
      this.$refs.search,
      this.searchOptions
    )
  },
  methods: {
    handleIsDictinctChange () {
      this.updateInput()
    },
    handleItemChange () {
      this.updateHistory()
      this.updateInput()
    },
    handleSelect ({ title }) {
      this.$emit('select', title)
    },
    getHistory () {
      return getLocalHistory(
        this.scope,
        { isDistinct: this.isDistinct }
      )
    },
    updateHistory () {
      updateLocalHistory(
        this.scope,
        this.item
      )
    },
    updateInput () {
      setSearchSource(
        this.$refs.search,
        this.getHistory()
      )
    }
  }
}
</script>

<style lang="sass" scoped>
.results
  z-index: 1500 !important
</style>
