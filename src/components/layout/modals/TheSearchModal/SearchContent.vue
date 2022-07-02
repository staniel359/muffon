<template>
  <div
    class="content main-modal-content-full-height"
  >
    <div class="search-inputs-container">
      <SearchInput
        ref="input"
        :query="query"
        :is-with-clear-button="isWithClearButton"
        @submit="handleSubmit"
        @clear-button-click="handleClearButtonClick"
      />

      <ScopeSelect
        @select="handleScopeSelect"
      />

      <SourceSelect
        v-if="scope"
        :scope="scope"
        @select="handleSourceSelect"
      />
    </div>

    <BaseDivider />

    <SearchSection
      v-if="query"
      :key="key"
      :query="query"
      :source="source"
      :scope="scope"
    />
  </div>
</template>

<script>
import SearchInput from './SearchContent/SearchInput.vue'
import ScopeSelect from './SearchContent/ScopeSelect.vue'
import SourceSelect from './SearchContent/SourceSelect.vue'
import BaseDivider from '*/components/BaseDivider.vue'
import SearchSection from './SearchContent/SearchSection.vue'
import {
  generateKey
} from '*/helpers/utils'

export default {
  name: 'SearchContent',
  components: {
    SearchInput,
    ScopeSelect,
    SourceSelect,
    BaseDivider,
    SearchSection
  },
  data () {
    return {
      key: null,
      source: null,
      scope: null,
      query: ''
    }
  },
  computed: {
    isWithClearButton () {
      return !!this.query.length
    }
  },
  methods: {
    handleScopeSelect (
      value
    ) {
      this.scope = value
      this.key = generateKey()
    },
    handleSourceSelect (
      value
    ) {
      this.source = value
      this.key = generateKey()
    },
    handleSubmit (
      value
    ) {
      this.query = value
      this.key = generateKey()
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
