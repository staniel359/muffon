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

    <div
      class="results"
      :class="transparentClass"
    />
  </div>
</template>

<script>
import {
  mapState
} from 'pinia'
import layoutStore from '@/stores/layout'
import profileStore from '@/stores/profile'
import BaseIcon from '@/components/icons/BaseIcon.vue'
import {
  setSearch
} from '@/helpers/actions/plugins/semantic'
import {
  mainSearchOptions
} from '@/helpers/formatters/plugins/semantic'
import {
  anonymousToken
} from '@/helpers/data/env'
import transparencyMixin from '@/mixins/transparencyMixin'

export default {
  name: 'BaseSearchInput',
  components: {
    BaseIcon
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
    }
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
      return mainSearchOptions(
        {
          onResponse: this.formatResponse,
          url: this.urlFormatted,
          fields: this.fields,
          onSelect: this.handleSelect
        }
      )
    },
    urlFormatted () {
      return `${this.url}&token=${this.token}`
    },
    token () {
      return (
        this.profileToken ||
          anonymousToken
      )
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
