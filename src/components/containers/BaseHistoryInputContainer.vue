<template>
  <div
    ref="search"
    class="ui local search main-search"
    :class="{
      inverted: isDarkMode
    }"
  >
    <slot />

    <div
      class="blurred results main-search-results"
      :class="[
        transparentClass,
        {
          inverted: isDarkMode
        }
      ]"
    />
  </div>
</template>

<script>
import {
  mapState
} from 'pinia'
import historyStore from '@/stores/history'
import layoutStore from '@/stores/layout'
import {
  history as historyInputOptions
} from '@/helpers/formatters/plugins/semantic/options/input'
import {
  set as setSearch,
  setSource as setSearchSource
} from '@/helpers/actions/plugins/semantic/search'
import transparencyMixin from '@/mixins/transparencyMixin'
import {
  getDistinctArray
} from '@/helpers/utils'
import {
  update as updateGlobalStore
} from '@/helpers/actions/store/global'

export default {
  name: 'BaseHistoryInputContainer',
  mixins: [
    transparencyMixin
  ],
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
      return historyInputOptions(
        {
          source:
            this.historyFormatted,
          onSelect:
            this.handleSelect
        }
      )
    },
    historyFormatted () {
      return this.historyScoped.map(
        this.formatHistoryItem
      )
    },
    historyScoped () {
      if (this.isDistinct) {
        return getDistinctArray(
          this.history
        )
      } else {
        return [
          ...this.history
        ]
      }
    },
    history () {
      return historyStore()[
        this.scope
      ]
    },
    historyKey () {
      return `history.${this.scope}`
    },
    isNewItem () {
      return (
        this.item && (
          this.item !==
            this.history[0]
        )
      )
    }
  },
  watch: {
    historyFormatted:
      'handleHistoryFormattedChange',
    item: 'handleItemChange'
  },
  mounted () {
    setSearch(
      this.$refs.search,
      this.searchOptions
    )
  },
  methods: {
    handleHistoryFormattedChange () {
      this.updateList()
    },
    handleItemChange () {
      if (this.isNewItem) {
        this.updateHistory()
      }
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
    updateList () {
      setSearchSource(
        this.$refs.search,
        this.historyFormatted
      )
    },
    formatHistoryItem (
      item
    ) {
      return {
        title: item
      }
    },
    updateHistory () {
      const newHistory = [
        this.item,
        ...this.history
      ]

      updateGlobalStore(
        {
          [this.historyKey]: newHistory
        }
      )
    }
  }
}
</script>

<style lang="sass" scoped></style>
