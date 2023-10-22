<template>
  <div
    class="ui top segment sidebar the-search-panel no-padding blurred"
    :class="[
      transparentClass,
      {
        inverted: isDarkMode,
        visible: isSearchPanelVisible
      }
    ]"
  >
    <div class="ui container main-container height-100">
      <div class="main-search-container width-100 height-100">
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

  <ResultsPanel
    v-if="isRenderResultsPanel"
    v-show="isSearchPanelVisible"
    :query="query"
    :source="source"
    :scope="scope"
    :is-full-size="isFullSize"
    @full-size-button-click="handleFullSizeButtonClick"
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
import ResultsPanel from './TheSearchPanel/ResultsPanel.vue'
import BaseDimmer from '@/components/BaseDimmer.vue'
import {
  toggleClass
} from '@/helpers/actions/plugins/jquery'
import transparencyMixin from '@/mixins/transparencyMixin'

export default {
  name: 'TheSearchPanel',
  components: {
    SearchInput,
    ScopeSelect,
    SourceSelect,
    ResultsPanel,
    BaseDimmer
  },
  mixins: [
    transparencyMixin
  ],
  data () {
    return {
      isFullSize: null,
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
        searchScope: 'scope',
        isSearchResultsFullSize:
          'isResultsFullSize'
      }
    ),
    isWithClearButton () {
      return !!this.query.length
    },
    isRenderResultsPanel () {
      return (
        this.isGetData &&
          this.query &&
          this.source &&
          this.scope
      )
    }
  },
  watch: {
    isSearchResultsFullSize: {
      immediate: true,
      handler: 'handleIsSearchResultsFullSize'
    },
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
      'ctrl+f, command+f',
      this.handlePressCtrlF
    )

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
    handleIsSearchResultsFullSize (
      value
    ) {
      this.isFullSize = value
    },
    handleIsSearchPanelVisibleChange (
      value
    ) {
      this.$refs
        .dimmer
        .toggle(
          value
        )

      toggleClass(
        '#app',
        'overflow-hidden',
        value
      )
    },
    handlePressCtrlF () {
      this.setIsSearchPanelVisible(
        true
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
    },
    handleFullSizeButtonClick () {
      this.isFullSize =
        !this.isFullSize
    }
  }
}
</script>

<style lang="sass" scoped></style>
