<template>
  <div
    ref="search"
    class="ui search main-search main-search-input"
    :class="{
      inverted: isDarkMode
    }"
  >
    <BaseInputContainer
      class="fluid icon"
      icon="search"
    >
      <input
        ref="input"
        class="prompt"
        type="text"
        :placeholder="searchText"
      >
    </BaseInputContainer>

    <div
      class="blurred results main-search-results"
      :class="[
        transparentClass,
        scopeClass,
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
import layoutStore from '@/stores/layout'
import profileStore from '@/stores/profile'
import BaseInputContainer
  from '@/components/containers/inputs/BaseInputContainer.vue'
import {
  set as setSearch
} from '@/helpers/actions/plugins/semantic/search'
import {
  search as searchInputOptions
} from '@/helpers/formatters/plugins/semantic/options/input'
import {
  anonymousToken
} from '@/helpers/data/env'
import transparencyMixin from '@/mixins/transparencyMixin'
import {
  version
} from '@/../package.json'

export default {
  name: 'BaseSearchInput',
  components: {
    BaseInputContainer
  },
  mixins: [
    transparencyMixin
  ],
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
    },
    scope: String
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
    ...mapState(
      profileStore,
      {
        profileToken: 'token'
      }
    ),
    searchText () {
      return this.$t(
        'inputs.search'
      )
    },
    searchOptions () {
      return searchInputOptions(
        {
          onResponse: this.formatResponse,
          url: this.urlFormatted,
          fields: this.fields,
          onSelect: this.handleSelect
        }
      )
    },
    urlFormatted () {
      return `${this.url}&token=${this.token}&version=${version}`
    },
    token () {
      return (
        this.profileToken ||
          anonymousToken
      )
    },
    scopeClass () {
      if (this.scope) {
        return `${this.scope}-results`
      } else {
        return null
      }
    }
  },
  watch: {
    url: 'handleUrlChange'
  },
  mounted () {
    this.initialize()
  },
  methods: {
    handleUrlChange () {
      this.initialize()
    },
    handleSelect (
      value
    ) {
      this.$emit(
        'select',
        value
      )
    },
    initialize () {
      setSearch(
        this.$refs.search,
        this.searchOptions
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
