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
} from '@/helpers/formatters/plugins/semantic'
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
  data () {
    return {
      history: null
    }
  },
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
          source: this.history,
          onSelect:
            this.handleSelect
        }
      )
    }
  },
  watch: {
    isDistinct:
      'handleIsDictinctChange',
    item: 'handleItemChange'
  },
  async mounted () {
    this.history =
      await this.getHistory()

    setSearch(
      this.$refs.search,
      this.searchOptions
    )
  },
  methods: {
    handleIsDictinctChange () {
      this.updateInput()
    },
    async handleItemChange () {
      await this.updateHistory()

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
      return updateElectronStoreHistory(
        this.scope,
        this.item
      )
    },
    async updateInput () {
      this.history =
        await this.getHistory()

      setSearchSource(
        this.$refs.search,
        this.history
      )
    }
  }
}
</script>

<style lang="sass" scoped>
.results
  z-index: 1500 !important
</style>
