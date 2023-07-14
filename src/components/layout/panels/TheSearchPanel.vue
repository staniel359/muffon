<template>
  <div
    :class="[
      'ui top segment sidebar the-search-panel',
      'main-segment-container',
      {
        inverted: isDarkMode,
        visible: isSearchPanelVisible
      }
    ]"
  >
    <div class="ui container main-container content-container">
      <div class="inputs-section">
        <SearchInput
          :query="query"
          :is-with-clear-button="isWithClearButton"
          @submit="handleSubmit"
          @clear-button-click="handleClearButtonClick"
        />

        <ScopeSelect
          :scope="scope"
          :source="source"
          @select="handleScopeSelect"
        />

        <SourceSelect
          :source="source"
          :scope="scope"
          @select="handleSourceSelect"
        />
      </div>
    </div>
  </div>

  <ResultsSegment
    v-if="isRenderResultsSegment"
    v-show="isSearchPanelVisible"
    :query="query"
    :source="source"
    :scope="scope"
  />

  <BaseDimmer
    ref="dimmer"
    @click="handleDimmerClick"
  />
</template>

<script>
import hotkeys from 'hotkeys-js'
import {
  mapState,
  mapActions
} from 'pinia'
import layoutStore from '@/stores/layout'
import searchStore from '@/stores/search'
import SearchInput from './TheSearchPanel/SearchInput.vue'
import ScopeSelect from './TheSearchPanel/ScopeSelect.vue'
import SourceSelect from './TheSearchPanel/SourceSelect.vue'
import ResultsSegment from './TheSearchPanel/ResultsSegment.vue'
import BaseDimmer from '@/components/BaseDimmer.vue'

export default {
  name: 'TheSearchPanel',
  components: {
    SearchInput,
    ScopeSelect,
    SourceSelect,
    ResultsSegment,
    BaseDimmer
  },
  data () {
    return {
      isGetData: false,
      source: '',
      scope: '',
      query: ''
    }
  },
  computed: {
    ...mapState(
      layoutStore,
      [
        'isDarkMode',
        'isSearchPanelVisible'
      ]
    ),
    ...mapState(
      searchStore,
      {
        searchSource: 'source',
        searchScope: 'scope'
      }
    ),
    isWithClearButton () {
      return !!this.query.length
    },
    isRenderResultsSegment () {
      return (
        this.isGetData &&
          this.query &&
          this.source &&
          this.scope
      )
    }
  },
  watch: {
    searchSource: {
      immediate: true,
      handler: 'handleSearchSourceChange'
    },
    searchScope: {
      immediate: true,
      handler: 'handleSearchScopeChange'
    },
    isSearchPanelVisible:
      'handleIsSearchPanelVisibleChange'
  },
  mounted () {
    hotkeys(
      'esc',
      this.handlePressEscape
    )
  },
  methods: {
    ...mapActions(
      layoutStore,
      [
        'setIsSearchPanelVisible'
      ]
    ),
    handleIsSearchPanelVisibleChange (
      value
    ) {
      this.$refs
        .dimmer
        .toggle(
          value
        )
    },
    handlePressEscape () {
      this.setIsSearchPanelVisible(
        false
      )
    },
    handleSearchSourceChange (
      value
    ) {
      this.source = value
    },
    handleSearchScopeChange (
      value
    ) {
      this.scope = value
    },
    async handleScopeSelect (
      value
    ) {
      this.isGetData = false
      this.scope = value

      const sourceOldValue = this.source

      await this.$nextTick()

      const sourceNewValue = this.source

      const isSourceChanged = (
        sourceOldValue !==
          sourceNewValue
      )

      if (!isSourceChanged) {
        this.isGetData = true
      }
    },
    async handleSourceSelect (
      value
    ) {
      this.isGetData = false
      this.source = value

      const scopeOldValue = this.scope

      await this.$nextTick()

      const scopeNewValue = this.scope

      const isScopeChanged = (
        scopeOldValue !==
          scopeNewValue
      )

      if (!isScopeChanged) {
        this.isGetData = true
      }
    },
    async handleSubmit (
      value
    ) {
      this.isGetData = false
      this.query = value

      await this.$nextTick()

      this.isGetData = true
    },
    handleClearButtonClick () {
      this.query = ''
    },
    handleDimmerClick () {
      this.setIsSearchPanelVisible(
        false
      )
    }
  }
}
</script>

<style lang="sass" scoped>
.ui.sidebar
  &.the-search-panel
    @extend .overflow-visible, .text-color-black
    height: $navbarHeight !important
    z-index: 1200
    &.inverted
      @extend .text-color-white
      border-bottom: $borderInverted !important

.content-container
  @extend .h-100

.inputs-section
  @extend .d-flex, .align-items-center, .w-100, .h-100
</style>
