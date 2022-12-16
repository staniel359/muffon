<template>
  <div
    ref="search"
    class="ui local search main-history-input"
    :class="{
      inverted: isDarkMode
    }"
  >
    <slot />
  </div>
</template>

<script>
import {
  mapState
} from 'pinia'
import layoutStore from '@/stores/layout'
import {
  mainHistoryInputOptions
} from '@/helpers/formatters/semantic'
import {
  setSearch,
  setSearchSource
} from '@/helpers/actions/plugins/semantic'
import {
  get as getElectronStoreHistory,
  update as updateElectronStoreHistory
} from '@/helpers/actions/plugins/electronStore/history'

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
    ...mapState(
      layoutStore,
      [
        'isDarkMode'
      ]
    ),
    searchOptions () {
      return mainHistoryInputOptions(
        {
          source: this.getHistory(),
          onSelect: this.handleSelect
        }
      )
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
    handleSelect (
      {
        title
      }
    ) {
      this.$emit(
        'select',
        title
      )
    },
    getHistory () {
      return getElectronStoreHistory(
        this.scope,
        {
          isDistinct: this.isDistinct
        }
      )
    },
    updateHistory () {
      updateElectronStoreHistory(
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
