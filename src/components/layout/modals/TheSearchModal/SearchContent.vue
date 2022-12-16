<template>
  <div class="content full-height">
    <div class="search-inputs-container">
      <SearchInput
        ref="input"
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

    <BaseDivider />

    <ResultsSection
      v-if="isRenderResultsSection"
      :query="query"
      :source="source"
      :scope="scope"
    />
  </div>
</template>

<script>
import {
  mapState
} from 'pinia'
import searchStore from '@/stores/search'
import SearchInput from './SearchContent/SearchInput.vue'
import ScopeSelect from './SearchContent/ScopeSelect.vue'
import SourceSelect from './SearchContent/SourceSelect.vue'
import BaseDivider from '@/components/BaseDivider.vue'
import ResultsSection from './SearchContent/ResultsSection.vue'

export default {
  name: 'SearchContent',
  components: {
    SearchInput,
    ScopeSelect,
    SourceSelect,
    BaseDivider,
    ResultsSection
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
      searchStore,
      {
        searchSource: 'source'
      }
    ),
    isWithClearButton () {
      return !!this.query.length
    },
    isRenderResultsSection () {
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
    }
  },
  methods: {
    handleSearchSourceChange (
      value
    ) {
      this.source = value
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
    focusInput () {
      this.$refs
        .input
        .focus()
    }
  }
}
</script>

<style lang="sass" scoped>
.search-inputs-container
  @extend .d-flex, .align-items-center
</style>
