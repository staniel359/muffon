<template>
  <div
    class="content"
    :class="{ 'main-modal-content-full-height': query }"
  >
    <SearchInput
      ref="input"
      :query="query"
      :isClearable="isClearable"
      @submit="handleSubmit"
      @clear="handleClear"
    />

    <SearchTabs
      v-if="query"
      class="search-tabs"
      :query="query"
      :searchKey="key"
    />
  </div>
</template>

<script>
import SearchInput from './SearchContent/SearchInput.vue'
import SearchTabs from './SearchContent/SearchTabs.vue'
import { generateKey } from '#/utils'

export default {
  name: 'SearchContent',
  components: {
    SearchInput,
    SearchTabs
  },
  data () {
    return {
      key: null,
      query: ''
    }
  },
  computed: {
    isClearable () {
      return !!this.query.length
    }
  },
  methods: {
    handleSubmit (value) {
      this.query = value
      this.key = generateKey()
    },
    handleClear () {
      this.query = ''
    },
    focusInput () {
      this.$refs.input.focus()
    }
  }
}
</script>

<style lang="sass" scoped>
.search-tabs
  margin-top: 0.5em
</style>
