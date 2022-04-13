<template>
  <div
    class="content"
    :class="{
      'main-modal-content-full-height': query
    }"
  >
    <div class="search-inputs-container">
      <SearchInput
        ref="input"
        :query="query"
        :is-clearable="isClearable"
        @submit="handleSubmit"
        @clear="handleClear"
      />

      <SearchSourceSelect
        @select="handleSourceSelect"
      />
    </div>

    <SearchTabs
      v-if="query"
      class="search-tabs"
      :query="query"
      :search-key="key"
      :source-id="sourceId"
    />
  </div>
</template>

<script>
import SearchInput from './SearchContent/SearchInput.vue'
import SearchSourceSelect from './SearchContent/SearchSourceSelect.vue'
import SearchTabs from './SearchContent/SearchTabs.vue'
import {
  generateKey
} from '*/helpers/utils'

export default {
  name: 'SearchContent',
  components: {
    SearchInput,
    SearchSourceSelect,
    SearchTabs
  },
  data () {
    return {
      key: null,
      sourceId: null,
      query: ''
    }
  },
  computed: {
    isClearable () {
      return !!this.query.length
    }
  },
  methods: {
    handleSubmit (
      value
    ) {
      this.query = value
      this.key = generateKey()
    },
    handleClear () {
      this.query = ''
    },
    handleSourceSelect (
      value
    ) {
      this.sourceId = value
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

.search-tabs
  margin-top: 0.5em
</style>
