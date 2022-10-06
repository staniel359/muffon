<template>
  <div
    ref="search"
    class="ui fluid search main-search-input"
    :class="{
      inverted: isDarkMode
    }"
  >
    <div class="ui icon fluid input">
      <input
        ref="input"
        class="prompt"
        type="text"
        :placeholder="searchText"
      >

      <BaseIcon
        icon="search"
      />
    </div>
  </div>
</template>

<script>
import {
  mapState
} from 'vuex'
import axios from 'axios'
import BaseIcon from '@/components/icons/BaseIcon.vue'
import {
  setSearch
} from '@/helpers/actions/plugins/semantic'

export default {
  name: 'BaseSearchInput',
  components: {
    BaseIcon
  },
  props: {
    url: {
      type: String,
      required: true
    },
    fields: {
      type: Object,
      required: true
    },
    formatResponse: {
      type: Function,
      required: true
    }
  },
  emits: [
    'select'
  ],
  data () {
    return {
      baseUrl: axios.defaults.baseURL
    }
  },
  computed: {
    ...mapState(
      'layout',
      [
        'isDarkMode'
      ]
    ),
    searchText () {
      return this.$t(
        'inputs.search'
      )
    },
    searchOptions () {
      return {
        apiSettings: {
          base: this.baseUrl,
          onResponse: this.formatResponse,
          url: this.url
        },
        cache: false,
        error: this.errorData,
        fields: this.fields,
        maxResults: 5,
        minCharacters: 1,
        onSelect: this.handleSelect,
        searchDelay: 500,
        searchOnFocus: false
      }
    },
    errorData () {
      return {
        noResultsHeader: this.$t(
          'errors.notFound.header'
        ),
        noResults: this.$t(
          'errors.notFound.content'
        ),
        serverError: this.$t(
          'errors.internalServer.header'
        )
      }
    }
  },
  mounted () {
    setSearch(
      this.$refs.search,
      this.searchOptions
    )
  },
  methods: {
    handleSelect (
      value
    ) {
      this.$emit(
        'select',
        value
      )
    },
    focus () {
      this.$refs
        .input
        .focus()
    },
    clear () {
      this.$refs
        .input
        .value = ''
    }
  }
}
</script>

<style lang="sass" scoped></style>
